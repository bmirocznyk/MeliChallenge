import React, { useState } from 'react';
import { Star, Shield, Truck } from 'lucide-react';
import { Product } from '../types/product';
import ReviewsModal from './ReviewsModal';

interface ProductInfoProps {
  product: Product;
  onSelectVariant?: (attributeId: string, value: string) => void;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product, onSelectVariant }) => {
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const colorVariants = product.variants.filter(v => v.attributeId === 'COLOR');
  const storageVariants = product.variants.filter(v => v.attributeId === 'INTERNAL_MEMORY');

  // Stock status calculations
  const isOutOfStock = product.availableQuantity === 0;


  return (
    <div className="section-spacing">
      {/* Condition and Sales */}
      <div className="flex-start-4 text-description">
        <span className="font-medium">
          {product.condition === 'new' ? 'Nuevo' : 'Usado'}
        </span>
        <span className="separator">|</span>
        <span>
          +{product.soldQuantity} vendidos
        </span>
      </div>

      {/* Product Title */}
      <h1 className="text-2xl font-light text-gray-900 leading-tight">
        {product.title}
      </h1>

      {/* Reviews */}
      <div className="flex-start-2">
        <div className="flex-start">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < Math.floor(product.reviews.rating)
                  ? 'text-blue-500 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-label">
          {product.reviews.rating}
        </span>
        <button
          onClick={() => setIsReviewsModalOpen(true)}
          className="text-link"
        >
          ({product.reviews.totalReviews} opiniones)
        </button>
      </div>

      {/* Color Variants */}
      {colorVariants.length > 0 && (
        <div className="section-spacing-sm">
          <h3 className="text-label">
            Color: {colorVariants.find(v => v.selected)?.value}
          </h3>
          <div className="flex flex-wrap gap-2">
            {colorVariants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                onClick={() => onSelectVariant && onSelectVariant('COLOR', variant.value)}
                disabled={isOutOfStock}
                className={
                  variant.selected
                    ? 'btn-variant--selected'
                    : isOutOfStock
                    ? 'btn-variant--disabled'
                    : 'btn-variant--unselected'
                }
              >
                {variant.value}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Storage Variants */}
      {storageVariants.length > 0 && (
        <div className="section-spacing-sm">
          <h3 className="text-label">
            Memoria: {storageVariants.find(v => v.selected)?.value}
          </h3>
          <div className="flex flex-wrap gap-2">
            {storageVariants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                onClick={() => onSelectVariant && onSelectVariant('INTERNAL_MEMORY', variant.value)}
                disabled={isOutOfStock}
                className={
                  variant.selected
                    ? 'btn-variant--selected'
                    : isOutOfStock
                    ? 'btn-variant--disabled'
                    : 'btn-variant--unselected'
                }
              >
                {variant.value}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Benefits */}
      <div className="section-spacing-sm pt-4 divider">
        {!isOutOfStock && (
          <>
            <div className="flex-start-2 text-success">
              <Shield className="w-4 h-4" />
              <span>Compra Protegida</span>
            </div>
            <div className="flex-start-2 text-description">
              <Truck className="w-4 h-4" />
              <span>Envío gratis</span>
            </div>
          </>
        )}
        
        {isOutOfStock && (
          <div className="text-description">
            Producto agotado
          </div>
        )}
      </div>

      {/* Reviews Modal */}
      {isReviewsModalOpen && (
        <ReviewsModal
          isOpen={isReviewsModalOpen}
          onClose={() => setIsReviewsModalOpen(false)}
          productId={product.id}
          productTitle={product.title}
        />
      )}
    </div>
  );
}; 