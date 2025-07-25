import React from 'react';
import { Header } from './Header';

export const NotFoundProduct: React.FC = () => {
  return (
    <div className="min-h-screen bg-ml-light-gray">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          {/* Icon */}
          <div className="mb-6">
            <svg 
              className="w-24 h-24 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33M15 19l3-3m0 0l-3-3m3 3H9" 
              />
            </svg>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Producto no encontrado
          </h1>
          
          {/* Description */}
          <p className="text-lg text-gray-600 mb-4 max-w-md">
            El producto que buscas no existe o ya no está disponible.
          </p>
          
          {/* Suggestion */}
          <p className="text-md text-gray-500 mb-8 max-w-md">
            ¿Te gustaría ver nuestro iPhone 15? Es uno de nuestros productos más populares.
          </p>
          
          {/* Action buttons */}
          <div className="flex gap-4">
            <button 
              onClick={() => window.history.back()}
              className="bg-ml-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Volver
            </button>
            <button 
              onClick={() => window.location.href = '/1'}
              className="bg-ml-yellow text-gray-800 px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors font-medium"
            >
              Ver iPhone 15
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}; 

export const MaintenanceScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-ml-light-gray">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          {/* Icon */}
          <div className="mb-6">
            <svg 
              className="w-24 h-24 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Servidor en mantenimiento
          </h1>
          {/* Description */}
          <p className="text-lg text-gray-600 mb-4 max-w-md">
            La API no está disponible en este momento. Por favor, intenta nuevamente más tarde.
          </p>
          {/* Suggestion */}
          <p className="text-md text-gray-500 mb-8 max-w-md">
            Si el problema persiste, contacta al administrador o vuelve a intentarlo en unos minutos.
          </p>
          {/* Action button */}
          <div className="flex gap-4">
            <button 
              onClick={() => window.location.reload()}
              className="bg-ml-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}; 