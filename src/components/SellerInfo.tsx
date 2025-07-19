import React from 'react';
import { Store, Shield, Star, MessageCircle } from 'lucide-react';
import { Seller } from '../types/product';

interface SellerInfoProps {
  seller: Seller;
}

export const SellerInfo: React.FC<SellerInfoProps> = ({ seller }) => {
  const getReputationColor = (reputation: string) => {
    switch (reputation) {
      case 'green':
        return 'text-green-600 bg-green-100';
      case 'yellow':
        return 'text-yellow-600 bg-yellow-100';
      case 'orange':
        return 'text-orange-600 bg-orange-100';
      case 'red':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getReputationIcon = (reputation: string) => {
    switch (reputation) {
      case 'green':
        return <Shield className="w-4 h-4" />;
      case 'yellow':
        return <Star className="w-4 h-4" />;
      case 'orange':
        return <Star className="w-4 h-4" />;
      case 'red':
        return <MessageCircle className="w-4 h-4" />;
      default:
        return <Store className="w-4 h-4" />;
    }
  };

  return (
    <div className="card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Información del vendedor</h3>
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getReputationColor(seller.reputation)}`}>
          {getReputationIcon(seller.reputation)}
          <span className="ml-1 capitalize">{seller.reputation}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Store className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-900">
            {seller.name}
          </span>
        </div>
        
        <div className="text-sm text-gray-600">
          {seller.level}
        </div>
        
        <div className="text-sm text-gray-600">
          +{seller.sales.toLocaleString()} ventas
        </div>
        
        {seller.isOfficialStore && (
          <div className="inline-flex items-center space-x-1 text-sm text-ml-blue">
            <Shield className="w-4 h-4" />
            <span>Tienda oficial</span>
          </div>
        )}
      </div>

      <div className="pt-2 border-t">
        <button className="text-sm text-ml-blue hover:text-blue-600 transition-colors">
          Ver más datos del vendedor
        </button>
      </div>
    </div>
  );
}; 