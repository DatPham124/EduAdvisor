import createApiClient from './api.service';

class AdmissionInfoService {
  constructor(baseUrl = '/api/eduadvisor/admission_info') {
    this.api = createApiClient(baseUrl);
  }
  async getAllInfo(query) {
    try {
      const response = await this.api.json.get('', { params: query });
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export default new AdmissionInfoService();
