import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import type { Product } from '../services/products';
import { useCart } from '../contexts/CartContext';
import ProductDetailModal from './ProductDetailModal';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering details modal
    addItem(product);
  };

  return (
    <>
      <motion.div 
        whileHover={{ y: -6, scale: 1.01 }}
        onClick={handleCardClick}
        className="group bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800/80 overflow-hidden shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-300 flex flex-col h-full cursor-pointer relative"
      >
        <div className="aspect-[4/3] bg-neutral-100 dark:bg-neutral-950 relative overflow-hidden flex items-center justify-center p-6 select-none">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-xl z-10"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          
          {/* Subtle Hover Overlay indicator */}
          <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/5 dark:group-hover:bg-white/5 transition-all duration-300 flex items-center justify-center z-15">
            <span className="opacity-0 group-hover:opacity-100 bg-white/90 dark:bg-neutral-900/90 backdrop-blur text-xs font-bold px-3.5 py-2 rounded-full text-neutral-900 dark:text-neutral-100 shadow-md flex items-center gap-1.5 transition-all transform translate-y-2 group-hover:translate-y-0">
              <Eye size={13} /> Voir Détails
            </span>
          </div>

          <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
            {product.category === 'featured' && (
               <span className="bg-amber-500/95 backdrop-blur-md text-xs font-semibold px-2.5 py-1 rounded-md text-white shadow-sm w-fit flex items-center gap-1">
                 <Star size={11} fill="white" /> Populaire
               </span>
            )}
            {product.condition && (
              <span className="bg-white/95 dark:bg-black/95 backdrop-blur-md text-xs font-bold px-2.5 py-1 rounded-md text-neutral-900 dark:text-neutral-200 border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm w-fit">
                {product.isNew || product.condition === 'Neuf' ? '✨ Neuf' : `Grade ${product.condition}`}
              </span>
            )}
            {product.batteryHealth && product.batteryHealth >= 90 && (
               <span className="bg-emerald-500/95 dark:bg-emerald-500/85 backdrop-blur-md text-xs font-bold px-2.5 py-1 rounded-md text-white shadow-sm w-fit">
                 BH {product.batteryHealth}%
              </span>
            )}
          </div>
        </div>
        
        <div className="p-5 flex flex-col flex-1 relative z-10 bg-white dark:bg-neutral-900">
          <div className="flex justify-between items-start mb-1.5">
            <h3 className="font-bold text-base sm:text-lg text-neutral-900 dark:text-white line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">{product.name}</h3>
          </div>
          
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mb-3 font-medium">
            {product.storage ? `${product.storage} • ` : ''}Agréé & Débloqué
          </p>

          <div className="mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
            <span className="font-extrabold text-base sm:text-lg text-neutral-900 dark:text-white">
              {product.price.toLocaleString()} FCFA
            </span>
            <button
              onClick={handleAddToCart}
              className="bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-full transition-colors duration-200 shadow-sm flex items-center gap-1.5 active:scale-95"
            >
              <ShoppingCart size={15} /> <span>Ajouter</span>
            </button>
          </div>
        </div>
      </motion.div>

      <ProductDetailModal 
        product={product} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default ProductCard;
