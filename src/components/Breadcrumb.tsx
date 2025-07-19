import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Category } from '../types/product';

interface BreadcrumbProps {
  categories: Category[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ categories }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
      <a href="/" className="hover:text-ml-blue">
        Inicio
      </a>
      {categories.map((category, index) => (
        <React.Fragment key={category.id}>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <a
            href={category.path}
            className={`hover:text-ml-blue ${
              index === categories.length - 1 ? 'font-medium text-gray-800' : ''
            }`}
          >
            {category.name}
          </a>
        </React.Fragment>
      ))}
    </nav>
  );
}; 