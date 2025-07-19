import { describe, it, expect, vi, beforeEach } from 'vitest'
import { apiService } from '../api'

// Mock fetch globally
global.fetch = vi.fn()

describe('API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('successfully fetches an item', async () => {
    const mockProduct = {
      id: 1,
      name: 'Test Product',
      price: 100
    }

    // Mock successful response
    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProduct
    })

    const result = await apiService.getItem(1)

    expect(fetch).toHaveBeenCalledWith('http://localhost:4000/api/items/1')
    expect(result).toEqual(mockProduct)
  })

  it('handles API errors', async () => {
    // Mock error response
    ;(fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    })

    await expect(apiService.getItem(999)).rejects.toThrow('Item not found')
  })

  it('handles network errors', async () => {
    // Mock network error
    ;(fetch as any).mockRejectedValueOnce(new Error('Network error'))

    await expect(apiService.getItem(1)).rejects.toThrow('Network error')
  })

  it('handles JSON parsing errors', async () => {
    // Mock response with invalid JSON
    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => {
        throw new Error('Invalid JSON')
      }
    })

    await expect(apiService.getItem(1)).rejects.toThrow('Invalid JSON')
  })

  it('calls correct endpoint for different IDs', async () => {
    const mockProduct = { id: 2, name: 'Product 2' }

    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProduct
    })

    await apiService.getItem(2)

    expect(fetch).toHaveBeenCalledWith('http://localhost:4000/api/items/2')
  })
}) 