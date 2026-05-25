import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../lib/firebase';
import CartDrawer from './CartDrawer';

const navLinks = [
  { name: 'Collection', path: '/store' },
  { name: 'Héritage', path: '/about' },
  { name: 'Assistance', path: '/faq' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();
  const { user } = useAuth();
  
  // Minimal invisible UI scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    setIsUserMenuOpen(false);
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 z-40 w-full transition-all duration-500 ${
          isScrolled 
            ? 'bg-ivory/70 dark:bg-neutral-900/70 backdrop-blur-2xl border-b border-black/5 dark:border-white/5 py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center">
            {/* Logo - Ultra minimal */}
            <Link to="/" className="flex items-center gap-2 group z-50">
              {/* Apple-like minimalist logo representation */}
              <div className="w-5 h-5 rounded-full bg-black dark:bg-white flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-110">
                <div className="w-2 h-2 bg-white dark:bg-black rounded-full transform translate-x-[2px] -translate-y-[2px]" />
              </div>
              <span className={`font-sans tracking-widest font-medium text-xs uppercase uppercase transition-colors duration-300 ${isScrolled || location.pathname !== '/' ? 'text-neutral-900 dark:text-white' : 'text-neutral-900 dark:text-white'}`}>
                Famous Store
              </span>
            </Link>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 space-x-12">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[13px] tracking-wide font-sans transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'text-black dark:text-white font-medium'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-6 z-50">
              <ThemeToggle />
              
              {user && (
                <div className="relative">
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
                  >
                    <User size={18} strokeWidth={1.5} />
                  </button>
                  
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-4 w-60 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden z-50 p-2"
                        >
                          <div className="px-4 py-3 border-b border-black/5 dark:border-white/5">
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-1">Compte</p>
                            <p className="text-sm font-medium text-black dark:text-white truncate">{user.email}</p>
                          </div>
                          <div className="p-1 mt-1">
                            <button 
                              onClick={handleLogout}
                              className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors"
                            >
                              Se déconnecter
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              )}

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors flex items-center gap-2"
                aria-label="Open Cart"
              >
                <div className="relative">
                  <ShoppingBag size={18} strokeWidth={1.5} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-luxury-accent text-white text-[9px] font-medium flex items-center justify-center rounded-full">
                      {totalItems}
                    </span>
                  )}
                </div>
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-5 md:hidden z-50">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-neutral-900 dark:text-white"
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-luxury-accent text-white text-[9px] font-medium flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-neutral-900 dark:text-white"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Fullscreen Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: '100vh' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 w-full bg-white dark:bg-black flex flex-col justify-center px-8 z-40 overflow-hidden"
            >
              <div className="absolute top-6 right-8">
                {/* Redundant close button for accessibility */}
              </div>
              <div className="flex flex-col space-y-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-4xl font-serif text-black dark:text-white hover:text-luxury-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-16 pt-8 border-t border-black/10 dark:border-white/10 flex flex-col gap-6">
                <ThemeToggle />
                {user && (
                  <div className="flex flex-col gap-4">
                    <p className="text-sm font-sans tracking-widest text-neutral-500 uppercase">{user.email}</p>
                    <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="text-left text-red-500 font-sans tracking-wide">
                      Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
