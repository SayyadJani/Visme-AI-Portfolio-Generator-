

import { Ollama } from 'ollama';
// pdfjs-dist legacy build works in Node.js
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf');
import { ParsedData, ParsedExperience, ParsedEducation, SocialLinks } from '@repo/types';
import { logger } from '@repo/shared-utils';

const OLLAMA_HOST = process.env.OLLAMA_URL || 'http://localhost:11434';
const MODEL = process.env.OLLAMA_MODEL || 'llama3.2';
const ollama = new Ollama({ host: OLLAMA_HOST });

interface TextItem {
  text: string;
  x: number;
  y: number;
  isBold: boolean;
  page: number;
}

/*****************************************************************
 * 🔵 LAYER 1 — LAYOUT ENGINE (100% Deterministic)
 *****************************************************************/

async function extractTextItems(buffer: Buffer): Promise<TextItem[]> {
  const uint8Array = new Uint8Array(buffer);
  const loadingTask = pdfjsLib.getDocument({
    data: uint8Array,
    useSystemFonts: true,
    disableFontFace: true,
    isEvalSupported: false
  });
  const pdfDoc = await loadingTask.promise;
  const items: TextItem[] = [];

  for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
    const page = await pdfDoc.getPage(pageNum);
    const content = await page.getTextContent();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content.items.forEach((item: any) => {
      const [, , , , x, y] = item.transform;
      items.push({
        text: item.str.trim(),
        x, y, page: pageNum,
        isBold: item.fontName?.toLowerCase().includes('bold') || false
      });
    });
  }
  return items.filter(i => i.text.length > 0);
}

async function extractHyperlinks(buffer: Buffer): Promise<string[]> {
  try {
    const uint8Array = new Uint8Array(buffer);
    const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
    const pdfDoc = await loadingTask.promise;
    const links: string[] = [];

    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const annotations = await page.getAnnotations();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      annotations.forEach((a: any) => {
        if (a.subtype === 'Link' && a.url) links.push(a.url);
      });
    }
    return [...new Set(links)];
  } catch {
    return [];
  }
}

function groupIntoLines(items: TextItem[]): TextItem[][] {
  items.sort((a, b) => a.page - b.page || b.y - a.y || a.x - b.x);
  const lines: TextItem[][] = [];
  const threshold = 3;

  items.forEach(item => {
    let line = lines.find(
      l => l[0].page === item.page && Math.abs(l[0].y - item.y) < threshold
    );
    if (!line) { line = []; lines.push(line); }
    line.push(item);
  });

  return lines.map(l => l.sort((a, b) => a.x - b.x));
}

function detectSections(lines: TextItem[][]): Record<string, string[]> {
  const sections: Record<string, string[]> = {};
  let current = 'CONTACT_INFO';
  sections[current] = [];

  const sectionKeywords = [
    'SUMMARY', 'PROFESSIONAL SUMMARY', 'PROFILE', 'ABOUT ME', 'OBJECTIVE',
    'EXPERIENCE', 'PROFESSIONAL EXPERIENCE', 'WORK HISTORY', 'EMPLOYMENT', 'CAREER',
    'SKILLS', 'TECHNICAL SKILLS', 'CORE COMPETENCIES', 'TECHNOLOGIES', 'STRENGTHS', 'TOOLS',
    'PROJECTS', 'KEY PROJECTS', 'ACADEMIC PROJECTS',
    'EDUCATION', 'ACADEMIC BACKGROUND', 'QUALIFICATIONS',
    'CERTIFICATIONS', 'AWARDS', 'CERTIFICATES', 'LICENSE',
    'ACTIVITIES', 'ACHIEVEMENTS', 'ACCOMPLISHMENTS'
  ];

  lines.forEach(line => {
    const text = line.map(i => i.text).join(' ').trim();
    const upperText = text.toUpperCase();

    const isSection =
      (line.length === 1 && line[0].isBold && text.length < 50) ||
      (text.length < 60 && sectionKeywords.some(k => upperText === k || upperText.includes(k)));

    if (isSection && sectionKeywords.some(k => upperText === k || upperText.includes(k))) {
      const matchedKey = sectionKeywords.find(k => upperText === k || upperText.includes(k))!;
      current = matchedKey;
      sections[current] = sections[current] ?? [];
    } else {
      sections[current].push(text);
    }
  });

  return sections;
}

function getSection(sections: Record<string, string[]>, ...keywords: string[]): string[] {
  const key = Object.keys(sections).find(
    k => k !== 'CONTACT_INFO' && keywords.some(kw => k.toUpperCase().includes(kw.toUpperCase()))
  );
  return key ? sections[key] : [];
}

function extractProfileDeterministic(profileLines: string[], links: string[]) {
  const combined = profileLines.join(' ');
  const name = profileLines[0] || '';

  const roleKeywords = ['engineer', 'developer', 'analyst', 'scientist', 'manager', 'designer',
    'architect', 'lead', 'director', 'specialist', 'consultant', 'administrator'];
  let targetRole = '';
  for (let i = 1; i < Math.min(4, profileLines.length); i++) {
    const line = profileLines[i].trim();
    const lower = line.toLowerCase();
    if (line.includes('@') || /[0-9]{5}/.test(line) || lower.includes('linkedin') || lower.includes('github')) continue;
    if (roleKeywords.some(kw => lower.includes(kw))) { targetRole = line; break; }
  }

  const email = combined.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0] || '';
  const phone = combined.match(/(\+?\d[\d\s()\-]{8,}\d)/)?.[0] || '';
  const location = combined.match(/[A-Z][a-zA-Z\s]+,\s?[A-Z]{2}/)?.[0] || '';

  const EMAIL_DOMAINS = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com',
    'icloud.com', 'protonmail.com', 'live.com', 'aol.com', 'zoho.com', 'ymail.com', 'mail.com'];

  const urlPattern = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.(?:com|io|dev|me|net|org|app|co|in)[^\s]*)/gi;
  const textUrls = (combined.match(urlPattern) || []).filter(u => {
    const lower = u.toLowerCase();
    if (lower.includes('@')) return false;
    if (EMAIL_DOMAINS.some(d => lower === d || lower.startsWith(d + '/'))) return false;
    const hasPath = lower.includes('/');
    const hasSubdomain = lower.split('.').length > 2 && !lower.startsWith('www.');
    const startsWithProto = lower.startsWith('http');
    if (!startsWithProto && !hasPath && !hasSubdomain) return false;
    return u.length > 5;
  });

  const allLinks = [...new Set([...links, ...textUrls])].map(l => l.toLowerCase());

  const socials: SocialLinks = {
    linkedin: allLinks.find(l => l.includes('linkedin.com')) || '',
    github: allLinks.find(l => l.includes('github.com')) || '',
    twitter: allLinks.find(l => l.includes('twitter.com') || l.includes('x.com')) || '',
    leetcode: allLinks.find(l => l.includes('leetcode.com')) || '',
    hackerrank: allLinks.find(l => l.includes('hackerrank.com')) || '',
    portfolio: allLinks.find(l =>
      !l.includes('linkedin.com') && !l.includes('github.com') &&
      !l.includes('twitter.com') && !l.includes('leetcode.com') &&
      !l.includes('hackerrank.com') && !l.includes('x.com') &&
      !l.includes('mailto') && (!!l && !EMAIL_DOMAINS.some(d => l.includes(d)))
    ) || ''
  };

  return { name, targetRole, email, phone, location, socials };
}

function splitBlocks(lines: string[]): string[][] {
  const blocks: string[][] = [];
  let current: string[] = [];
  const datePattern = /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December|\d{1,2}\/\d{4}|\d{4})\b/i;

  lines.forEach(line => {
    if (datePattern.test(line) && current.length > 1) {
      blocks.push(current);
      current = [];
    }
    current.push(line);
  });
  if (current.length) blocks.push(current);
  return blocks;
}

function cleanJson(text: string): string {
  const match = text.match(/\{[\s\S]*\}/);
  return match ? match[0] : text;
}

/*****************************************************************
 * 🟡 LAYER 3 — micro-LLM Refinement (Ollama)
 *****************************************************************/

async function refineExperience(block: string[]): Promise<ParsedExperience> {
  const text = block.join('\n');
  try {
    const response = await ollama.chat({
      model: MODEL,
      messages: [{
        role: 'user',
        content: `Extract experience details from the text below.
Return ONLY a valid JSON object with these keys: "title", "company", "location", "start_date", "end_date", "responsibilities" (array of strings).
TEXT:\n${text}`
      }],
      options: { temperature: 0 }
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const refined: any = JSON.parse(cleanJson(response.message.content));
    const period = [refined.start_date, refined.end_date].filter(Boolean).join(' - ') || 'Period';

    return {
      id: Math.random().toString(36).substring(2, 11),
      title: refined.title || block[0]?.substring(0, 50) || 'Experience',
      company: refined.company || 'Organization',
      period: period === '-' ? 'Period' : period,
      bullets: Array.isArray(refined.responsibilities)
        ? refined.responsibilities.join('\n')
        : text
    };
  } catch {
    return {
      id: Math.random().toString(36).substring(2, 11),
      title: block[0]?.substring(0, 50) || 'Experience',
      company: 'Organization',
      period: 'Period',
      bullets: text
    };
  }
}

async function refineEducation(block: string[]): Promise<ParsedEducation> {
  const text = block.join('\n');
  try {
    const response = await ollama.chat({
      model: MODEL,
      messages: [{
        role: 'user',
        content: `Extract education details. Return JSON ONLY.
Fields: degree, institution, year, grade
TEXT:\n${text}`
      }],
      options: { temperature: 0 }
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const refined: any = JSON.parse(cleanJson(response.message.content));
    return {
      id: Math.random().toString(36).substring(2, 11),
      degree: refined.degree || block[0] || 'Degree',
      institution: refined.institution || 'University',
      year: refined.year || 'Year',
      grade: refined.grade || 'N/A'
    };
  } catch {
    return {
      id: Math.random().toString(36).substring(2, 11),
      degree: block[0] || 'Degree',
      institution: 'University',
      year: 'Year',
      grade: 'N/A'
    };
  }
}

/*****************************************************************
 * 🏁 HYBRID ENTRY FUNCTION
 *****************************************************************/

export async function parseResumeHybrid(buffer: Buffer): Promise<ParsedData> {
  try {
    const items = await extractTextItems(buffer);
    const links = await extractHyperlinks(buffer);
    const lines = groupIntoLines(items);

    const sections = detectSections(lines);
    const profileLines = sections['CONTACT_INFO'] || sections['PROFILE'] || [];
    const identity = extractProfileDeterministic(profileLines, links);

    const summaryLines = getSection(sections, 'SUMMARY', 'PROFILE', 'ABOUT', 'OBJECTIVE');
    const skillLines = getSection(sections, 'SKILL', 'COMPETENCIES', 'TECHNOLOGIES', 'STRENGTHS', 'TOOLS');
    const expLines = getSection(sections, 'EXPERIENCE', 'WORK', 'EMPLOYMENT', 'HISTORY', 'CAREER');
    const eduLines = getSection(sections, 'EDUCATION', 'ACADEMIC', 'QUALIFICATION');
    const projLines = getSection(sections, 'PROJECT');
    const certLines = getSection(sections, 'CERTIFICATION', 'AWARDS', 'CERTIFICATE', 'LICENSE');

    const expBlocks = splitBlocks(expLines);
    const experiences: ParsedExperience[] = [];
    for (const block of expBlocks) {
      experiences.push(await refineExperience(block));
    }

    const eduBlocks = splitBlocks(eduLines);
    const educations: ParsedEducation[] = [];
    for (const block of eduBlocks) {
      educations.push(await refineEducation(block));
    }

    const skills: string[] = [];
    skillLines.forEach(line => {
      const parts = line.includes(':') ? line.split(':')[1] : line;
      parts.split(/[,|•\s{2,}]/).forEach(s => {
        const skill = s.trim();
        if (skill.length > 1) skills.push(skill);
      });
    });

    return {
      personal: {
        name: identity.name || 'Unknown',
        email: identity.email,
        phone: identity.phone,
        location: identity.location || '',
        linkedin: identity.socials.linkedin,
        github: identity.socials.github,
        portfolio: identity.socials.portfolio
      },
      socialLinks: identity.socials,
      summary: summaryLines.join(' '),
      targetRole: identity.targetRole || summaryLines[0]?.substring(0, 50) || 'Professional',
      skills: [...new Set(skills)],
      experiences,
      educations,
      projects: projLines.join('\n'),
      certifications: certLines.join('\n'),
      custom: []
    };
  } catch (err) {
    logger.error('Critical error in hybrid parser:', err);
    return {
      personal: { name: 'Failed to Parse', email: '', phone: '', location: '', linkedin: '', github: '', portfolio: '' },
      socialLinks: { linkedin: '', github: '', twitter: '', leetcode: '', hackerrank: '', portfolio: '' },
      summary: '', targetRole: '', skills: [], experiences: [], educations: [],
      projects: '', certifications: '', custom: []
    };
  }
}
