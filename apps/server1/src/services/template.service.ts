import * as fs from 'fs';
import { prisma } from '@repo/database';
import type { TemplateDTO } from '@repo/types';
import { deleteFromCloudinary, uploadTemplateThumbnail, uploadTemplatePreviews } from './cloudinary.service';
import { RedisService } from './redis.service';
import { logger } from '@repo/shared-utils';

/**
 * Converts a display name to a url-safe slug
 * "Minimal Dark" → "minimal-dark"
 */
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

export interface CreateTemplateParams {
  name: string;
  description: string;
  techStack: string[];
  domain: string;
  gitRepoUrl: string;
  thumbFilePath?: string;
  previewFilePaths?: string[]; // Multiple preview temp paths
}

export async function createTemplate(
  params: CreateTemplateParams
): Promise<TemplateDTO> {
  const {
    name,
    description,
    techStack,
    domain,
    gitRepoUrl,
    thumbFilePath,
    previewFilePaths,
  } = params;

  const slug = generateSlug(name);

  // Check slug is unique
  const existing = await prisma.template.findUnique({ where: { slug } });
  if (existing) {
    throw new Error(`A template with slug "${slug}" already exists`);
  }

  let thumbUpload: { secureUrl: string; publicId: string } | null = null;
  let previewUrls: string[] = [];
  let previewUploads: { secureUrl: string; publicId: string }[] = [];

  try {
    // Upload thumbnail if provided
    if (thumbFilePath) {
      logger.info(`Uploading thumbnail for template "${name}"`, undefined);
      thumbUpload = await uploadTemplateThumbnail(thumbFilePath, slug);
    }

    // Upload multiple previews if provided
    if (previewFilePaths && previewFilePaths.length > 0) {
      logger.info(`Uploading ${previewFilePaths.length} previews for template "${name}"`, undefined);
      const results = await uploadTemplatePreviews(previewFilePaths, slug);
      previewUrls = results.map(r => r.secureUrl);
      previewUploads = results;
    }

    // Save to database
    const template = await prisma.template.create({
      data: {
        name,
        slug,
        description,
        techStack,
        domain,
        gitRepoUrl,
        thumbUrl: thumbUpload?.secureUrl ?? null,
        previews: previewUrls,
      },
    });

    logger.info(`Template "${name}" created with id ${template.id}`, undefined);

    // Invalidate cache
    await RedisService.invalidateTemplateCache();

    return {
      id: template.id,
      name: template.name,
      slug: template.slug,
      description: template.description,
      techStack: template.techStack,
      domain: template.domain,
      gitRepoUrl: template.gitRepoUrl,
      thumbUrl: template.thumbUrl,
      previews: template.previews,
      isActive: template.isActive,
      createdAt: template.createdAt,
      updatedAt: template.updatedAt,
    };
  } catch (err) {
    // ROLLBACK
    if (thumbUpload) {
      await deleteFromCloudinary(thumbUpload.publicId, 'image').catch(() => { });
    }
    if (previewUploads.length > 0) {
      await Promise.all(previewUploads.map(pu => deleteFromCloudinary(pu.publicId, 'image').catch(() => {})));
    }
    throw err;
  } finally {
    // Clean up temp files
    if (thumbFilePath) { try { fs.unlinkSync(thumbFilePath); } catch { /* ignore */ } }
    if (previewFilePaths) {
      previewFilePaths.forEach(p => { try { fs.unlinkSync(p); } catch { /* ignore */ } });
    }
  }
}

export async function deleteTemplate(id: string): Promise<void> {
  const template = await prisma.template.findUnique({
    where: { id },
    include: { projects: { select: { id: true } } },
  });

  if (!template) {
    throw new Error('Template not found');
  }

  if (template.projects.length > 0) {
    throw new Error(
      `Cannot delete template because it is used by ${template.projects.length} project(s).`
    );
  }

  // Delete from Cloudinary
  if (template.thumbUrl) {
    try {
      const publicId = `portfolio-builder/templates/${template.slug}/thumb`;
      await deleteFromCloudinary(publicId, 'image').catch(() => {});
    } catch (err) {}
  }

  // Note: For fully robust deletion of previews, we should ideally store their publicIds in DB.
  // For now, simpler cleanup or folder cleanup if supported by our cloudinary service.

  // Delete from database
  await prisma.template.delete({
    where: { id },
  });

  // Invalidate cache
  await RedisService.invalidateTemplateCache();
  logger.info(`Template "${template.name}" (id: ${id}) deleted successfully`, undefined);
}
