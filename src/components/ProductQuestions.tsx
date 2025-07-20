import React, { useState } from 'react';
import { X, Diamond } from 'lucide-react';

interface ProductQuestionsProps {
  product: any;
}

export const ProductQuestions: React.FC<ProductQuestionsProps> = ({ product: _product }) => {
  const [showHelp, setShowHelp] = useState(true);
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle question submission
    console.log('Question submitted:', question);
    setQuestion('');
  };

  return (
    <div className="pt-6 border-t border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Preguntas</h2>
      
      {/* Help Popup */}
      {showHelp && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 relative">
          <button
            onClick={() => setShowHelp(false)}
            className="absolute top-2 right-2 text-blue-600 hover:text-blue-800"
          >
            <X className="w-4 h-4" />
          </button>
          <h3 className="font-bold text-blue-900 mb-1">¿Tenés dudas?</h3>
          <p className="text-sm text-blue-800">
            Estos atajos te ayudarán a encontrar lo que buscas.
          </p>
        </div>
      )}

      {/* Question Categories */}
      <div className="mb-6">
        <h3 className="font-bold text-gray-900 mb-3">¿Qué querés saber?</h3>
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
            Costo y tiempo de envío
          </button>
          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
            Medios de pago y promociones
          </button>
          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
            Garantía
          </button>
        </div>
      </div>

      {/* Question Input */}
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Escribí tu pregunta..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Diamond className="w-4 h-4" />
            Preguntar
          </button>
        </div>
      </form>
    </div>
  );
}; 