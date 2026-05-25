import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Send, Check, Shield, Battery, Layers, Cpu, Compass, Sparkles, AlertCircle, Share2, Award, Zap } from 'lucide-react';
import type { Product } from '../services/products';
import { useCart } from '../contexts/CartContext';

interface ProductDetailModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const cartContext = useCart();
  const [activeTab, setActiveTab] = useState<'specs' | 'condition' | 'guarantees'>('specs');
  const [copied, setCopied] = useState(false);
  const [addedDirectly, setAddedDirectly] = useState(false);

  if (!isOpen) return null;

  // Format dynamic specifications based on model names
  const getSpecs = () => {
    const name = product.name.toLowerCase();
    if (name.includes('iphone')) {
      return {
        processor: name.includes('15') ? 'A17 Pro' : name.includes('14') ? 'A16 Bionic' : 'A15 Bionic',
        screen: name.includes('max') ? '6.7" Super Retina XDR' : '6.1" Super Retina XDR',
        camera: 'Triple capteur 48Mpx Pro',
        network: '5G (eSIM & SIM)',
      };
    } else if (product.category === 'android' || name.includes('samsung') || name.includes('galaxy')) {
      return {
        processor: 'Snapdragon 8 Gen 2',
        screen: '6.8" Dynamic AMOLED 2X',
        camera: 'Quadruple Capteur 200Mpx',
        network: '5G, Wi-Fi 6E',
      };
    }
    return {
      processor: 'Puce intégrée avancée',
      screen: 'Écran Haute Définition',
      camera: 'Objectif optique',
      network: 'Compatibilité mondiale',
    };
  };

  const specs = getSpecs();

  const getConditionDetails = (grade: string) => {
    switch (grade) {
      case 'Neuf': return { title: 'Neuf scellé', desc: "L'appareil est entièrement neuf, jamais déballé et scellé sous blister. Excellence absolue." };
      case 'A+': return { title: 'Comme Neuf', desc: "État esthétique irréprochable. Aucune trace d'usure. Ingénierie préservée à 100%." };
      case 'A': return { title: 'Excellent', desc: "Entretien méticuleux. Écran parfait, infimes traces sur les tranches." };
      default: return { title: 'Très Bon', desc: "Légères traces d'usage, expérience et intégrité structurelle conservées." };
    }
  };

  const conditionInfo = getConditionDetails(product.condition);

  const getWhatsAppLink = () => {
    const isNewLocal = product.isNew || product.condition === 'Neuf';
    const conditionText = isNewLocal ? 'Neuf' : `Grade ${product.condition}`;
    const batteryText = isNewLocal ? '100%' : `${product.batteryHealth}%`;
    const message = `Bonjour,\n\nJe souhaite réserver :\n📱 ${product.name}\n💾 ${product.storage || 'Standard'} / 🔋 ${batteryText}\n⚖️ ${conditionText}\n💰 ${product.price.toLocaleString()} FCFA\n\nL'appareil est-il disponible ?`;
    return `https://wa.me/2250700000000?text=${encodeURIComponent(message)}`;
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/store?highlight=${product.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToCart = () => {
    cartContext.addItem(product);
    setAddedDirectly(true);
    setTimeout(() => setAddedDirectly(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center">
        {/* Modern blur backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#000000]/60 backdrop-blur-2xl"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, y: '100%', scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: '100%', scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-[90vh] md:h-auto md:max-h-[85vh] max-w-5xl mx-4 bg-[#f5f5f7] dark:bg-[#000000] md:rounded-[3rem] rounded-t-[3rem] overflow-hidden flex flex-col md:flex-row shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] md:border border-white/10 isolate"
        >
          {/* Close trigger */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-50 w-10 h-10 bg-[#e5e5ea] dark:bg-[#1d1d1f] hover:bg-[#d1d1d6] dark:hover:bg-[#333336] rounded-full flex items-center justify-center text-[#1d1d1f] dark:text-white transition-colors"
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          {/* Left: Immersive Image Gallery Area */}
          <div className="md:w-1/2 relative bg-white dark:bg-[#1d1d1f] flex flex-col justify-center overflow-hidden min-h-[40vh] md:min-h-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent z-10 point-events-none" />
            <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
              <span className="font-sans text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full bg-[#f5f5f7] dark:bg-black text-[#1d1d1f] dark:text-[#f5f5f7]">
                {product.category}
              </span>
              <button onClick={handleShare} className="w-8 h-8 rounded-full bg-[#f5f5f7] dark:bg-black flex items-center justify-center text-[#1d1d1f] dark:text-[#f5f5f7] hover:opacity-80 transition-opacity">
                {copied ? <Check size={14} /> : <Share2 size={14} />}
              </button>
            </div>

            <motion.div 
               initial={{ scale: 1.05, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
               className="w-full h-full flex items-center justify-center p-12 md:p-24 z-10"
            >
              <img 
                src={product.imageUrl || "https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=800"} 
                alt={product.name} 
                className="w-full h-full object-contain filter drop-shadow-2xl select-none" 
              />
            </motion.div>
          </div>

          {/* Right: Premium Editorial Information */}
          <div className="md:w-1/2 flex flex-col bg-[#f5f5f7] dark:bg-[#000000] relative">
            <div className="flex-1 overflow-y-auto px-8 md:px-16 pt-12 md:pt-16 pb-32">
              <span className="font-sans text-[10px] tracking-widest font-bold uppercase text-[#bf4800] dark:text-[#ff6b00] mb-3 block">
                {product.condition === 'Neuf' || product.isNew ? 'Nouveau' : `Reconditionné Grade ${product.condition}`}
              </span>
              <h1 className="font-sans font-semibold tracking-tight text-4xl md:text-5xl text-[#1d1d1f] dark:text-[#f5f5f7] mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-10">
                <span className="font-sans text-2xl font-medium tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
                  {product.price.toLocaleString('fr-FR')} FCFA
                </span>
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-[#1d1d1f] dark:bg-[#f5f5f7] text-white dark:text-black rounded-full">
                  En Stock
                </span>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="bg-white dark:bg-[#1d1d1f] rounded-2xl p-5 border border-transparent dark:border-white/5">
                  <span className="block font-sans text-[10px] font-bold uppercase tracking-widest text-[#86868b] mb-1">Capacité</span>
                  <span className="font-sans text-lg font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">{product.storage || 'Standard'}</span>
                </div>
                <div className="bg-white dark:bg-[#1d1d1f] rounded-2xl p-5 border border-transparent dark:border-white/5">
                  <span className="block font-sans text-[10px] font-bold uppercase tracking-widest text-[#86868b] mb-1">Santé Batterie</span>
                  <span className="font-sans text-lg font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">{product.batteryHealth ? `${product.batteryHealth}%` : 'Vérifiée'}</span>
                </div>
              </div>

              {/* Minimal Tabs */}
              <div className="flex gap-6 border-b border-[#e5e5ea] dark:border-[#333336] mb-8">
                {['specs', 'condition', 'guarantees'].map((t) => (
                  <button 
                    key={t}
                    onClick={() => setActiveTab(t as any)}
                    className={`pb-3 font-sans text-sm font-medium tracking-wide relative transition-colors ${activeTab === t ? 'text-[#1d1d1f] dark:text-[#f5f5f7]' : 'text-[#86868b]'}`}
                  >
                    {t === 'specs' ? 'Spécifications' : t === 'condition' ? 'Grade' : 'Garanties'}
                    {activeTab === t && (
                      <motion.div layoutId="detailTabs" className="absolute bottom-0 left-0 right-0 h-[2px] rounded-t-full bg-[#1d1d1f] dark:bg-[#f5f5f7]" />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[160px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'specs' && (
                    <motion.div key="specs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                      <div className="flex justify-between border-b border-[#e5e5ea] dark:border-[#333336] pb-3">
                        <span className="font-sans text-sm text-[#86868b]">Processeur</span>
                        <span className="font-sans text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">{specs.processor}</span>
                      </div>
                      <div className="flex justify-between border-b border-[#e5e5ea] dark:border-[#333336] pb-3">
                        <span className="font-sans text-sm text-[#86868b]">Écran</span>
                        <span className="font-sans text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">{specs.screen}</span>
                      </div>
                      <div className="flex justify-between border-b border-[#e5e5ea] dark:border-[#333336] pb-3">
                        <span className="font-sans text-sm text-[#86868b]">Caméra</span>
                        <span className="font-sans text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">{specs.camera}</span>
                      </div>
                    </motion.div>
                  )}
                  {activeTab === 'condition' && (
                    <motion.div key="cond" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                      <h4 className="font-sans text-lg font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">{conditionInfo.title}</h4>
                      <p className="font-sans text-sm text-[#86868b] leading-relaxed max-w-sm">{conditionInfo.desc}</p>
                    </motion.div>
                  )}
                  {activeTab === 'guarantees' && (
                    <motion.div key="guar" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-[#86868b]">
                        <Shield size={16} className="text-[#1d1d1f] dark:text-[#f5f5f7]" />
                        <span>Garantie 6 mois incluse.</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-[#86868b]">
                        <Check size={16} className="text-[#1d1d1f] dark:text-[#f5f5f7]" />
                        <span>Inspection technique sur 45 points métiers.</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Sticky Purchase Panel */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-[#f5f5f7]/80 dark:bg-[#000000]/80 backdrop-blur-2xl border-t border-[#e5e5ea] dark:border-[#333336] flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#0066cc] dark:bg-[#2997ff] text-white font-sans font-medium py-4 rounded-full shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
              >
                {addedDirectly ? <Check size={18} /> : 'Ajouter au panier'}
              </button>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="w-14 h-14 flex-shrink-0 bg-[#34C759] hover:bg-[#30B753] rounded-full flex items-center justify-center shadow-lg hover:scale-[1.02] transition-transform text-white"
                title="Commander via WhatsApp"
              >
                <Send size={20} className="transform translate-x-[-2px] translate-y-[1px]" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
