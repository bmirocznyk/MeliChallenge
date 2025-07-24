export interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  condition: 'new' | 'used';
  availableQuantity: number;
  images: ProductImage[];
  description: string;
  reviews: ReviewInfo;
  installments: InstallmentInfo;
  categories: Category[];
  attributes: ProductAttribute[];
  variants: ProductVariant[];
  paymentMethodIds?: number[];
  seller?: Seller;
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
  reputation: 'green' | 'yellow' | 'orange' | 'red';
  level?: string;
  isOfficialStore?: boolean;
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