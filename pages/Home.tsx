import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Shield, TrendingUp } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          VeriScan Product Authenticity System
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Detect counterfeit products with advanced AI technology
        </p>
        <button
          onClick={() => navigate('/scan')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition"
        >
          Start Scanning
        </button>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Zap className="w-12 h-12 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Fast Detection</h3>
          <p className="text-gray-600">Real-time scanning using advanced AI algorithms</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Shield className="w-12 h-12 text-green-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Secure & Reliable</h3>
          <p className="text-gray-600">Enterprise-grade security for your peace of mind</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <TrendingUp className="w-12 h-12 text-purple-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Analytics</h3>
          <p className="text-gray-600">Track trends and get detailed scanning reports</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
