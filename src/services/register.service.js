import createApiClient from '../services/api.service';

class RegisterService {
  constructor(baseUrl = '/api/eduadvisor/user') {
    this.api = createApiClient(baseUrl);
  }
  async register(data) {
    try {
      const response = await this.api.json.post('/register', data);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export default new RegisterService();
