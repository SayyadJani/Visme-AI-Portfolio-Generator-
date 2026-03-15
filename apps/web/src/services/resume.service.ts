import apiClient from '@/lib/api-client';
import { ParsedData } from '@repo/types';

export const resumeService = {
  /**
   * Parse a resume PDF
   */
  parseResume: async (file: File): Promise<ParsedData> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<{ resumeId: number, parsed: ParsedData }>(
      '/resume/parse',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    // The interceptor already unwrapped response.data to the object { resumeId, parsed }
    return (response.data as any).parsed;
  },

  /**
   * Apply parsed resume data to a project
   */
  applyToProject: async (projectId: number, data: ParsedData): Promise<{ success: boolean }> => {
    const response = await apiClient.post<{ success: boolean }>(
      `/resume/apply/${projectId}`,
      data
    );
    return response.data;
  },
};
