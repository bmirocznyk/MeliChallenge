import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Header } from '../Header'

// Mock window.location
const mockLocation = {
  href: '',
  assign: vi.fn(),
  replace: vi.fn(),
  reload: vi.fn(),
}

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
})

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Header Component', () => {
  beforeEach(() => {
    mockLocation.href = ''
    vi.clearAllMocks()
  })

  it('renders header with logo', () => {
    renderWithRouter(<Header />)
    
    const logo = screen.getByAltText('Mercado Libre')
    expect(logo).toBeInTheDocument()
  })

  it('renders search bar with placeholder', () => {
    renderWithRouter(<Header />)
    
    const searchInput = screen.getByPlaceholderText('Buscar productos, marcas y más...')
    expect(searchInput).toBeInTheDocument()
  })

  it('renders search button', () => {
    renderWithRouter(<Header />)
    
    const searchButton = screen.getByRole('button', { name: /buscar/i })
    expect(searchButton).toBeInTheDocument()
  })

  it('redirects to numbered route when searching a number', async () => {
    renderWithRouter(<Header />)
    
    const searchInput = screen.getByPlaceholderText('Buscar productos, marcas y más...')
    const searchButton = screen.getByRole('button', { name: /buscar/i })
    
    // Type a number
    fireEvent.change(searchInput, { target: { value: '123' } })
    fireEvent.click(searchButton)
    
    // Check if redirect happened
    expect(mockLocation.href).toBe('/123')
  })

  it('handles non-numeric search input', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    
    renderWithRouter(<Header />)
    
    const searchInput = screen.getByPlaceholderText('Buscar productos, marcas y más...')
    const searchButton = screen.getByRole('button', { name: /buscar/i })
    
    // Type text
    fireEvent.change(searchInput, { target: { value: 'producto' } })
    fireEvent.click(searchButton)
    
    // Check if console.log was called (regular search handling)
    expect(consoleSpy).toHaveBeenCalledWith('Searching for:', 'producto')
    
    consoleSpy.mockRestore()
  })

  it('handles empty search input', () => {
    renderWithRouter(<Header />)
    
    const searchInput = screen.getByPlaceholderText('Buscar productos, marcas y más...')
    const searchButton = screen.getByRole('button', { name: /buscar/i })
    
    // Leave input empty
    fireEvent.click(searchButton)
    
    // Should not redirect
    expect(mockLocation.href).toBe('')
  })

  it('handles zero as input', () => {
    renderWithRouter(<Header />)
    
    const searchInput = screen.getByPlaceholderText('Buscar productos, marcas y más...')
    const searchButton = screen.getByRole('button', { name: /buscar/i })
    
    // Type zero
    fireEvent.change(searchInput, { target: { value: '0' } })
    fireEvent.click(searchButton)
    
    // Should not redirect (only positive numbers)
    expect(mockLocation.href).toBe('')
  })

  it('handles negative numbers', () => {
    renderWithRouter(<Header />)
    
    const searchInput = screen.getByPlaceholderText('Buscar productos, marcas y más...')
    const searchButton = screen.getByRole('button', { name: /buscar/i })
    
    // Type negative number
    fireEvent.change(searchInput, { target: { value: '-5' } })
    fireEvent.click(searchButton)
    
    // Should not redirect (only positive numbers)
    expect(mockLocation.href).toBe('')
  })

  it('renders location information', () => {
    renderWithRouter(<Header />)
    
    const locationText = screen.getByText(/Enviar a/)
    expect(locationText).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    renderWithRouter(<Header />)
    
    const categoriesLink = screen.getByText('Categorías')
    const offersLink = screen.getByText('Ofertas')
    const couponsLink = screen.getByText('Cupones')
    
    expect(categoriesLink).toBeInTheDocument()
    expect(offersLink).toBeInTheDocument()
    expect(couponsLink).toBeInTheDocument()
  })

  it('renders user section', () => {
    renderWithRouter(<Header />)
    
    const userName = screen.getAllByText('Bruno')[1] // Get the second "Bruno" (user section)
    const myPurchases = screen.getByText('Mis compras')
    const favorites = screen.getByText('Favoritos')
    
    expect(userName).toBeInTheDocument()
    expect(myPurchases).toBeInTheDocument()
    expect(favorites).toBeInTheDocument()
  })

  it('renders shopping cart with item count', () => {
    renderWithRouter(<Header />)
    
    const cartButton = screen.getAllByRole('button')[2] // Get the shopping cart button (third button)
    const itemCount = screen.getByText('1')
    
    expect(cartButton).toBeInTheDocument()
    expect(itemCount).toBeInTheDocument()
  })
}) 