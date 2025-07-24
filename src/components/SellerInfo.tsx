import React from 'react';
import { Seller } from '../types/product';
import { Store, Shield } from 'lucide-react';

interface SellerInfoProps {
  seller: Seller;
}

export const SellerInfo: React.FC<SellerInfoProps> = ({ seller }) => {
  function getReputationColor(reputation: Seller['reputation']) {
    switch (reputation) {
      case 'green': return 'bg-green-100 text-green-700';
      case 'yellow': return 'bg-yellow-100 text-yellow-700';
      case 'orange': return 'bg-orange-100 text-orange-700';
      case 'red': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }

  function getReputationIcon(reputation: Seller['reputation']) {
    switch (reputation) {
      case 'green': return <span>●</span>;
      case 'yellow': return <span>●</span>;
      case 'orange': return <span>●</span>;
      case 'red': return <span>●</span>;
      default: return <span>●</span>;
    }
  }

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
        {typeof seller.totalSales === 'number' && (
          <div className="text-sm text-gray-600">
            {seller.totalSales.toLocaleString()} ventas
          </div>
        )}
        {seller.level && (
          <div className="text-sm text-gray-600">
            {seller.level}
          </div>
        )}
        {seller.isOfficialStore && (
          <div className="inline-flex items-center space-x-1 text-sm text-ml-blue">
            <Shield className="w-4 h-4" />
            <span>Tienda oficial</span>
          </div>
        )}
      </div>
    </div>
  );
}; 