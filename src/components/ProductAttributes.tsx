import React from 'react';
import { ProductAttribute } from '../types/product';

interface ProductAttributesProps {
  attributes: ProductAttribute[];
}

export const ProductAttributes: React.FC<ProductAttributesProps> = ({ attributes }) => {
  return (
    <div className="card p-4 space-y-4">
      <h3 className="font-medium text-gray-900">Características principales</h3>
      
      <div className="space-y-3">
        {attributes.map((attribute) => (
          <div key={attribute.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
            <span className="text-sm text-gray-600">
              {attribute.name}
            </span>
            <span className="text-sm font-medium text-gray-900">
              {attribute.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}; 