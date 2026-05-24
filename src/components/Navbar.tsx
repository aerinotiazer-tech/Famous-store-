import { Link, useLocation } from 'react-router';
import { motion } from 'motion/react';
import { Smartphone, Menu, X, ShieldUser, ShoppingBag, User } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../lib/firebase';
import CartDrawer from './CartDrawer';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Store', path: '/store' },
  { name: 'About', path: '/about' },
  { name: 'FAQ', path: '/faq' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();
  const { user } = useAuth();

  const handleLogout = async () => {
    await auth.signOut();
    setIsUserMenuOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-40 w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary-blue p-1.5 rounded-lg text-white group-hover:scale-105 transition-transform duration-200">
                <Smartphone size={20} />
              </div>
              <span className="font-semibold text-lg tracking-tight text-neutral-900 dark:text-white">
                Famous Store <span className="text-primary-blue">72</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-neutral-900 dark:hover:text-white ${
                    location.pathname === link.path
                      ? 'text-neutral-900 dark:text-white'
                      : 'text-neutral-500 dark:text-neutral-400'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              
              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="p-2 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                  >
                    <User size={20} />
                  </button>
                  
                  {isUserMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)}></div>
                      <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden z-50">
                        <div className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-800">
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">Signed in as</p>
                          <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">{user.email}</p>
                        </div>
                        <div className="p-1">
                          <Link 
                            to="/admin" 
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                          >
                            <ShieldUser size={16} /> Admin System
                          </Link>
                          <button 
                            onClick={handleLogout}
                            className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            Sign out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link to="/login" className="p-2 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors">
                  <User size={20} />
                </Link>
              )}

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                aria-label="Open Cart"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-primary-blue text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-3 md:hidden">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-neutral-600 dark:text-neutral-400"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-primary-blue text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white p-1"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white dark:bg-black border-b border-neutral-200 dark:border-neutral-800 px-4 pt-2 pb-6 space-y-4 shadow-xl block"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-base font-medium transition-colors py-2 ${
                  location.pathname === link.path
                    ? 'text-neutral-900 dark:text-white'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
              {user ? (
                <>
                  <div className="px-2 py-3 mb-2 bg-neutral-50 dark:bg-neutral-900/50 rounded-xl">
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 px-1">Signed in as</p>
                    <p className="text-sm font-medium text-neutral-900 dark:text-white truncate px-1">{user.email}</p>
                  </div>
                  <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-700 dark:text-neutral-300 flex items-center gap-2 py-2 hover:text-primary-blue">
                    <ShieldUser size={18} /> <span className="font-medium">Admin System</span>
                  </Link>
                  <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="w-full text-left text-red-600 dark:text-red-400 flex items-center gap-2 py-2">
                    <User size={18} /> <span className="font-medium">Sign Out</span>
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-700 dark:text-neutral-300 flex items-center gap-2 py-2 hover:text-primary-blue">
                  <User size={18} /> <span className="font-medium">Sign In</span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </nav>
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
