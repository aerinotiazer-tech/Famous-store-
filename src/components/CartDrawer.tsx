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
            className="fixed inset-0 bg-[#000000]/40 backdrop-blur-md z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 w-full md:w-[440px] bg-white dark:bg-[#1d1d1f] shadow-2xl z-[100] flex flex-col sm:border-l border-transparent dark:border-white/5"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-8 border-b border-[#e5e5ea] dark:border-[#333336]">
              <h2 className="font-sans text-3xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] flex items-center gap-3">
                Panier
              </h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-[#f5f5f7] dark:bg-black/50 flex items-center justify-center text-[#1d1d1f] dark:text-white hover:bg-[#e5e5ea] dark:hover:bg-black transition-colors"
                aria-label="Fermer le panier"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-6 text-[#86868b]">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="font-sans text-xs tracking-widest uppercase font-bold">Votre panier est vide</p>
                  <button 
                    onClick={onClose}
                    className="font-sans text-sm border-b border-[#1d1d1f] dark:border-white text-[#1d1d1f] dark:text-white pb-1 font-medium hover:text-[#0066cc] hover:border-[#0066cc] dark:hover:text-[#2997ff] dark:hover:border-[#2997ff] transition-colors"
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
                        <div className="h-28 w-28 rounded-2xl bg-[#f5f5f7] dark:bg-black p-4 flex-shrink-0 relative overflow-hidden flex items-center justify-center">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name}
                            className="w-[80%] h-[80%] object-contain drop-shadow-md select-none"
                          />
                        </div>
                        <div className="flex flex-col flex-1 py-1 justify-between">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h3 className="font-sans text-lg font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] leading-tight mb-1">{item.name}</h3>
                              <p className="font-sans text-[10px] uppercase font-bold tracking-widest text-[#86868b]">
                                {item.storage} • {item.condition === 'Neuf' ? 'Neuf' : `Grade ${item.condition}`}
                              </p>
                            </div>
                            <button 
                              onClick={() => removeItem(item.id)} 
                              className="text-[#86868b] hover:text-[#ff3b30] transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                            >
                              <X size={16} strokeWidth={2} />
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-4 bg-[#f5f5f7] dark:bg-[#333336] rounded-full px-4 py-1.5">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
                              >
                                <Minus size={14} strokeWidth={2} />
                              </button>
                              <span className="font-sans text-sm font-medium w-4 text-center text-[#1d1d1f] dark:text-[#f5f5f7]">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
                              >
                                <Plus size={14} strokeWidth={2} />
                              </button>
                            </div>
                            <span className="font-sans text-base font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
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
              <div className="p-8 bg-white/80 dark:bg-[#1d1d1f]/80 backdrop-blur-2xl border-t border-[#e5e5ea] dark:border-[#333336]">
                <div className="flex justify-between items-end mb-6">
                  <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-[#86868b]">Total estimé</span>
                  <span className="font-sans text-3xl font-medium tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
                    {totalPrice.toLocaleString()} FCFA
                  </span>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#0066cc] dark:bg-[#2997ff] hover:bg-[#0071e3] disabled:opacity-50 text-white font-sans font-medium py-4 rounded-full shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                >
                  Commander via WhatsApp
                </button>
                <p className="text-center font-sans text-xs text-[#86868b] mt-4">
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
