import React from 'react';
import { Product } from '../types/product';

interface ProductDescriptionProps {
  product: Product;
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
  // Split description into paragraphs for better formatting
  const descriptionParagraphs = product.description.split('\n\n').filter(paragraph => paragraph.trim().length > 0);

  return (
    <div className="pt-6 border-t border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Descripción</h2>
      
      <div className="space-y-4 text-gray-700 leading-relaxed">
        {descriptionParagraphs.map((paragraph, index) => (
          <div key={index} className="whitespace-pre-line">
            {paragraph}
          </div>
        ))}
      </div>
    </div>
  );
}; 