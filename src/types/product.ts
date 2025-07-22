export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  currency: string;
  condition: 'new' | 'used';
  soldQuantity: number;
  availableQuantity: number;
  images: ProductImage[];
  description: string;
  features: string[];
  shipping: ShippingInfo;
  reviews: ReviewInfo;
  installments: InstallmentInfo;
  categories: Category[];
  attributes: ProductAttribute[];
  variants: ProductVariant[];
  paymentMethodIds?: number[];
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface Seller {
  id: string | number;
  name: string;
  username?: string;
  type?: string;
  reputation: 'green' | 'yellow' | 'orange' | 'red'; // Keep original for component compatibility
  reputationScore?: number; // Add for numeric reputation from backend
  totalSales?: number; // For backend JSON data
  salesHistory?: {
    thisMonth: number;
    lastMonth: number;
    thisYear: number;
    allTime: number;
  };
  location?: string;
  verified?: boolean;
  premium?: boolean;
  responseTime?: string;
  level?: string;
  sales?: number; // Keep for backward compatibility
  isOfficialStore?: boolean;
}

export interface ShippingInfo {
  freeShipping: boolean;
  mode: string;
  estimatedDelivery: string;
  cost: number;
}

export interface ReviewInfo {
  rating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface InstallmentInfo {
  quantity: number;
  amount: number;
  totalAmount: number;
  interestRate: number;
  isFree: boolean;
}

export interface Category {
  id: string;
  name: string;
  path: string;
}

export interface ProductAttribute {
  id: string;
  name: string;
  value: string;
  group?: string;
}

export interface ProductVariant {
  id: string;
  attributeId: string;
  value: string;
  selected: boolean;
  available: boolean;
  price?: number;
}

export interface PaymentMethod {
  id: number;
  name: string;
  type: 'credit_card' | 'debit_card' | 'digital_wallet' | 'cash_payment' | 'bank_transfer';
  category: string;
  icon: string | null;
}

export interface ReviewItem {
  id: number;
  userId: number;
  username: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
} 