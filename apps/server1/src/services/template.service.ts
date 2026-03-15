import * as fs from 'fs';
import { prisma } from '@repo/database';
import type { TemplateDTO } from '@repo/types';
import { deleteFromCloudinary, uploadTemplateThumbnail } from './cloudinary.service';
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
  thumbFilePath?: string; // temp path, optional
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
  } = params;

  const slug = generateSlug(name);

  // Check slug is unique
  const existing = await prisma.template.findUnique({ where: { slug } });
  if (existing) {
    throw new Error(`A template with slug "${slug}" already exists`);
  }

  let thumbUpload: { secureUrl: string; publicId: string } | null = null;

  try {
    // Upload thumbnail if provided
    if (thumbFilePath) {
      logger.info(`Uploading thumbnail for template "${name}"`, undefined);
      thumbUpload = await uploadTemplateThumbnail(thumbFilePath, slug);
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
      },
    });

    logger.info(`Template "${name}" created with id ${template.id}`, undefined);

    // Invalidate cache so it shows up immediately in the library
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
      isActive: template.isActive,
      createdAt: template.createdAt,
      updatedAt: template.updatedAt,
    };
  } catch (err) {
    // ROLLBACK: if DB save failed but Cloudinary upload succeeded, clean it up
    if (thumbUpload) {
      await deleteFromCloudinary(thumbUpload.publicId, 'image').catch(() => {});
    }
    throw err;
  } finally {
    // Clean up temp file
    if (thumbFilePath) { try { fs.unlinkSync(thumbFilePath); } catch { /* ignore */ } }
  }
}
