import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search } from 'lucide-react';
import { useProducts } from '../services/products';
import ProductCard from '../components/ProductCard';

type CategoryType = 'all' | 'featured' | 'iphone' | 'android' | 'accessory';

export default function StorePage() {
  const { products, loading } = useProducts();
  const displayProducts = products;
  
  const [activeTab, setActiveTab] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'newest' | 'price_asc' | 'price_desc'>('newest');

  // Read highlight query param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const highlightId = params.get('highlight');
    if (highlightId) {
      // In a real app, you might scroll to this product or open its modal immediately
      console.log("Highlighting product:", highlightId);
    }
  }, []);

  const filteredProducts = useMemo(() => {
    let result = displayProducts;
    
    if (activeTab !== 'all') {
      if (activeTab === 'featured') {
        result = result.filter(p => p.category === 'featured' || p.condition === 'A+');
      } else {
        result = result.filter(p => p.category === activeTab);
      }
    }
    
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q));
    }
    
    if (sortOption === 'price_asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price_desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    }
    
    return result;
  }, [displayProducts, activeTab, searchQuery, sortOption]);

  return (
    <div className="w-full bg-white dark:bg-black min-h-screen pt-32 pb-32 px-6 lg:px-12 transition-colors">
      <div className="max-w-[1400px] mx-auto space-y-16">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl pt-12"
        >
          <span className="font-sans text-[10px] md:text-xs tracking-widest font-bold uppercase text-[#86868b] mb-4 block">Store</span>
          <h1 className="font-sans font-semibold tracking-tight text-5xl md:text-7xl text-[#1d1d1f] dark:text-[#f5f5f7] mb-6">
            L'excellence à portée de main.
          </h1>
        </motion.div>
        
        {/* Cinematic Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 pt-8 sticky top-[60px] z-30 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-[#e5e5ea] dark:border-[#333336]">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'Tout Parcourir' },
              { id: 'featured', label: 'Sélection' },
              { id: 'iphone', label: 'iPhone' },
              { id: 'android', label: 'Android' },
              { id: 'accessory', label: 'Accessoires' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as CategoryType)}
                className={`relative font-sans text-sm font-medium px-4 py-2 rounded-full transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-[#1d1d1f] dark:bg-[#f5f5f7] text-white dark:text-black' 
                    : 'text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-[#f5f5f7] dark:hover:bg-[#1d1d1f]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b] group-focus-within:text-[#1d1d1f] dark:group-focus-within:text-white transition-colors" strokeWidth={2} />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-full bg-[#f5f5f7] dark:bg-[#1d1d1f] border-none outline-none font-sans text-sm text-[#1d1d1f] dark:text-white placeholder:text-[#86868b] focus:ring-2 focus:ring-[#0066cc] w-40 focus:w-56 transition-all duration-300"
              />
            </div>
            
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="pl-4 pr-8 py-2 rounded-full bg-[#f5f5f7] dark:bg-[#1d1d1f] border-none outline-none font-sans text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] cursor-pointer appearance-none hover:bg-[#e5e5ea] dark:hover:bg-[#333336] transition-colors"
              >
                <option value="newest">Plus récent</option>
                <option value="price_asc">Prix (Croissant)</option>
                <option value="price_desc">Prix (Décroissant)</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#86868b]">
                <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
             <div className="w-8 h-8 border-[3px] border-[#e5e5ea] dark:border-[#333336] border-t-[#0066cc] dark:border-t-[#2997ff] rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="pt-8">
            {/* Product Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 border-t border-transparent">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.5), ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-32">
                <p className="font-sans text-2xl font-semibold text-[#86868b]">Aucune pièce ne correspond à votre recherche.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
