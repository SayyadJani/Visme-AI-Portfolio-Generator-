import { Request, Response, NextFunction } from 'express';
import { createTemplateSchema } from '@repo/validation';
import { createTemplate } from '../services/template.service';
import { sendSuccess, ValidationError } from '@repo/shared-utils';

export class TemplateController {
  
  /**
   * POST /api/admin/templates/upload
   * Content-Type: multipart/form-data
   * Fields: name, description, techStack (JSON string), domain, sourceUrl
   * Files: thumbFile (optional)
   */
  static upload = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate text fields
      const parseResult = createTemplateSchema.safeParse(req.body);
      if (!parseResult.success) {
        return next(new ValidationError(parseResult.error.flatten().fieldErrors));
      }

      // Check for files
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const thumbFile = files?.thumbFile?.[0];

      const { name, description, techStack, domain, gitRepoUrl } = parseResult.data;

      const template = await createTemplate({
        name,
        description,
        techStack,
        domain,
        gitRepoUrl,
        thumbFilePath: thumbFile?.path,
      });

      sendSuccess(res, { template }, 201);
    } catch (err) {
      next(err);
    }
  };
}
