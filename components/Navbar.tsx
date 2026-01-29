import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import { mockDb } from '../services/mockDb.ts';
import { User, UserRole } from '../types.ts';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Poll for user changes (simple state sync for this demo)
    const checkUser = () => {
      setUser(mockDb.getCurrentUser());
    };
    checkUser();
    const interval = setInterval(checkUser, 1000); // Poll purely for simple demo sync across tabs/pages
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    await mockDb.logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Scan Now', path: '/scan' },
  ];

  if (user?.role === UserRole.ADMIN) {
    navLinks.push({ name: 'Dashboard', path: '/admin' });
    navLinks.push({ name: 'Products', path: '/admin/products' });
    navLinks.push({ name: 'Scan Logs', path: '/admin/logs' });
  }

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-brand-600" />
              <span className="font-bold text-xl text-gray-900 tracking-tight">VeriScan</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center sm:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path 
                    ? 'text-brand-600 bg-brand-50' 
                    : 'text-gray-600 hover:text-brand-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <div className="flex items-center gap-4 ml-4">
                <span className="text-xs font-semibold px-2 py-1 bg-gray-100 rounded-full text-gray-600 flex items-center gap-1">
                  <UserIcon size={12}/> {user.username}
                </span>
                <button onClick={handleLogout} className="text-gray-500 hover:text-red-600">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 shadow-sm"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden bg-white border-t">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 text-base font-medium ${
                  location.pathname === link.path
                    ? 'text-brand-600 bg-brand-50 border-l-4 border-brand-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
               <button
               onClick={handleLogout}
               className="w-full text-left block px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50"
             >
               Logout ({user.username})
             </button>
            ) : (
              <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-brand-600 hover:bg-brand-50"
            >
              Login
            </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;