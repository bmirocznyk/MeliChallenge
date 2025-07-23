import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProductDetail } from '../ProductDetail';
import { Product } from '../../types/product';

// Mock the API
vi.mock('../../services/api', () => ({
  api: {
    getPaymentMethodsByIds: vi.fn().mockResolvedValue([]),
    purchaseProduct: vi.fn().mockResolvedValue({ availableQuantity: 5 })
  }
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

const mockProduct: Product = {
  id: 'test-1',
  title: 'Test iPhone',
  price: 100000,
  currency: 'ARS',
  condition: 'new',
  soldQuantity: 100,
  availableQuantity: 10,
  images: [
    {
      id: '1',
      url: 'https://example.com/image.jpg',
      alt: 'Test image',
      width: 400,
      height: 400
    }
  ],
  description: 'Test description',
  reviews: {
    rating: 4.5,
    totalReviews: 100,
    ratingDistribution: { 5: 50, 4: 30, 3: 15, 2: 3, 1: 2 }
  },
  installments: {
    quantity: 12,
    amount: 8333,
    totalAmount: 100000,
    interestRate: 0,
    isFree: true
  },
  categories: [
    { id: '1', name: 'Electronics', path: '/electronics' }
  ],
  attributes: [
    { id: 'brand', name: 'Brand', value: 'Apple' }
  ],
  variants: [
    {
      id: 'color_black',
      attributeId: 'COLOR',
      value: 'Black',
      selected: true,
      available: true
    },
    {
      id: 'color_white',
      attributeId: 'COLOR',
      value: 'White',
      selected: false,
      available: true
    },
    {
      id: 'storage_128gb',
      attributeId: 'INTERNAL_MEMORY',
      value: '128 GB',
      selected: true,
      available: true
    },
    {
      id: 'storage_256gb',
      attributeId: 'INTERNAL_MEMORY',
      value: '256 GB',
      selected: false,
      available: true,
      price: 120000
    }
  ],
  paymentMethodIds: [1, 2, 3]
};

describe('ProductDetail Component', () => {
  it('renders product information correctly', () => {
    renderWithRouter(<ProductDetail product={mockProduct} />);
    
    expect(screen.getByText('Test iPhone')).toBeInTheDocument();
    expect(screen.getByText(/Test description/)).toBeInTheDocument();
  });

  it('calculates correct price when storage variant is selected', () => {
    renderWithRouter(<ProductDetail product={mockProduct} />);
    
    // Find and click the 256GB storage option
    const storageButton = screen.getByText('256 GB');
    fireEvent.click(storageButton);
    
    // Price should update to the variant price
    expect(screen.getByText('$120.000')).toBeInTheDocument();
  });

  it('updates variant selection state correctly', () => {
    renderWithRouter(<ProductDetail product={mockProduct} />);
    
    // Initially Black should be selected
    const blackButton = screen.getByText('Black');
    const whiteButton = screen.getByText('White');
    
    expect(blackButton).toHaveClass('bg-blue-500');
    expect(whiteButton).not.toHaveClass('bg-blue-500');
    
    // Click white variant
    fireEvent.click(whiteButton);
    
    // Now white should be selected
    expect(whiteButton).toHaveClass('bg-blue-500');
  });

  it('maintains base price when no price variant is selected', () => {
    const productWithoutPriceVariants = {
      ...mockProduct,
      variants: mockProduct.variants.map(v => ({ ...v, price: undefined }))
    };
    
    renderWithRouter(<ProductDetail product={productWithoutPriceVariants} />);
    
    // Should show original price
    expect(screen.getByText('$100.000')).toBeInTheDocument();
  });

  it('initializes with correct price based on pre-selected variants', () => {
    const productWithPreselectedExpensive = {
      ...mockProduct,
      variants: mockProduct.variants.map(v => 
        v.id === 'storage_256gb' 
          ? { ...v, selected: true, price: 120000 }
          : { ...v, selected: false }
      )
    };
    
    renderWithRouter(<ProductDetail product={productWithPreselectedExpensive} />);
    
    // Should initialize with the expensive variant price
    expect(screen.getByText('$120.000')).toBeInTheDocument();
  });
}); 