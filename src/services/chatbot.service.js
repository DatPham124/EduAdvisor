import createApiClient from '../services/api.service';

class ChatbotService {
  constructor(baseUrl = '/api/eduadvisor/chatbot') {
    this.api = createApiClient(baseUrl);
  }
  async sendMessage(data) {
    try {
      const response = await this.api.json.post('/send_message', data);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getMessages(id) {
    try {
      const response = await this.api.json.get(`/get_messages/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export default new ChatbotService();
