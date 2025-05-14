import createApiClient from '../services/api.service';

class MajorService {
  constructor(baseUrl = '/api/eduadvisor/major') {
    this.api = createApiClient(baseUrl);
  }

  async getAllMajors(query) {
    try {
      const response = await this.api.json.get('', { params: query });
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getMajor(id) {
    return this.api.get(id);
  }

  async createMajor(data) {
    return this.api.post(data);
  }

  async updateMajor(id, data) {
    return this.api.put(id, data);
  }

  async deleteMajor(id) {
    return this.api.delete(id);
  }
}

export default new MajorService();
