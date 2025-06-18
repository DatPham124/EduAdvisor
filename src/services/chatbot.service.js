import createApiClient from '../services/api.service';

class ChatbotService {
  constructor(baseUrl = '/api/eduadvisor/chatbot') {
    this.api = createApiClient(baseUrl);
  }
  async sendMessage(data) {
    try {
      const response = await this.api.json.post('/chat', data);
      return response.data.answer;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getUser(id) {
    try {
      const response = await this.api.json.get(`/get_user/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export default new ChatbotService();
