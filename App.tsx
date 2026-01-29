import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Home from './pages/Home.tsx';
import Scan from './pages/Scan.tsx';
import Result from './pages/Result.tsx';
import Login from './pages/Login.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import AdminProducts from './pages/AdminProducts.tsx';
import AdminLogs from './pages/AdminLogs.tsx';
import { mockDb } from './services/mockDb.ts';
import { UserRole } from './types.ts';

// Protected Route Component
const ProtectedRoute = ({ role }: { role?: UserRole }) => {
    const user = mockDb.getCurrentUser();
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    
    if (role && user.role !== role) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/result" element={<Result />} />
            <Route path="/login" element={<Login />} />
            
            {/* Admin Routes */}
            <Route element={<ProtectedRoute role={UserRole.ADMIN} />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/logs" element={<AdminLogs />} />
            </Route>
          </Routes>
        </main>
        
        <footer className="bg-white border-t mt-auto py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-gray-400 text-sm">
                    © {new Date().getFullYear()} VeriScan System. All rights reserved.
                </p>
            </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;