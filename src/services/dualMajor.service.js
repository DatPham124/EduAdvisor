import createApiClient from '../services/api.service';

class DualMajorService {
  constructor(baseUrl = '/api/eduadvisor/dualmajor') {
    this.api = createApiClient(baseUrl);
  }

  async getAllDualMajors() {
    try {
      const response = await this.api.json.get('');
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getDualMajor(id) {
    try {
      const response = await this.api.json.get(id);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async createDualMajor(data) {
    return (await this.api.post('/', data)).data;
  }

  async updateDualMajor(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }

  async deleteDualMajor(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}

export default new DualMajorService();
