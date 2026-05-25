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
    <div className="w-full bg-ivory dark:bg-neutral-900 min-h-screen pt-32 pb-32 px-6 lg:px-12 transition-colors">
      <div className="max-w-[1400px] mx-auto space-y-16">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <span className="font-sans text-xs tracking-widest uppercase text-neutral-400 mb-6 block">Notre Collection</span>
          <h1 className="font-serif text-5xl md:text-7xl text-neutral-900 dark:text-white mb-6">
            L'excellence à portée de main.
          </h1>
        </motion.div>
        
        {/* Cinematic Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12 border-b border-black/5 dark:border-white/5">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-6 md:gap-10">
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
                className={`relative font-sans text-sm tracking-wide transition-colors ${
                  activeTab === tab.id 
                    ? 'text-black dark:text-white font-medium' 
                    : 'text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTabStore"
                    className="absolute -bottom-2 left-0 right-0 h-px bg-black dark:bg-white"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-4 py-2 bg-transparent border-none outline-none font-sans text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:ring-0 w-32 focus:w-48 transition-all duration-500"
              />
            </div>
            
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="pl-2 pr-8 py-2 bg-transparent border-none outline-none font-sans text-sm text-neutral-500 cursor-pointer appearance-none hover:text-black dark:hover:text-white transition-colors"
              >
                <option value="newest">Plus récent</option>
                <option value="price_asc">Prix (Croissant)</option>
                <option value="price_desc">Prix (Décroissant)</option>
              </select>
              <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-neutral-400">
                <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
             <div className="w-8 h-8 border border-neutral-300 dark:border-neutral-700 border-t-black dark:border-t-white rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Product Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-32">
                <p className="font-serif text-2xl text-neutral-400">Aucune pièce ne correspond à votre recherche.</p>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
