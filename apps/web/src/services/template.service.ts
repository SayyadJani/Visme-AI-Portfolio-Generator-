import apiClient from '@/lib/api-client';
import { TemplateDTO } from '@repo/types';

export const templateService = {
  /**
   * Upload a new template (Admin)
   */
  uploadTemplate: async (formData: FormData, adminKey?: string): Promise<{ template: TemplateDTO }> => {
    const headers: Record<string, string> = {};
    if (adminKey) {
      headers['x-admin-key'] = adminKey;
    }

    const response = await apiClient.post<{ template: TemplateDTO }>(
      '/admin/templates/upload',
      formData,
      {
        headers,
      }
    );
    return response.data;
  },
};
