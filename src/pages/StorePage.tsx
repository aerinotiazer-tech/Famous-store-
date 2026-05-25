import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search } from 'lucide-react';
import { useProducts } from '../services/products';
import ProductCard from '../components/ProductCard';

type CategoryType = 'featured' | 'iphone' | 'android' | 'accessory';

export default function StorePage() {
  const { products, loading } = useProducts();
  const displayProducts = products;
  
  const [activeTab, setActiveTab] = useState<CategoryType>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'newest' | 'price_asc' | 'price_desc'>('newest');

  const filteredProducts = useMemo(() => {
    let result = displayProducts;
    
    if (activeTab !== 'featured') {
      result = result.filter(p => p.category === activeTab);
    } else {
      // If 'featured', maybe check for a featured flag or just show top items.
      // Since we don't have a featured flag explicitly in all data yet, we can filter condition A+ or just return all for demo.
      // Let's filter by the category "featured" if it exists, or simulated for demo.
      result = result.filter(p => p.category === 'featured' || p.condition === 'A+');
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
    // "newest" defaults to the original array order which is already sorted
    
    return result;
  }, [displayProducts, activeTab, searchQuery, sortOption]);

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
              Inventaire de la Boutique
            </h1>
            <p className="text-lg text-neutral-500 dark:text-neutral-400">
              Parcourez notre sélection actuelle d'appareils vérifiés et d'accessoires. Sécurisez votre commande via WhatsApp.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
            {/* Tabs */}
            <div className="flex items-center gap-2 bg-white dark:bg-neutral-900 p-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 w-fit overflow-x-auto whitespace-nowrap">
              <button 
                onClick={() => setActiveTab('featured')}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'featured' ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
              >
                Populaire
              </button>
              <button 
                onClick={() => setActiveTab('iphone')}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'iphone' ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
              >
                iPhone
              </button>
              <button 
                onClick={() => setActiveTab('android')}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'android' ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
              >
                Android
              </button>
              <button 
                onClick={() => setActiveTab('accessory')}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'accessory' ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
              >
                Accessoires
              </button>
            </div>

            {/* Search & Sort */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              {/* Sort */}
              <div className="relative w-full sm:w-auto">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as any)}
                  className="block w-full sm:w-auto pl-4 pr-10 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors appearance-none cursor-pointer"
                >
                  <option value="newest">Plus récent</option>
                  <option value="price_asc">Prix (Croissant)</option>
                  <option value="price_desc">Prix (Décroissant)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
              
              {/* Search */}
              <div className="relative w-full sm:w-64 lg:w-72">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-neutral-400" />
                </div>
                <input
                  type="text"
                  placeholder="Rechercher des produits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
                />
              </div>
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
                <p className="text-neutral-500 dark:text-neutral-400">Aucun produit disponible dans cette catégorie.</p>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
