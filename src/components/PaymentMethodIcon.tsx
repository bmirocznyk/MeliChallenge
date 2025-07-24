import React from 'react';

const PaymentMethodIcon: React.FC<{ method: string }> = ({ method }) => {
  const sizeClass = 'h-10 w-16';

  const methodMap: { [key: string]: JSX.Element } = {
    'visa': <img src="/payment-icons/visa.png" alt="VISA" className={`${sizeClass} object-contain`} />,
    'visa-debit': <img src="/payment-icons/visa.png" alt="VISA" className={`${sizeClass} object-contain`} />,
    'mastercard': <img src="/payment-icons/mastercard.png" alt="Mastercard" className={`${sizeClass} object-contain`} />,
    'amex': <img src="/payment-icons/amex.png" alt="AMEX" className={`${sizeClass} object-contain`} />,
    'maestro': <img src="/payment-icons/maestro.png" alt="Maestro" className={`${sizeClass} object-contain`} />,
    'mercadopago': <img src="/payment-icons/mercadopago.png" alt="Mercado Pago" className={`${sizeClass} object-contain`} />,
    'rapipago': <img src="/payment-icons/rapipago.png" alt="Rapipago" className={`${sizeClass} object-contain`} />,
    'naranja-x': (
      <div className={`${sizeClass} rounded flex items-center justify-center text-white font-bold`} style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF4500 100%)', fontSize: '7px' }}>
        NARANJA
      </div>
    ),
    'cabal': (
      <div className={`${sizeClass} rounded flex flex-col items-center justify-center text-white font-bold`} style={{ backgroundColor: '#1E4A72', fontSize: '6px' }}>
        <div className="w-3 h-3 border-2 border-white transform rotate-45 mb-1"></div>
        CABAL
      </div>
    ),
    'bank_transfer': (
      <div className={`${sizeClass} rounded flex flex-col items-center justify-center text-white font-bold`} style={{ background: 'linear-gradient(135deg, #00BFFF 0%, #1E90FF 100%)', fontSize: '6px' }}>
        <div className="flex space-x-1 mb-1">
          <div className="w-1 h-3 bg-white"></div>
          <div className="w-1 h-3 bg-white"></div>
          <div className="w-1 h-3 bg-white"></div>
        </div>
        TRANSFER
      </div>
    ),
    'pagofacil': (
      <div className={`${sizeClass} rounded-full flex flex-col items-center justify-center`} style={{ backgroundColor: '#FFD700' }}>
        <span style={{ fontSize: '8px', color: '#1976D2', fontWeight: 'bold', lineHeight: '1' }}>PAGO</span>
        <span style={{ fontSize: '7px', color: '#E91E63', fontWeight: 'bold', lineHeight: '1' }}>Fácil</span>
      </div>
    ),
    'efectivo': (
      <div className={`${sizeClass} rounded flex flex-col items-center justify-center text-white font-bold`} style={{ backgroundColor: '#4CAF50' }}>
        <span style={{ fontSize: '14px' }}>$</span>
        <span style={{ fontSize: '6px' }}>EFECTIVO</span>
      </div>
    ),
    'cash': (
      <div className={`${sizeClass} rounded flex flex-col items-center justify-center text-white font-bold`} style={{ backgroundColor: '#4CAF50' }}>
        <span style={{ fontSize: '14px' }}>$</span>
        <span style={{ fontSize: '6px' }}>EFECTIVO</span>
      </div>
    )
  };

  return methodMap[method] || (
    <div className={`${sizeClass} rounded flex items-center justify-center bg-gray-200 text-gray-700 font-bold`} style={{ fontSize: '6px' }}>
      {method.toUpperCase()}
    </div>
  );
};

export default PaymentMethodIcon; 