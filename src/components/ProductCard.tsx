import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router';
import type { Product } from '../services/products';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="group bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-300 flex flex-col h-full"
    >
      <Link to={`/product/${product.id}`} className="flex flex-col h-full">
        <div className="aspect-[4/3] bg-neutral-100 dark:bg-neutral-950 relative overflow-hidden flex items-center justify-center p-6">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-xl"
            loading="lazy"
          />
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className="bg-white/90 dark:bg-black/90 backdrop-blur text-xs font-semibold px-2 py-1 rounded-md text-neutral-900 dark:text-neutral-200 border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm w-fit">
              Grade {product.condition}
            </span>
            {product.batteryHealth >= 90 && (
               <span className="bg-green-500/90 dark:bg-green-500/80 backdrop-blur text-xs font-semibold px-2 py-1 rounded-md text-white shadow-sm w-fit">
                 BH {product.batteryHealth}%
              </span>
            )}
          </div>
        </div>
        
        <div className="p-5 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg text-neutral-900 dark:text-white line-clamp-1">{product.name}</h3>
          </div>
          
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
            {product.storage} &bull; Débloqué
          </p>

          <div className="mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <span className="font-semibold text-lg text-neutral-900 dark:text-white">
              {product.price.toLocaleString()} FCFA
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem(product);
              }}
              className="bg-neutral-900 hover:bg-primary-blue dark:bg-white dark:hover:bg-primary-blue text-white dark:text-neutral-900 dark:hover:text-white text-sm font-medium px-4 py-2 rounded-full transition-colors duration-200 shadow-sm flex items-center gap-2"
            >
              <ShoppingCart size={16} /> <span className="hidden sm:inline">Ajouter</span>
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
