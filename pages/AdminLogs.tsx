import React from 'react';
import { mockDb } from '../services/mockDb.ts';
import { CheckCircle, AlertCircle } from 'lucide-react';

const AdminLogs: React.FC = () => {
  const logs = mockDb.getScanLogs();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Scan Logs</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {logs.length === 0 ? (
            <div className="p-8 text-center text-gray-600">
              <p>No scan logs yet. Start scanning products to see results here.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Product ID</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Confidence</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log: any, index: number) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600">{log.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{log.name}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        {log.authentic ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-green-600 font-semibold">Authentic</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4 text-red-600" />
                            <span className="text-red-600 font-semibold">Counterfeit</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{log.confidence.toFixed(1)}%</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogs;
