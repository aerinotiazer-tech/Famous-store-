import React, { useState } from 'react';
import { motion } from 'motion/react';
import type { Product } from '../services/products';
import { useCart } from '../contexts/CartContext';
import ProductDetailModal from './ProductDetailModal';
import { ChevronRight } from 'lucide-react';

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
    e.stopPropagation();
    addItem(product);
  };

  return (
    <>
      <motion.div 
        onClick={handleCardClick}
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="group flex flex-col cursor-pointer isolate w-full"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-[#f5f5f7] dark:bg-[#1d1d1f] mb-6 flex items-center justify-center p-8 transition-colors">
          <motion.div
            className="w-full h-full relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <img 
              src={product.imageUrl || "https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=800"} 
              alt={product.name}
              className="w-full h-full object-contain filter drop-shadow-xl select-none"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-20 flex justify-center">
            <button
              onClick={handleAddToCart}
              className="bg-black/80 dark:bg-white/90 backdrop-blur-md text-white dark:text-black font-sans text-sm font-medium px-6 py-3 rounded-full hover:scale-105 transition-transform duration-300 shadow-xl"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
        
        <div className="flex flex-col items-center text-center px-2">
          {product.isNew || product.condition === 'Neuf' ? (
            <span className="font-sans text-[10px] font-bold tracking-widest text-[#0066cc] dark:text-[#2997ff] uppercase mb-2">
              Nouveau
            </span>
          ) : (
            <span className="font-sans text-[10px] font-bold tracking-widest text-[#bf4800] dark:text-[#ff6b00] uppercase mb-2">
              Reconditionné Grade {product.condition}
            </span>
          )}
          
          <h3 className="font-sans text-xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-1">
            {product.name}
          </h3>
          
          <p className="font-sans text-sm text-[#86868b] dark:text-[#86868b] mb-3 max-w-[250px] truncate">
            {product.storage ? `${product.storage} · ` : ''} {product.batteryHealth ? `Batterie ${product.batteryHealth}%` : "Vérifié 45 pts"}
          </p>
          
          <span className="font-sans text-base font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">
            {product.price.toLocaleString('fr-FR')} FCFA
          </span>
          
          <div className="mt-4 flex items-center justify-center text-[#0066cc] dark:text-[#2997ff] font-sans text-xs font-medium group-hover:underline">
            Découvrir <ChevronRight size={14} className="ml-1" />
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
