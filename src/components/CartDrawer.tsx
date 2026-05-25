import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useSettings } from '../services/settings';

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart();
  const { settings } = useSettings();

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    let message = "Bonjour ! J'aimerais commander les articles suivants :\n\n";
    items.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (${item.storage}, Grade ${item.condition}) - ${(item.price * item.quantity).toLocaleString()} FCFA\n`;
    });
    message += `\n*Total : ${totalPrice.toLocaleString()} FCFA*`;
    
    const cleanNumber = (settings.whatsappNumber || '+22799368634').replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    clearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-900/20 backdrop-blur-md z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 w-full md:w-[440px] bg-ivory dark:bg-neutral-900 shadow-2xl z-[100] flex flex-col border-l border-white/20 dark:border-white/5"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-8">
              <h2 className="font-serif text-2xl text-black dark:text-white flex items-center gap-3">
                Panier
              </h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                aria-label="Fermer le panier"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-6 opacity-60">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="font-sans text-sm tracking-widest uppercase">Votre panier est vide</p>
                  <button 
                    onClick={onClose}
                    className="font-sans text-sm border-b border-black dark:border-white text-black dark:text-white pb-1"
                  >
                    Continuer vos achats
                  </button>
                </div>
              ) : (
                <div className="space-y-8 pb-8">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div 
                        key={item.id} 
                        layout 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex gap-6 group"
                      >
                        <div className="h-28 w-28 rounded-2xl bg-white dark:bg-black/20 p-4 flex-shrink-0 relative overflow-hidden mix-blend-multiply dark:mix-blend-normal">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name}
                            className="w-full h-full object-contain drop-shadow-xl"
                          />
                        </div>
                        <div className="flex flex-col flex-1 py-1 justify-between">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h3 className="font-serif text-lg text-black dark:text-white leading-tight">{item.name}</h3>
                              <p className="font-sans text-xs uppercase tracking-widest text-neutral-400 mt-2">
                                {item.storage} • {item.condition === 'Neuf' ? 'Neuf' : `Grade ${item.condition}`}
                              </p>
                            </div>
                            <button 
                              onClick={() => removeItem(item.id)} 
                              className="text-neutral-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                            >
                              <X size={16} strokeWidth={1.5} />
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-4 bg-white/50 dark:bg-black/20 rounded-full px-3 py-1">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                              >
                                <Minus size={14} strokeWidth={1.5} />
                              </button>
                              <span className="font-sans text-sm w-4 text-center text-black dark:text-white">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                              >
                                <Plus size={14} strokeWidth={1.5} />
                              </button>
                            </div>
                            <span className="font-sans text-sm font-medium text-black dark:text-white">
                              {(item.price * item.quantity).toLocaleString()} FCFA
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-8 bg-ivory/80 dark:bg-neutral-900/80 backdrop-blur-2xl border-t border-black/5 dark:border-white/5">
                <div className="flex justify-between items-end mb-6">
                  <span className="font-sans text-xs tracking-widest uppercase text-neutral-500">Total estimé</span>
                  <span className="font-sans text-2xl font-light tracking-tight text-black dark:text-white">
                    {totalPrice.toLocaleString()} FCFA
                  </span>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-sans font-medium py-4 rounded-xl shadow-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                >
                  Commander via WhatsApp
                </button>
                <p className="text-center font-sans text-xs text-neutral-400 mt-6">
                  La finalisation de la commande s'effectue sur WhatsApp avec un de nos conseillers.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
