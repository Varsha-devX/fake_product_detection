import React, { useState } from 'react';
import { mockDb } from '../services/mockDb.ts';
import { Plus, Trash2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  manufacturer: string;
  sku: string;
}

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockDb.getProducts());
  const [newProduct, setNewProduct] = useState({ name: '', manufacturer: '', sku: '' });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name && newProduct.manufacturer && newProduct.sku) {
      const product: Product = {
        id: Math.random().toString(36).substr(2, 9),
        ...newProduct
      };
      setProducts([...products, product]);
      mockDb.addProduct(product);
      setNewProduct({ name: '', manufacturer: '', sku: '' });
    }
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    mockDb.deleteProduct(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Products</h1>

        {/* Add Product Form */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6">Add New Product</h2>
          <form onSubmit={handleAddProduct} className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Manufacturer"
              value={newProduct.manufacturer}
              onChange={(e) => setNewProduct({ ...newProduct, manufacturer: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="SKU"
              value={newProduct.sku}
              onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" /> Add
            </button>
          </form>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-900">ID</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-900">Name</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-900">Manufacturer</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-900">SKU</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-600">{product.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{product.manufacturer}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{product.sku}</td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-800 flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
