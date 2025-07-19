import React from 'react';

interface PaymentMethodIconProps {
  method: string;
  size?: 'small' | 'medium';
  className?: string;
}

const PaymentMethodIcon: React.FC<PaymentMethodIconProps> = ({ 
  method, 
  size = 'medium', 
  className = '' 
}) => {
  const getIconSrc = (method: string) => {
    const iconMap: { [key: string]: string } = {
      'visa': '/payment-icons/visa.png',
      'mastercard': '/payment-icons/mastercard.png',
      'amex': '/payment-icons/amex.png',
      'maestro': '/payment-icons/maestro.png',
      'mercadopago': '/payment-icons/mercadopago.png',
      'naranja-x': '/payment-icons/naranja-x.svg',
      'cabal': '/payment-icons/cabal.svg',
      'rapipago': '/payment-icons/rapipago.svg'
    };
    
    return iconMap[method] || null;
  };

  const getIconText = (method: string) => {
    const textMap: { [key: string]: string } = {
      'visa': 'VISA',
      'mastercard': 'MC',
      'amex': 'AMEX',
      'maestro': 'maestro',
      'mercadopago': 'mercado pago',
      'naranja-x': 'Naranja X',
      'cabal': 'CABAL',
      'rapipago': 'rapipago'
    };
    
    return textMap[method] || method;
  };

  const getSizeClass = (size: 'small' | 'medium') => {
    return size === 'small' ? 'payment-icon-small' : 'payment-icon-medium';
  };

  const iconSrc = getIconSrc(method);
  
  if (iconSrc) {
    return (
      <img 
        src={iconSrc} 
        alt={getIconText(method)}
        className={`${getSizeClass(size)} ${className}`}
      />
    );
  }

  // Fallback to text if no icon is available
  return (
    <span className={`inline-block px-2 py-1 text-xs font-bold rounded ${className}`}>
      {getIconText(method)}
    </span>
  );
};

export default PaymentMethodIcon; 