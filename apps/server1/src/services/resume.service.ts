import fs from 'fs';
import fsPromises from 'fs/promises';
import { prisma } from '@repo/database';
import { ParsedData } from '@repo/types';
import { logger } from '@repo/shared-utils';
import { parseResumeHybrid } from './resume.parser';
import path from 'path';

const OLLAMA_HOST = process.env.OLLAMA_URL || 'http://localhost:11434';
const MODEL = process.env.OLLAMA_MODEL || 'llama3.2';

export class ResumeService {

  static async parseOnly(filePath: string): Promise<ParsedData> {
    let buffer: Buffer;

    try {
      buffer = fs.readFileSync(filePath);
    } catch (err) {
      logger.error('Failed to read PDF file:', err);
      throw new Error('Failed to read uploaded file');
    } finally {
      // Always clean up temp file
      try { await fsPromises.unlink(filePath); } catch (_) { /* ignore */ }
    }

    // Check Ollama is available
    try {
      const { default: axiosDefault } = await import('axios');
      await axiosDefault.get(`${OLLAMA_HOST}/api/tags`, { timeout: 5000 });
    } catch {
      logger.warn(`Ollama is not running at ${OLLAMA_HOST}. Some refinement might fail.`);
    }

    return await parseResumeHybrid(buffer!);
  }

  static async saveParsedData(userId: string | number, parsed: ParsedData) {
    return await prisma.resume.create({
      data: {
        userId: Number(userId),
        parsedJson: parsed as any,
      }
    });
  }

  static async applyToProject(userId: number, resumeId: number, projectId: number): Promise<void> {
    const resume = await prisma.resume.findUnique({ where: { id: resumeId } });
    if (!resume || Number(resume.userId) !== userId) throw new Error('Resume not found');

    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project || Number(project.userId) !== userId) throw new Error('Project not found');

    const parsed = resume.parsedJson as unknown as ParsedData;
    const tokens = {
      '{{NAME}}': parsed.personal.name,
      '{{EMAIL}}': parsed.personal.email,
      '{{PHONE}}': parsed.personal.phone,
      '{{LOCATION}}': parsed.personal.location,
      '{{SUMMARY}}': parsed.summary,
      '{{TITLE}}': parsed.targetRole || '',
      '{{SKILLS}}': parsed.skills.join(', '),
    };

    // Replace in all .jsx, .tsx, .html files in src
    const srcPath = path.join(project.diskPath, 'src');
    if (!fs.existsSync(srcPath)) return;

    const files = this.getAllFiles(srcPath);
    for (const f of files) {
      if (!f.match(/\.(jsx|tsx|html|js|ts)$/)) continue;
      let content = fs.readFileSync(f, 'utf-8');
      let changed = false;
      for (const [token, value] of Object.entries(tokens)) {
        if (content.includes(token)) {
          content = content.replace(new RegExp(token, 'g'), value || '');
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(f, content, 'utf-8');
      }
    }
  }

  private static getAllFiles(dir: string): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      file = path.join(dir, file);
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        results = results.concat(this.getAllFiles(file));
      } else {
        results.push(file);
      }
    });
    return results;
  }
}
