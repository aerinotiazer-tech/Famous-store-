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
        processor: name.includes('15') ? 'A17 Pro Bionic' : name.includes('14') ? 'A16 Bionic' : 'A15 Bionic',
        screen: name.includes('max') ? '6.7" Super Retina XDR OLED' : '6.1" Super Retina XDR OLED',
        camera: 'Triple capteur 48Mpx + Macro Pro' + (name.includes('max') ? ' (Zoom 5x)' : ' (Zoom 3x)'),
        network: '5G ultra-rapide (eSIM & SIM physique)',
        security: 'Face ID biométrique sécurisé',
        weight: name.includes('max') ? '221g (Finition Titane/Acier)' : '187g (Design Premium)'
      };
    } else if (product.category === 'android' || name.includes('samsung') || name.includes('galaxy')) {
      return {
        processor: 'Snapdragon 8 Gen 2 / Exynos 2300',
        screen: '6.8" Dynamic AMOLED 2X 120Hz',
        camera: 'Quadruple Capteur 200Mpx + Space Zoom 100x',
        network: '5G, Wi-Fi 6E, Dual SIM',
        security: 'Capteur d\'empreintes sous l\'écran & Reconnaissance faciale',
        weight: '234g (Cadre Armor Aluminum)'
      };
    } else if (product.category === 'accessory' || name.includes('airpods')) {
      return {
        processor: 'Puce Apple H2 / Smart Audio Chip',
        screen: 'Tactile intuitif & Capteurs de pression',
        camera: 'Réduction Active du Bruit Pro & Transparence Adaptative',
        network: 'Bluetooth 5.3 ultra-stable & Bascule automatique',
        security: 'Localisation précise avec l\'application "Localiser"',
        weight: '5.3g par écouteur, boîtier de charge premium'
      };
    }
    return {
      processor: 'Puce haute performance intégrée',
      screen: 'Écran Haute Définition calibré',
      camera: 'Objectif optique optimisé',
      network: 'Compatibilité réseau mondiale',
      security: 'Protection biométrique des données',
      weight: 'Poids optimisé pour un usage au quotidien'
    };
  };

  const specs = getSpecs();

  // Helper text for condition classification
  const getConditionDetails = (grade: string) => {
    switch (grade) {
      case 'Neuf':
        return {
          title: 'Scellé / Neuf',
          description: 'L\'appareil est entièrement neuf, d\'origine fabricant, jamais déballé et scellé sous blister. Il bénéficie du meilleur état de fonctionnement théorique, fourni avec ses accessoires officiels d\'usine et ses composants d\'origine neufs.',
          score: 10
        };
      case 'A+':
        return {
          title: 'Comme Neuf',
          description: 'L\'appareil est dans un état esthétique irréprochable. Aucune rayure, marque ou micro-fissure sur l\'écran ou le châssis. Idéal pour offrir ou se faire plaisir comme avec un produit scellé.',
          score: 10
        };
      case 'A':
        return {
          title: 'Excellent État',
          description: 'L\'appareil a été très bien entretenu. L\'écran est entièrement exempt de rayures visibles. Il peut présenter d\'infimes traces d\'usage superficielles sur les côtés, invisibles à plus de 20cm.',
          score: 9
        };
      case 'B':
        return {
          title: 'Très Bon État',
          description: 'L\'appareil montre de légères micro-rayures sur l\'écran ou des traces d\'usage ordinaires sur les contours ou le dos de l\'appareil. L\'expérience d\'utilisation reste optimale pour un prix réduit.',
          score: 8
        };
      default:
        return {
          title: 'Bon État Fonctionnel',
          description: 'L\'appareil présente des marques d\'utilisation marquées ou micro-rayures visibles mais qui ne gênent en rien la lisibilité. Écran sans brisure de verre, testé à 100% sur 45 points clés.',
          score: 7
        };
    }
  };

  const conditionInfo = getConditionDetails(product.condition);

  // Pre-fill WhatsApp URL
  const getWhatsAppLink = () => {
    const isNewLocal = product.isNew || product.condition === 'Neuf';
    const conditionText = isNewLocal ? 'En boîte d\'origine scellée (Neuf)' : `Reconditionné - Grade ${product.condition}`;
    const batteryText = isNewLocal ? '100%' : `${product.batteryHealth}%`;
    const message = `Bonjour ! Je suis intéressé(e) par l'appareil suivant disponible sur votre boutique :\n\n📱 *Appareil* : ${product.name}\n💾 *Stockage* : ${product.storage || 'Standard'}\n🔋 *Santé Batterie* : ${batteryText}\n⚖️ *État* : ${conditionText}\n💰 *Tarif* : ${product.price.toLocaleString()} FCFA\n\nEst-il toujours disponible pour une livraison ?`;
    return `https://wa.me/2250700000000?text=${encodeURIComponent(message)}`; // Example default number or custom WA format
  };

  // Pre-fill direct copy text
  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/store?product=${product.id}`);
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/80 rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row h-full max-h-[90vh] md:max-h-[85vh] text-neutral-900 dark:text-neutral-100"
        >
          {/* Close button inside modal corner top right */}
          <button 
            onClick={onClose}
            id="close_product_detail_modal_btn"
            className="absolute top-4 right-4 z-20 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700/80 p-2.5 rounded-full text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-all cursor-pointer shadow-md"
          >
            <X size={20} />
          </button>

          {/* Left Column: Image Spotlight (High fidelity look) */}
          <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-between bg-neutral-50 dark:bg-neutral-950 border-r border-neutral-200/50 dark:border-neutral-800/50 h-[40%] md:h-full relative overflow-hidden">
            {/* Visual background atmospheric lights in dark mode */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex justify-between items-center relative z-10">
              <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase bg-neutral-200/50 dark:bg-neutral-800 px-3 py-1 rounded-full">
                {product.category}
              </span>
              <button 
                onClick={handleShare}
                className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-all bg-white dark:bg-neutral-900 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800"
              >
                {copied ? <Check size={12} className="text-emerald-500" /> : <Share2 size={12} />}
                <span>{copied ? 'Copié !' : 'Partager'}</span>
              </button>
            </div>

            {/* Main spotlight product image */}
            <div className="flex-1 flex items-center justify-center p-4 relative z-10 transition-transform duration-500 hover:scale-105">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="max-h-[220px] md:max-h-[350px] w-auto object-contain filter drop-shadow-2xl" 
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Tags overlay inside images section */}
            <div className="flex flex-wrap gap-2 relative z-10 mt-auto">
              <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-1">
                <Award size={13} /> Certifié Authentique
              </span>
              {product.batteryHealth && (
                <span className={`text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-1 ${product.batteryHealth >= 90 ? 'bg-emerald-600' : 'bg-blue-600'}`}>
                  <Battery size={13} /> {product.isNew || product.condition === 'Neuf' ? '100%' : `${product.batteryHealth}%`} Santé Batterie
                </span>
              )}
              <span className="bg-neutral-900 dark:bg-neutral-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm">
                {product.isNew || product.condition === 'Neuf' ? '✨ Neuf' : `Grade ${product.condition}`}
              </span>
            </div>
          </div>

          {/* Right Column: Detailed parameters & interaction panel */}
          <div className="md:w-1/2 flex flex-col h-[60%] md:h-full">
            {/* Scrollable details container */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-2">
                  {product.name}
                </h2>
                
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white">
                    {product.price.toLocaleString()} FCFA
                  </span>
                  <span className="bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-2 py-1 rounded-md">
                    En Stock
                  </span>
                </div>
              </div>

              {/* Dynamic Storage & Color specifications */}
              <div className="grid grid-cols-2 gap-4 bg-neutral-50 dark:bg-neutral-950 p-4 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60">
                <div className="space-y-0.5">
                  <span className="text-xs text-neutral-500 block">Stockage</span>
                  <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200 block">{product.storage || 'Non spécifié'}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs text-neutral-500 block">Santé Batterie</span>
                  <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200 block">
                    {product.batteryHealth}% {product.batteryHealth >= 95 ? '(Exceptionnel)' : product.batteryHealth >= 90 ? '(Excellent)' : '(Optimal)'}
                  </span>
                </div>
              </div>

              {/* Specs and interactive glossary navigation tab selection */}
              <div className="border-b border-neutral-200 dark:border-neutral-800 flex gap-4">
                <button 
                  onClick={() => setActiveTab('specs')}
                  className={`pb-3 text-sm font-bold transition-all relative ${activeTab === 'specs' ? 'text-neutral-900 dark:text-white' : 'text-neutral-500 hover:text-neutral-700'}`}
                >
                  Caractéristiques
                  {activeTab === 'specs' && <motion.div layoutId="modal_tab_indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 dark:bg-white" />}
                </button>
                <button 
                  onClick={() => setActiveTab('condition')}
                  className={`pb-3 text-sm font-bold transition-all relative ${activeTab === 'condition' ? 'text-neutral-900 dark:text-white' : 'text-neutral-500 hover:text-neutral-700'}`}
                >
                  {product.isNew || product.condition === 'Neuf' ? 'État Neuf' : `Détail du Grade (${product.condition})`}
                  {activeTab === 'condition' && <motion.div layoutId="modal_tab_indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 dark:bg-white" />}
                </button>
                <button 
                  onClick={() => setActiveTab('guarantees')}
                  className={`pb-3 text-sm font-bold transition-all relative ${activeTab === 'guarantees' ? 'text-neutral-900 dark:text-white' : 'text-neutral-500 hover:text-neutral-700'}`}
                >
                  Garanties & Confiance
                  {activeTab === 'guarantees' && <motion.div layoutId="modal_tab_indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 dark:bg-white" />}
                </button>
              </div>

              {/* Dynamic Tab Content rendering */}
              <div className="min-h-[140px]">
                {activeTab === 'specs' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    <div className="flex items-start gap-2.5">
                      <Cpu size={16} className="text-neutral-400 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-xs text-neutral-400 block font-medium">Processeur</span>
                        <span className="text-sm font-semibold">{specs.processor}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Compass size={16} className="text-neutral-400 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-xs text-neutral-400 block font-medium">Écran</span>
                        <span className="text-sm font-semibold">{specs.screen}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Sparkles size={16} className="text-neutral-400 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-xs text-neutral-400 block font-medium">Module Photo</span>
                        <span className="text-sm font-semibold">{specs.camera}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Zap size={16} className="text-neutral-400 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-xs text-neutral-400 block font-medium">Réseau & SIM</span>
                        <span className="text-sm font-semibold">{specs.network}</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'condition' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3 bg-neutral-50 dark:bg-neutral-950 p-4 rounded-xl border border-neutral-200/50 dark:border-neutral-800/50">
                      <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 font-extrabold text-xl">
                        {product.condition}
                      </div>
                      <div>
                        <span className="text-xs text-neutral-400 block font-medium">Classification esthétique</span>
                        <span className="font-bold text-neutral-900 dark:text-white text-base">État {conditionInfo.title}</span>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {conditionInfo.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                      <AlertCircle size={14} className="text-amber-500" />
                      <span>Tous nos appareils sont débloqués iCloud/Google et compatibles avec tous les opérateurs mondiaux.</span>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'guarantees' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3 text-sm text-neutral-600 dark:text-neutral-300"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1 rounded bg-emerald-500/10 text-emerald-500">
                        <Check size={14} />
                      </div>
                      <span className="font-medium">Test technique approfondi sur 45 points (Tactile, micro, objectifs, charge...)</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="p-1 rounded bg-emerald-500/10 text-emerald-500">
                        <Check size={14} />
                      </div>
                      <span className="font-medium">Garantie réparation / remplacement de 6 mois incluse d'office</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="p-1 rounded bg-emerald-500/10 text-emerald-500">
                        <Check size={14} />
                      </div>
                      <span className="font-medium">Livraison sécurisée avec vérification sur place avant paiement direct</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="p-1 rounded bg-emerald-500/10 text-emerald-500">
                        <Check size={14} />
                      </div>
                      <span className="font-medium">Service de reprise / échange disponible en boutique</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Bottom Panel Actions */}
            <div className="p-6 md:p-8 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800/60 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                id="modal_add_to_cart_btn"
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm tracking-wide transition-all ${addedDirectly ? 'bg-emerald-600 text-white' : 'bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900'} active:scale-95 cursor-pointer shadow-md`}
              >
                {addedDirectly ? (
                  <>
                    <Check size={18} />
                    <span>Ajouté au panier !</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Ajouter au panier</span>
                  </>
                )}
              </button>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                id="modal_whatsapp_reserve_link"
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm tracking-wide py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 text-center"
              >
                <Send size={18} className="fill-white" />
                <span>Réserver par WhatsApp</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
