import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Package, Activity } from 'lucide-react';
import { mockDb } from '../services/mockDb.ts';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const scanLogs = mockDb.getScanLogs();

  const stats = {
    totalScans: scanLogs.length,
    authenticProducts: scanLogs.filter((log: any) => log.authentic).length,
    counterfeits: scanLogs.filter((log: any) => !log.authentic).length,
    authenticity: scanLogs.length > 0 
      ? (scanLogs.filter((log: any) => log.authentic).length / scanLogs.length * 100).toFixed(1)
      : 0
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <BarChart3 className="w-8 h-8 text-blue-600 mb-4" />
            <p className="text-gray-600 text-sm">Total Scans</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalScans}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Package className="w-8 h-8 text-green-600 mb-4" />
            <p className="text-gray-600 text-sm">Authentic</p>
            <p className="text-3xl font-bold text-green-600">{stats.authenticProducts}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Activity className="w-8 h-8 text-red-600 mb-4" />
            <p className="text-gray-600 text-sm">Counterfeits</p>
            <p className="text-3xl font-bold text-red-600">{stats.counterfeits}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <BarChart3 className="w-8 h-8 text-purple-600 mb-4" />
            <p className="text-gray-600 text-sm">Authenticity Rate</p>
            <p className="text-3xl font-bold text-purple-600">{stats.authenticity}%</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => navigate('/admin/products')}
            className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-lg shadow-md transition"
          >
            <h3 className="text-xl font-semibold mb-2">Manage Products</h3>
            <p>Add, edit, or remove products from database</p>
          </button>
          <button
            onClick={() => navigate('/admin/logs')}
            className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-lg shadow-md transition"
          >
            <h3 className="text-xl font-semibold mb-2">Scan Logs</h3>
            <p>View detailed scanning history and reports</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
