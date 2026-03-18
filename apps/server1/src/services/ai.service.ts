import OpenAI from 'openai';
import { logger } from '@repo/shared-utils';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class AIService {
  /**
   * Merges parsed resume data into the existing portfolio data template.
   * Returns a new JSON object that matches the template's schema exactly.
   */
  static async mergeResumeIntoPortfolioData(
    currentData: Record<string, any>,
    resumeData: Record<string, any>
  ): Promise<Record<string, any>> {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured on the server. Please add it to your .env file.');
    }

    const prompt = `You are an expert ATS-friendly resume and portfolio builder AI.

I have an existing portfolio template data structure (JSON):
\`\`\`json
${JSON.stringify(currentData, null, 2)}
\`\`\`

And I have the user's parsed resume data:
\`\`\`json
${JSON.stringify(resumeData, null, 2)}
\`\`\`

TASK:
Merge the user's parsed resume data INTO the existing portfolio template data structure.
- DO NOT change the keys/schema of the existing portfolio template data.
- MUST return a valid JSON object matching the exact schema of the template data.
- Fill in matching data where appropriate (e.g. map resume 'experience' to template 'experiences', 'skills' to 'skills', 'personal' to 'name'/'email' etc.).
- Convert resume bullet points into well-written, engaging descriptions where appropriate.
- Return ONLY the raw JSON object. No markdown wrappers, no backticks, no explanation.`;

    logger.info('[AIService] Calling OpenAI gpt-4.5-preview for portfolio data merge...');

    const response = await openai.chat.completions.create({
      model: 'gpt-4.5-preview',
      messages: [
        {
          role: 'developer',
          content: 'You are a JSON-generating expert. Output ONLY raw valid JSON without any markdown code blocks or explanation.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 4000,
      response_format: { type: 'json_object' },
    });

    const rawResult = response.choices[0]?.message?.content ?? '{}';
    logger.info('[AIService] AI merge completed successfully.');

    return JSON.parse(rawResult);
  }
}
