import React, { useState } from 'react';
import { Product } from '../types/product';
import { Gallery } from './Gallery';
import { ProductInfo } from './ProductInfo';
import { PriceSection } from './PriceSection';
import { SellerInfo } from './SellerInfo';
import { ProductAttributes } from './ProductAttributes';
import { ProductDescription } from './ProductDescription';

interface ProductDetailProps {
  product: Product;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  // Calculate product price based on selected variants
  const calculateProductPrice = (variants: typeof product.variants, basePrice: number) => {
    let totalPrice = basePrice;
    
    // Find selected variants that have price modifiers
    const selectedVariants = variants.filter(v => v.selected && v.price);
    
    if (selectedVariants.length > 0) {
      // Use the highest price variant (typically storage variants have different prices)
      const maxPriceVariant = selectedVariants.reduce((max, current) => 
        (current.price || 0) > (max.price || 0) ? current : max
      );
      totalPrice = maxPriceVariant.price || basePrice;
    }
    
    return totalPrice;
  };

  // Initialize with correct price based on selected variants
  const [currentProduct, setCurrentProduct] = useState(() => ({
    ...product,
    price: calculateProductPrice(product.variants, product.price)
  }));

  const selectVariant = (attributeId: string, value: string) => {
    setCurrentProduct((prev) => {
      const updatedVariants = prev.variants.map((v) =>
        v.attributeId === attributeId
          ? { ...v, selected: v.value === value }
          : v
      );
      
      const newPrice = calculateProductPrice(updatedVariants, product.price);
      
      return {
        ...prev,
        variants: updatedVariants,
        price: newPrice
      };
    });
  };

  const handleProductUpdate = (updatedProduct: Product) => {
    setCurrentProduct(updatedProduct);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-8">
        {/* Left Column - Gallery, Description and Questions */}
        <div className="lg:col-span-7 space-y-0">
          <Gallery images={currentProduct.images} />
          <ProductDescription product={currentProduct} />
          
        </div>

        {/* Right Column - Product Info and Payment */}
        <div className="lg:col-span-5 space-y-6">
          <ProductInfo product={currentProduct} onSelectVariant={selectVariant} />
          <PriceSection product={currentProduct} onProductUpdate={handleProductUpdate} />
          {currentProduct.seller && <SellerInfo seller={currentProduct.seller} />}
          <ProductAttributes attributes={currentProduct.attributes} />
        </div>
      </div>
    </div>
  );
}; 