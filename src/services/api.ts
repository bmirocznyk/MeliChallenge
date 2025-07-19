const API_BASE_URL = 'http://localhost:4000/api';

export const apiService = {
  async getItem(id: number) {
    const response = await fetch(`${API_BASE_URL}/items/${id}`);
    if (!response.ok) {
      throw new Error('Item not found');
    }
    return response.json();
  }
}; 