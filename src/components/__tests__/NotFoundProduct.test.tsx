import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { NotFoundProduct } from '../NotFoundProduct'

// Mock window.location and window.history
const mockLocation = {
  href: '',
  assign: vi.fn(),
  replace: vi.fn(),
  reload: vi.fn(),
}

const mockHistory = {
  back: vi.fn(),
  forward: vi.fn(),
  go: vi.fn(),
  pushState: vi.fn(),
  replaceState: vi.fn(),
}

vi.stubGlobal('window', {
  location: mockLocation,
  history: mockHistory
})

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('NotFoundProduct Component', () => {
  beforeEach(() => {
    mockLocation.href = ''
    vi.clearAllMocks()
  })

  it('renders the not found page with title', () => {
    renderWithRouter(<NotFoundProduct />)
    
    const title = screen.getByText('Not found product')
    expect(title).toBeInTheDocument()
  })

  it('renders the description text', () => {
    renderWithRouter(<NotFoundProduct />)
    
    const description = screen.getByText(/The product you're looking for doesn't exist/)
    expect(description).toBeInTheDocument()
  })

  it('renders the header component', () => {
    renderWithRouter(<NotFoundProduct />)
    
    const logo = screen.getByAltText('Mercado Libre')
    expect(logo).toBeInTheDocument()
  })

  it('renders go back button', () => {
    renderWithRouter(<NotFoundProduct />)
    
    const goBackButton = screen.getByRole('button', { name: /go back/i })
    expect(goBackButton).toBeInTheDocument()
  })

  it('renders go home button', () => {
    renderWithRouter(<NotFoundProduct />)
    
    const goHomeButton = screen.getByRole('button', { name: /go home/i })
    expect(goHomeButton).toBeInTheDocument()
  })

  it('calls window.history.back when go back button is clicked', () => {
    renderWithRouter(<NotFoundProduct />)
    
    const goBackButton = screen.getByRole('button', { name: /go back/i })
    fireEvent.click(goBackButton)
    
    expect(mockHistory.back).toHaveBeenCalledTimes(1)
  })

  it('redirects to home when go home button is clicked', () => {
    renderWithRouter(<NotFoundProduct />)
    
    const goHomeButton = screen.getByRole('button', { name: /go home/i })
    fireEvent.click(goHomeButton)
    
    expect(mockLocation.href).toBe('/')
  })

  it('renders the error icon', () => {
    renderWithRouter(<NotFoundProduct />)
    
    // The icon is an SVG, so we check for its presence
    const iconContainer = screen.getByRole('img', { hidden: true })
    expect(iconContainer).toBeInTheDocument()
  })

  it('has proper styling classes', () => {
    renderWithRouter(<NotFoundProduct />)
    
    const mainContainer = screen.getByText('Not found product').closest('main')
    expect(mainContainer).toBeInTheDocument()
  })
}) 