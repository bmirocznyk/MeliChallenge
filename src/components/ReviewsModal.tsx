import React, { useState, useEffect } from 'react';
import { X, Star, User } from 'lucide-react';
import { api } from '../services/api';

interface Comment {
  id: number;
  user?: string;
  username?: string;
  rating: number;
  comment: string;
  date: string;
  title?: string;
}

interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: { [key: number]: number };
}

interface ReviewsData {
  comments: Comment[];
  summary: ReviewSummary;
}

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  productTitle: string;
}

export const ReviewsModal: React.FC<ReviewsModalProps> = ({
  isOpen,
  onClose,
  productId,
  productTitle
}) => {
  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && productId) {
      fetchReviews();
    }
  }, [isOpen, productId]);

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getProductComments(productId);
      setReviewsData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'text-blue-500 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Opiniones del producto</h2>
            <p className="text-gray-600 mt-1 truncate">{productTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
              <button
                onClick={fetchReviews}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Reintentar
              </button>
            </div>
          )}

          {reviewsData && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Todas las opiniones ({reviewsData.comments.length})
              </h3>
              
              {reviewsData.comments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No hay opiniones disponibles para este producto.
                </div>
              ) : (
                <div className="space-y-4">
                  {reviewsData.comments.map((comment) => (
                    <div key={comment.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{comment.user || comment.username}</p>
                            <p className="text-sm text-gray-500">{formatDate(comment.date)}</p>
                          </div>
                        </div>
                        {renderStars(comment.rating)}
                      </div>
                      <p className="text-gray-700 leading-relaxed">{comment.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsModal; 