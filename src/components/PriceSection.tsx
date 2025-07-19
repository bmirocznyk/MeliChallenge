import React, { useState } from 'react';
import { CreditCard, ShoppingCart, Heart, Minus, Plus, ChevronDown } from 'lucide-react';
import { Product } from '../types/product';
import PaymentMethodIcon from './PaymentMethodIcon';

interface PriceSectionProps {
  product: Product;
}

export const PriceSection: React.FC<PriceSectionProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [showAllPaymentMethods, setShowAllPaymentMethods] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price);
  };

  const increaseQuantity = () => {
    if (quantity < product.availableQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="space-y-6 pt-6 border-t border-gray-200">
      {/* Price Section */}
      <div className="space-y-2">
        <div className="text-3xl font-light text-gray-900">
          {formatPrice(product.price)}
        </div>
        <div className="text-sm text-gray-600">
          {product.installments.isFree ? 'Mismo precio en' : 'en'} {product.installments.quantity} cuotas de {formatPrice(product.installments.amount)}
        </div>
        {product.installments.isFree && (
          <div className="text-sm text-green-600 font-medium">
            sin interés
          </div>
        )}
      </div>

      {/* Quantity Selector */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">
          Cantidad:
        </label>
        <div className="flex items-center space-x-3">
          <button
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
            className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center font-medium">
            {quantity}
          </span>
          <button
            onClick={increaseQuantity}
            disabled={quantity >= product.availableQuantity}
            className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
          </button>
          <span className="text-sm text-gray-500">
            ({product.availableQuantity} disponibles)
          </span>
        </div>
      </div>

      {/* Purchase Buttons */}
      <div className="space-y-3">
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md transition-colors">
          Comprar ahora
        </button>
        <button className="w-full bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center space-x-2">
          <ShoppingCart className="w-5 h-5" />
          <span>Agregar al carrito</span>
        </button>
      </div>

      {/* Wishlist Button */}
      <button className="w-full flex items-center justify-center space-x-2 text-blue-500 hover:text-blue-600 transition-colors py-2">
        <Heart className="w-5 h-5" />
        <span>Agregar a favoritos</span>
      </button>

      {/* Payment Methods */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center space-x-2 text-gray-600 mb-4">
          <CreditCard className="w-5 h-5" />
          <span className="font-medium">Medios de pago</span>
        </div>
        
        {/* Cuotas sin Tarjeta */}
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Cuotas sin Tarjeta</div>
          <div className="flex space-x-2">
            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
              <PaymentMethodIcon method="mercadopago" size="small" />
            </div>
          </div>
        </div>

        {/* Tarjetas de crédito */}
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Tarjetas de crédito</div>
          <div className="flex space-x-2">
            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
              <PaymentMethodIcon method="visa" size="small" />
            </div>
            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
              <PaymentMethodIcon method="amex" size="small" />
            </div>
            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
              <PaymentMethodIcon method="mastercard" size="small" />
            </div>
            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
              <PaymentMethodIcon method="naranja-x" size="small" />
            </div>
          </div>
        </div>

        {/* More Payment Methods Link */}
        <button 
          onClick={() => setShowAllPaymentMethods(!showAllPaymentMethods)}
          className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center space-x-1"
        >
          <span>Conocé otros medios de pago</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showAllPaymentMethods ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Shipping Info */}
      <div className="border-t border-gray-200 pt-6">
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700">
            Envío
          </div>
          <div className="text-sm text-gray-600">
            {product.shipping.freeShipping ? (
              <span className="text-green-600 font-medium">Gratis</span>
            ) : (
              formatPrice(product.shipping.cost)
            )}
          </div>
          <div className="text-xs text-gray-500">
            Llega {product.shipping.estimatedDelivery}
          </div>
        </div>
      </div>
    </div>
  );
}; 