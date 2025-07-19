import { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { Header } from './components/Header';
import { Breadcrumb } from './components/Breadcrumb';
import { ProductDetail } from './components/ProductDetail';
import { NotFoundProduct } from './components/NotFoundProduct';
import { mockProduct } from './data/mockProduct';
import { apiService } from './services/api';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(mockProduct);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      try {
        const apiData = await apiService.getItem(Number(id));
        
        // Map API data to product structure
        const mappedProduct = {
          ...mockProduct,
          ...apiData // Use all fields from backend, including images, attributes, variants, etc.
        };
        
        setProduct(mappedProduct);
      } catch (err) {
        setError('Failed to load product data');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return <NotFoundProduct />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Breadcrumb categories={product.categories} />
        <div className="mt-6">
          <ProductDetail product={product} />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/:id" element={<ProductPage />} />
      <Route path="/" element={<ProductPage />} />
    </Routes>
  );
}

export default App; 