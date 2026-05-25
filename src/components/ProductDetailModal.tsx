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
          className="absolute inset-0 bg-neutral-900/40 backdrop-blur-xl"
        />

        {/* Modal Window Container - Full height on mobile, cinematic card on desktop */}
        <motion.div
          initial={{ opacity: 0, y: '100%', scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: '100%', scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-[90vh] md:h-auto md:max-h-[85vh] max-w-6xl mx-4 bg-ivory dark:bg-neutral-900 md:rounded-[2.5rem] rounded-t-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl isolate"
        >
          {/* Close trigger */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-50 w-10 h-10 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 rounded-full flex items-center justify-center text-black dark:text-white transition-colors backdrop-blur-md"
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          {/* Left: Immersive Image Gallery Area */}
          <div className="md:w-1/2 relative bg-neutral-100 dark:bg-neutral-950 flex flex-col justify-center overflow-hidden min-h-[40vh] md:min-h-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10 point-events-none mix-blend-multiply dark:mix-blend-normal" />
            <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
              <span className="font-sans text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-md text-black dark:text-white">
                {product.category}
              </span>
              <button onClick={handleShare} className="w-8 h-8 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-md flex items-center justify-center text-black dark:text-white hover:bg-white dark:hover:bg-black transition-colors">
                {copied ? <Check size={14} /> : <Share2 size={14} />}
              </button>
            </div>

            <motion.img 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              src={product.imageUrl || "https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=800"} 
              alt={product.name} 
              className="w-full h-full object-contain p-12 md:p-24 mix-blend-multiply dark:mix-blend-normal z-10" 
            />
          </div>

          {/* Right: Premium Editorial Information */}
          <div className="md:w-1/2 flex flex-col bg-ivory dark:bg-neutral-900 relative">
            <div className="flex-1 overflow-y-auto px-8 md:px-16 pt-12 md:pt-16 pb-32">
              <span className="font-sans text-xs tracking-widest uppercase text-neutral-400 mb-4 block">Édition Premium</span>
              <h1 className="font-serif text-4xl md:text-5xl text-neutral-900 dark:text-white mb-6">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-6 mb-12">
                <span className="font-sans text-3xl font-light tracking-tight text-neutral-900 dark:text-white">
                  {product.price.toLocaleString('fr-FR')} FCFA
                </span>
                <span className="font-sans text-xs uppercase tracking-widest px-3 py-1 border border-neutral-300 dark:border-neutral-700 rounded-full text-neutral-500">
                  En Stock
                </span>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-2 gap-px bg-neutral-200 dark:bg-neutral-800 rounded-2xl overflow-hidden mb-12">
                <div className="bg-ivory dark:bg-neutral-900 p-6">
                  <span className="block font-sans text-xs uppercase tracking-widest text-neutral-400 mb-2">Stockage</span>
                  <span className="font-sans text-lg text-black dark:text-white">{product.storage || 'Standard'}</span>
                </div>
                <div className="bg-ivory dark:bg-neutral-900 p-6">
                  <span className="block font-sans text-xs uppercase tracking-widest text-neutral-400 mb-2">Santé Batterie</span>
                  <span className="font-sans text-lg text-black dark:text-white">{product.batteryHealth ? `${product.batteryHealth}%` : 'Vérifiée'}</span>
                </div>
                <div className="bg-ivory dark:bg-neutral-900 p-6">
                  <span className="block font-sans text-xs uppercase tracking-widest text-neutral-400 mb-2">État</span>
                  <span className="font-sans text-lg text-black dark:text-white">{product.condition === 'Neuf' || product.isNew ? 'Neuf' : `Grade ${product.condition}`}</span>
                </div>
                <div className="bg-ivory dark:bg-neutral-900 p-6">
                  <span className="block font-sans text-xs uppercase tracking-widest text-neutral-400 mb-2">Authenticité</span>
                  <span className="font-sans text-lg text-black dark:text-white flex items-center gap-2">
                    Certifié <Award size={16} className="text-luxury-accent" />
                  </span>
                </div>
              </div>

              {/* Minimal Tabs */}
              <div className="flex gap-8 border-b border-neutral-200 dark:border-neutral-800 mb-8">
                {['specs', 'condition', 'guarantees'].map((t) => (
                  <button 
                    key={t}
                    onClick={() => setActiveTab(t as any)}
                    className={`pb-4 font-sans text-sm tracking-wide relative transition-colors ${activeTab === t ? 'text-black dark:text-white' : 'text-neutral-400'}`}
                  >
                    {t === 'specs' ? 'Spécifications' : t === 'condition' ? 'Grade' : 'Garanties'}
                    {activeTab === t && (
                      <motion.div layoutId="detailTabs" className="absolute bottom-0 left-0 right-0 h-px bg-black dark:bg-white" />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[160px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'specs' && (
                    <motion.div key="specs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                      <div className="flex justify-between border-b border-black/5 dark:border-white/5 pb-4">
                        <span className="font-sans text-sm text-neutral-500">Processeur</span>
                        <span className="font-sans text-sm text-black dark:text-white">{specs.processor}</span>
                      </div>
                      <div className="flex justify-between border-b border-black/5 dark:border-white/5 pb-4">
                        <span className="font-sans text-sm text-neutral-500">Écran</span>
                        <span className="font-sans text-sm text-black dark:text-white">{specs.screen}</span>
                      </div>
                      <div className="flex justify-between border-b border-black/5 dark:border-white/5 pb-4">
                        <span className="font-sans text-sm text-neutral-500">Caméra</span>
                        <span className="font-sans text-sm text-black dark:text-white">{specs.camera}</span>
                      </div>
                    </motion.div>
                  )}
                  {activeTab === 'condition' && (
                    <motion.div key="cond" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                      <h4 className="font-serif text-xl text-black dark:text-white">{conditionInfo.title}</h4>
                      <p className="font-sans text-sm text-neutral-500 leading-relaxed max-w-sm">{conditionInfo.desc}</p>
                    </motion.div>
                  )}
                  {activeTab === 'guarantees' && (
                    <motion.div key="guar" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-neutral-500">
                        <Shield size={16} className="text-black dark:text-white" />
                        <span>Garantie 6 mois incluse.</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-neutral-500">
                        <Check size={16} className="text-black dark:text-white" />
                        <span>Inspection technique sur 45 points métiers.</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Sticky Purchase Panel */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-ivory/80 dark:bg-neutral-900/80 backdrop-blur-2xl border-t border-black/5 dark:border-white/5 flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black dark:bg-white text-white dark:text-black font-sans font-medium py-4 rounded-xl shadow-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
              >
                {addedDirectly ? <Check size={18} /> : 'Ajouter au panier'}
              </button>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="w-16 h-16 flex-shrink-0 bg-emerald-500 hover:bg-emerald-600 rounded-xl flex items-center justify-center shadow-xl hover:scale-[1.02] transition-transform text-white"
                title="Commander via WhatsApp"
              >
                <Send size={20} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
