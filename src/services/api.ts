const API_BASE_URL = 'http://localhost:4000/api';

export const apiService = {
  async getItem(id: number) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Product not found');
    }
    return response.json();
  }
}; 