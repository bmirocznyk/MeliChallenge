export interface Product {
  id: string | number;
  title: string;
  price: number;
  originalPrice?: number;
  currency: string;
  condition: 'new' | 'used';
  soldQuantity?: number;
  availableQuantity?: number;
  brand?: string;
  model?: string;
  description: string;
  features?: string[];
  specifications?: any;
  images: ProductImage[];
  sellerId: string | number;
  shipping?: ShippingInfo;
  reviews: ReviewInfo | Review[];
  installments?: InstallmentInfo;
  categories: Category[];
  attributes: ProductAttribute[];
  variants: ProductVariant[];
  availability?: any;
  payment?: any;
  priceHistory?: any;
  paymentMethodIds: number[];
}

export interface ProductImage {
  id: string | number;
  url: string;
  alt: string;
  width?: number;
  height?: number;
  order?: number;
  isMain?: boolean;
}

export interface Seller {
  id: string | number;
  name: string;
  reputation?: 'green' | 'yellow' | 'orange' | 'red' | number;
  level?: string;
  sales?: number;
  isOfficialStore?: boolean;
  username?: string;
  type?: string;
  totalSales?: number;
  location?: string;
  verified?: boolean;
  premium?: boolean;
  responseTime?: string;
  shippingOptions?: string[];
  returnPolicy?: string;
  warranty?: string;
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
}

export interface Review {
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

export interface InstallmentInfo {
  quantity: number;
  amount: number;
  totalAmount: number;
  interestRate: number;
  isFree: boolean;
}

export interface Category {
  id: string | number;
  name: string;
  path?: string;
  slug?: string;
  parentId?: number | null;
  level?: number;
  totalItems?: number;
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