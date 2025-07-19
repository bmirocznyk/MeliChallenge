import React, { useState } from 'react';
import { Product } from '../types/product';
import { Gallery } from './Gallery';
import { ProductInfo } from './ProductInfo';
import { PriceSection } from './PriceSection';
import { SellerInfo } from './SellerInfo';
import { ProductAttributes } from './ProductAttributes';
import { ProductDescription } from './ProductDescription';
import { ProductQuestions } from './ProductQuestions';

interface ProductDetailProps {
  product: Product;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [currentProduct, setCurrentProduct] = useState(product);

  const selectVariant = (attributeId: string, value: string) => {
    setCurrentProduct((prev) => ({
      ...prev,
      variants: prev.variants.map((v) =>
        v.attributeId === attributeId
          ? { ...v, selected: v.value === value }
          : v
      ),
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-8">
        {/* Left Column - Gallery, Description and Questions */}
        <div className="lg:col-span-7 space-y-0">
          <Gallery images={currentProduct.images} />
          <ProductDescription product={currentProduct} />
          <ProductQuestions product={currentProduct} />
        </div>

        {/* Right Column - Product Info and Payment */}
        <div className="lg:col-span-5 space-y-6">
          <ProductInfo product={currentProduct} onSelectVariant={selectVariant} />
          <PriceSection product={currentProduct} />
          <SellerInfo seller={currentProduct.seller} />
          <ProductAttributes attributes={currentProduct.attributes} />
        </div>
      </div>
    </div>
  );
}; 