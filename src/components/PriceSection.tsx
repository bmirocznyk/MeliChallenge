import React, { useState, useEffect } from 'react';
import { CreditCard, ShoppingCart, Heart, Minus, Plus, AlertTriangle } from 'lucide-react';
import { Product, PaymentMethod } from '../types/product';
import PaymentMethodIcon from './PaymentMethodIcon';
import { api } from '../services/api';

interface PriceSectionProps {
  product: Product;
  onProductUpdate?: (updatedProduct: Product) => void;
}

export const PriceSection: React.FC<PriceSectionProps> = ({ product, onProductUpdate }) => {
  const [quantity, setQuantity] = useState(1);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);

  // Stock status calculations
  const isOutOfStock = product.availableQuantity === 0;
  const isLowStock = product.availableQuantity === 1;
  const canPurchase = product.availableQuantity > 0;

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      if (product.paymentMethodIds && product.paymentMethodIds.length > 0) {
        setIsLoading(true);
        try {
          const methods = await api.getPaymentMethodsByIds(product.paymentMethodIds);
          setPaymentMethods(methods);
        } catch (error) {
          console.error('Failed to fetch payment methods:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPaymentMethods();
  }, [product.paymentMethodIds]);

  // Reset quantity if it exceeds available stock
  useEffect(() => {
    if (quantity > product.availableQuantity && product.availableQuantity > 0) {
      setQuantity(Math.min(quantity, product.availableQuantity));
    }
  }, [product.availableQuantity, quantity]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price);
  };

  const increaseQuantity = () => {
    if (quantity < product.availableQuantity && canPurchase) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handlePurchase = async () => {
    if (!canPurchase || isPurchasing) return;
    
    setIsPurchasing(true);
    try {
      const updatedProduct = await api.purchaseProduct(product.id, quantity);
      
      // Update the local product state with the new availableQuantity
      if (onProductUpdate) {
        onProductUpdate({
          ...product,
          availableQuantity: updatedProduct.availableQuantity
        });
      }
      
      // Reset quantity to 1 after successful purchase
      setQuantity(1);
      
      // Show success message (you can replace this with a toast or modal)
      alert(`¡Compra exitosa! Compraste ${quantity} unidad(es) de "${updatedProduct.title}". Stock restante: ${updatedProduct.availableQuantity}`);
    } catch (error) {
      console.error('Purchase failed:', error);
      alert(`Error en la compra: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      setIsPurchasing(false);
    }
  };

  // Group payment methods by category
  const groupedPaymentMethods = paymentMethods.reduce((acc, method) => {
    if (!acc[method.category]) {
      acc[method.category] = [];
    }
    acc[method.category].push(method);
    return acc;
  }, {} as Record<string, PaymentMethod[]>);

  // Convert method name to slug for PaymentMethodIcon
  const getMethodSlug = (methodName: string): string => {
    const nameToSlug: { [key: string]: string } = {
      'Visa': 'visa',
      'Visa Débito': 'visa-debit',
      'Mastercard': 'mastercard',
      'American Express': 'amex',
      'Maestro': 'maestro',
      'Mercado Pago': 'mercadopago',
      'Rapipago': 'rapipago',
      'Naranja X': 'naranja-x',
      'Cabal': 'cabal',
      'Pago Fácil': 'pagofacil',
      'Transferencia bancaria': 'bank_transfer'
    };
    return nameToSlug[methodName] || methodName.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <div className="space-y-6 pt-6 border-t border-gray-200">
      {/* Price Section */}
      <div className="space-y-2">
        <div className={`text-3xl font-light ${isOutOfStock ? 'text-gray-500' : 'text-gray-900'}`}>
          {formatPrice(product.price)}
        </div>
        {canPurchase && (
          <>
            <div className="text-sm text-gray-600">
              {product.installments.isFree ? 'Mismo precio en' : 'en'} {product.installments.quantity} cuotas de {formatPrice(product.installments.amount)}
            </div>
            {product.installments.isFree && (
              <div className="text-sm text-green-600 font-medium">
                sin interés
              </div>
            )}
          </>
        )}
      </div>

      {/* Stock Warnings - Only show subtle warning for last unit */}
      {isLowStock && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
            <p className="text-yellow-800 text-sm">Última unidad disponible</p>
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      {canPurchase && (
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">
            Cantidad:
          </label>
          <div className="flex items-center space-x-3">
            <button
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
              className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-medium">
              {quantity}
            </span>
            <button
              onClick={increaseQuantity}
              disabled={quantity >= product.availableQuantity}
              className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-500">
              ({product.availableQuantity} disponibles)
            </span>
          </div>
        </div>
      )}

      {/* Purchase Buttons */}
      <div className="space-y-3">
        <button 
          onClick={handlePurchase}
          disabled={!canPurchase || isPurchasing}
          className={`w-full font-medium py-3 px-6 rounded-md transition-colors ${
            canPurchase && !isPurchasing
              ? 'bg-blue-500 hover:bg-blue-600 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isPurchasing ? 'Procesando...' : isOutOfStock ? 'Sin stock' : 'Comprar ahora'}
        </button>
        <button 
          disabled={!canPurchase}
          className={`w-full font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center space-x-2 ${
            canPurchase 
              ? 'bg-white border border-blue-500 text-blue-500 hover:bg-blue-50' 
              : 'bg-gray-100 border border-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
          <span>{isOutOfStock ? 'Sin stock' : 'Agregar al carrito'}</span>
        </button>
      </div>

      {/* Wishlist Button */}
      <button className="w-full flex items-center justify-center space-x-2 text-blue-500 hover:text-blue-600 transition-colors py-2">
        <Heart className="w-5 h-5" />
        <span>{isOutOfStock ? 'Seguir producto' : 'Agregar a favoritos'}</span>
      </button>

      {/* Payment Methods - Always visible */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center space-x-2 text-gray-600 mb-4">
          <CreditCard className="w-5 h-5" />
          <span className="font-medium">Medios de pago</span>
        </div>
        
        {isLoading ? (
          <div className="text-sm text-gray-500">Cargando métodos de pago...</div>
        ) : paymentMethods.length === 0 ? (
          <div className="text-sm text-gray-500">No se pudieron cargar los métodos de pago</div>
        ) : (
          <>
            {Object.entries(groupedPaymentMethods).map(([category, methods]) => (
              <div key={category} className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">{category}</div>
                <div className="flex space-x-2 flex-wrap gap-2">
                  {methods.map((method) => (
                    <div key={method.id} className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <PaymentMethodIcon method={getMethodSlug(method.name)} size="small" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Shipping Info - Hardcoded */}
      <div className="border-t border-gray-200 pt-6">
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700">
            Envío
          </div>
          <div className="text-sm text-gray-600">
            <span className="text-green-600 font-medium">Gratis</span>
          </div>
          {canPurchase && (
            <div className="text-xs text-gray-500">
              Llega en 2-3 días hábiles
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 