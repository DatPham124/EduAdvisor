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

  async getConversation(id) {
    try {
      const response = await this.api.json.get(`/get_conversation/${id}`);
      return response?.data.conversations || { conversations: [] };
    } catch (error) {
      console.error(error);
      return { conversations: [] };
    }
  }
}

export default new ChatbotService();
