import React from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { useProducts, staticProducts } from '../services/products';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, ArrowLeft, ShieldCheck, Battery, Zap } from 'lucide-react';

export default function ProductPage() {
  const { id } = useParams();
  const { products, loading } = useProducts();
  const { addItem } = useCart();
  
  const displayProducts = products.length > 0 ? products : staticProducts;
  const product = displayProducts.find(p => p.id === id);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center dark:bg-black">
        <div className="w-8 h-8 border-4 border-primary-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center dark:bg-black text-center">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">Product Not Found</h2>
        <Link to="/store" className="text-primary-blue hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black pt-24 pb-24 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-6xl mx-auto">
        <Link to="/store" className="inline-flex items-center gap-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors mb-8 font-medium">
          <ArrowLeft size={16} /> Back to Store
        </Link>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="w-full md:w-1/2 p-8 md:p-12 border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-800 flex items-center justify-center bg-neutral-100 flex-shrink-0 dark:bg-neutral-950 relative">
               <motion.img 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 src={product.imageUrl} 
                 alt={product.name} 
                 className="w-full max-w-sm h-auto object-contain drop-shadow-2xl"
               />
               <div className="absolute top-6 left-6 flex flex-col gap-2">
                 <span className="bg-white/90 dark:bg-black/90 backdrop-blur text-xs font-semibold px-3 py-1.5 rounded-lg text-neutral-900 dark:text-neutral-200 border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm w-fit">
                   Grade {product.condition}
                 </span>
                 {product.batteryHealth >= 90 && (
                    <span className="bg-green-500/90 dark:bg-green-500/80 backdrop-blur text-xs font-semibold px-3 py-1.5 rounded-lg text-white shadow-sm w-fit flex items-center gap-1.5">
                      <Battery size={14} /> BH {product.batteryHealth}%
                   </span>
                 )}
               </div>
            </div>

            {/* Details Section */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
                    {product.name}
                  </h1>
                  <p className="text-xl text-neutral-500 dark:text-neutral-400 capitalize">
                    {product.storage} &bull; {product.category}
                  </p>
                </div>

                <div className="py-6 border-y border-neutral-100 dark:border-neutral-800">
                  <span className="text-4xl font-bold text-neutral-900 dark:text-white">
                    {product.price.toLocaleString()} <span className="text-2xl text-neutral-500">FCFA</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-primary-blue">
                       <ShieldCheck size={20} />
                     </div>
                     <div>
                       <p className="text-sm font-medium text-neutral-900 dark:text-white">Original parts</p>
                       <p className="text-xs text-neutral-500 dark:text-neutral-400">Verified by experts</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-500">
                       <Battery size={20} />
                     </div>
                     <div>
                       <p className="text-sm font-medium text-neutral-900 dark:text-white">Guaranteed Battery</p>
                       <p className="text-xs text-neutral-500 dark:text-neutral-400">{product.batteryHealth}% max capacity</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-500">
                       <Zap size={20} />
                     </div>
                     <div>
                       <p className="text-sm font-medium text-neutral-900 dark:text-white">Ready to connect</p>
                       <p className="text-xs text-neutral-500 dark:text-neutral-400">Unlocked & Restored</p>
                     </div>
                   </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => addItem(product)}
                    className="w-full bg-primary-blue hover:bg-primary-blue-hover text-white py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-primary-blue/25"
                  >
                    <ShoppingCart size={20} /> Add to Cart
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
