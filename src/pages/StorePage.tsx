import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search } from 'lucide-react';
import { useProducts, staticProducts } from '../services/products';
import ProductCard from '../components/ProductCard';

export default function StorePage() {
  const { products, loading } = useProducts();
  const displayProducts = products.length > 0 ? products : staticProducts;
  
  const [activeTab, setActiveTab] = useState<'all' | 'iphone' | 'accessory'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    let result = displayProducts;
    
    if (activeTab !== 'all') {
      result = result.filter(p => p.category === activeTab);
    }
    
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q));
    }
    
    return result;
  }, [displayProducts, activeTab, searchQuery]);

  return (
    <div className="w-full bg-neutral-50 dark:bg-black min-h-screen pt-12 pb-24 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 max-w-4xl"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">
              Store Inventory
            </h1>
            <p className="text-lg text-neutral-500 dark:text-neutral-400">
              Browse our current selection of verified Apple devices and essential accessories. Secure your order via WhatsApp.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
            {/* Tabs */}
            <div className="flex items-center gap-2 bg-white dark:bg-neutral-900 p-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 w-fit">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'all' ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
              >
                All Models
              </button>
              <button 
                onClick={() => setActiveTab('iphone')}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'iphone' ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
              >
                iPhone
              </button>
              <button 
                onClick={() => setActiveTab('accessory')}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'accessory' ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
              >
                Accessories
              </button>
            </div>

            {/* Search */}
            <div className="relative max-w-sm w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-neutral-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
              />
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
             <div className="w-8 h-8 border-4 border-primary-blue border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Product Grid */}
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-24 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800">
                <p className="text-neutral-500 dark:text-neutral-400">No products available in this category.</p>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
