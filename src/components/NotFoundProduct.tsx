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
            Not found product
          </h1>
          
          {/* Description */}
          <p className="text-lg text-gray-600 mb-8 max-w-md">
            The product you're looking for doesn't exist or is no longer available.
          </p>
          
          {/* Action buttons */}
          <div className="flex gap-4">
            <button 
              onClick={() => window.history.back()}
              className="bg-ml-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}; 