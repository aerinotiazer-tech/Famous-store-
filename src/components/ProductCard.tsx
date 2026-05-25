import React, { useState } from 'react';
import { motion } from 'motion/react';
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
    e.stopPropagation();
    addItem(product);
  };

  return (
    <>
      <motion.div 
        onClick={handleCardClick}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="group flex flex-col cursor-pointer isolate"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800 mb-6">
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <img 
              src={product.imageUrl || "https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=800"} 
              alt={product.name}
              className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-20">
            <button
              onClick={handleAddToCart}
              className="w-full bg-white/90 backdrop-blur-md text-black font-sans font-medium px-4 py-4 rounded-xl shadow-xl hover:bg-black hover:text-white transition-colors duration-300"
            >
              Ajouter au panier
            </button>
          </div>
          
          {/* subtle vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 point-events-none" />
        </div>
        
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-start">
            <h3 className="font-serif text-xl text-neutral-900 dark:text-white group-hover:text-luxury-accent transition-colors">
              {product.name}
            </h3>
            <span className="font-sans text-sm font-medium text-neutral-500 mt-1">
              {product.price.toLocaleString('fr-FR')} FCFA
            </span>
          </div>
          
          <div className="flex items-center gap-3 font-sans text-xs uppercase tracking-widest text-neutral-400 mt-2">
            <span>{product.storage || 'Standard'}</span>
            <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            <span>{product.isNew || product.condition === 'Neuf' ? 'Neuf' : `Grade ${product.condition}`}</span>
            {product.batteryHealth && (
               <>
                 <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                 <span>BH {product.batteryHealth}%</span>
               </>
            )}
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
