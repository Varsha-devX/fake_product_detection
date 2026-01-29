import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { mockDb } from '../services/mockDb.ts';

interface ProductResult {
  id: string;
  name: string;
  manufacturer: string;
  authentic: boolean;
  confidence: number;
  timestamp: Date;
  details: string;
}

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState<ProductResult | null>(null);

  useEffect(() => {
    const productId = location.state?.productId || '';
    if (productId) {
      // Simulate API call to check product authenticity
      const mockResult: ProductResult = {
        id: productId,
        name: 'Premium Product',
        manufacturer: 'Verified Inc.',
        authentic: Math.random() > 0.3, // 70% authentic
        confidence: Math.random() * 30 + 70, // 70-100%
        timestamp: new Date(),
        details: 'Product verified in our database'
      };
      
      mockDb.addScanLog(mockResult);
      setResult(mockResult);
    }
  }, [location.state]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading result...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className={`bg-white rounded-lg shadow-lg p-8 ${result.authentic ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'}`}>
          
          {/* Status Header */}
          <div className="flex items-center justify-center mb-8">
            {result.authentic ? (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-green-600">Authentic Product</h1>
              </div>
            ) : (
              <div className="text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-red-600">Counterfeit Detected</h1>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-4 mb-8">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-gray-600 text-sm">Product ID</p>
                <p className="text-gray-900 font-semibold">{result.id}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-gray-600 text-sm">Product Name</p>
                <p className="text-gray-900 font-semibold">{result.name}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-gray-600 text-sm">Manufacturer</p>
                <p className="text-gray-900 font-semibold">{result.manufacturer}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-gray-600 text-sm">Confidence Level</p>
                <p className="text-gray-900 font-semibold">{result.confidence.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-8">
            <p className="text-blue-900">{result.details}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/scan')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              Scan Another
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-2 px-6 rounded-lg transition"
            >
              Back Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
