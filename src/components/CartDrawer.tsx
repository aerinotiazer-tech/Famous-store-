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
    
    let message = "Bonjour ! J'aimerais commander les articles suivants sur Famous Store 72 System:\n\n";
    items.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (${item.storage}, Grade ${item.condition}) - ${(item.price * item.quantity).toLocaleString()} FCFA\n`;
    });
    message += `\n*Total : ${totalPrice.toLocaleString()} FCFA*`;
    
    // Remove '+' and spaces for the URL
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
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-white dark:bg-neutral-950 shadow-2xl z-50 flex flex-col border-l border-neutral-200 dark:border-neutral-800"
          >
            <div className="flex items-center justify-between p-6 border-b border-neutral-100 dark:border-neutral-900">
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                <ShoppingBag size={20} />
                Votre Panier
              </h2>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-neutral-500 dark:text-neutral-400 space-y-4">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p>Votre panier est vide</p>
                  <button 
                    onClick={onClose}
                    className="text-primary-blue font-medium hover:underline"
                  >
                    Continuer vos achats
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="h-24 w-24 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 p-2 flex-shrink-0">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex flex-col flex-1 py-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-neutral-900 dark:text-white line-clamp-1">{item.name}</h3>
                          <button onClick={() => removeItem(item.id)} className="text-neutral-400 hover:text-red-500 transition-colors">
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                          {item.storage} • Grade {item.condition}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-3 border border-neutral-200 dark:border-neutral-800 rounded-lg p-1">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-medium w-4 text-center dark:text-white">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-semibold text-neutral-900 dark:text-white">
                            {(item.price * item.quantity).toLocaleString()} FCFA
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-neutral-100 dark:border-neutral-900 p-6 bg-neutral-50 dark:bg-black/50">
                <div className="flex justify-between text-base font-medium text-neutral-900 dark:text-white mb-4">
                  <p>Sous-total</p>
                  <p>{totalPrice.toLocaleString()} FCFA</p>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                  Le passage en caisse vous redirigera directement vers WhatsApp pour finaliser votre commande.
                </p>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5A] text-white font-medium py-3.5 rounded-xl transition-colors duration-200 shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2"
                >
                  Commander via WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
