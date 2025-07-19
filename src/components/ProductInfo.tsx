import React from 'react';
import { Star, Shield, Truck } from 'lucide-react';
import { Product } from '../types/product';

interface ProductInfoProps {
  product: Product;
  onSelectVariant?: (attributeId: string, value: string) => void;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product, onSelectVariant }) => {
  const colorVariants = product.variants.filter(v => v.attributeId === 'COLOR');
  const storageVariants = product.variants.filter(v => v.attributeId === 'INTERNAL_MEMORY');

  return (
    <div className="space-y-6">
      {/* Condition and Sales */}
      <div className="flex items-center space-x-4 text-sm text-gray-600">
        <span className="font-medium">
          {product.condition === 'new' ? 'Nuevo' : 'Usado'}
        </span>
        <span className="text-gray-400">|</span>
        <span>
          +{product.soldQuantity} vendidos
        </span>
      </div>

      {/* Product Title */}
      <h1 className="text-2xl font-light text-gray-900 leading-tight">
        {product.title}
      </h1>

      {/* Reviews */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
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
        <span className="text-sm font-medium text-gray-900">
          {product.reviews.rating}
        </span>
        <span className="text-sm text-gray-500">
          ({product.reviews.totalReviews} opiniones)
        </span>
      </div>

      {/* Color Variants */}
      {colorVariants.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-900">
            Color: {colorVariants.find(v => v.selected)?.value}
          </h3>
          <div className="flex flex-wrap gap-2">
            {colorVariants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                onClick={() => onSelectVariant && onSelectVariant('COLOR', variant.value)}
                className={`px-4 py-2 text-sm border rounded-md transition-colors ${
                  variant.selected
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-gray-300 hover:border-gray-400 bg-white'
                }`}
              >
                {variant.value}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Storage Variants */}
      {storageVariants.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-900">
            Memoria: {storageVariants.find(v => v.selected)?.value}
          </h3>
          <div className="flex flex-wrap gap-2">
            {storageVariants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                onClick={() => onSelectVariant && onSelectVariant('INTERNAL_MEMORY', variant.value)}
                className={`px-4 py-2 text-sm border rounded-md transition-colors ${
                  variant.selected
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-gray-300 hover:border-gray-400 bg-white'
                }`}
              >
                {variant.value}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Benefits */}
      <div className="space-y-3 pt-4 border-t border-gray-200">
        {product.shipping.freeShipping && (
          <div className="flex items-center space-x-2 text-sm text-green-600">
            <Truck className="w-4 h-4" />
            <span className="font-medium">Envío gratis</span>
          </div>
        )}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Shield className="w-4 h-4" />
          <span>Compra protegida</span>
        </div>
        <div className="text-sm text-gray-600">
          Stock disponible: {product.availableQuantity} unidades
        </div>
      </div>
    </div>
  );
}; 