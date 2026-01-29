import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Scanner from '../components/Scanner.tsx';

const Scan: React.FC = () => {
  const navigate = useNavigate();
  const scannerRef = useRef<HTMLDivElement>(null);

  const handleScanSuccess = (result: string) => {
    // Navigate to result page with the scanned product ID
    navigate('/result', { state: { productId: result } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Scan Product Code
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <Scanner onScanSuccess={handleScanSuccess} />
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">How to use:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Point your camera at the product QR code</li>
              <li>• Keep the code within the frame</li>
              <li>• Wait for automatic detection</li>
              <li>• View detailed results instantly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scan;
