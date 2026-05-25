import React, { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight, ShieldCheck, Zap, Lock, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { useProducts } from '../services/products';
import { useSettings } from '../services/settings';

// Hero Cinematic Section
const HeroCinematic = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className="relative h-screen min-h-[800px] w-full overflow-hidden bg-black flex flex-col items-center justify-center text-center">
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        {/* Deep immersive background element */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black z-10" />
        <img 
          src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2560&auto=format&fit=crop" 
          alt="Premium abstract presentation" 
          className="w-full h-full object-cover scale-105 opacity-80"
        />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 mt-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
           <span className="font-sans text-[#f5f5f7] tracking-[0.2em] text-[10px] md:text-xs uppercase mb-8 block">Le standard d'excellence</span>
          <h1 className="font-sans text-fluid-hero text-[#f5f5f7] mb-6 font-semibold tracking-tight">
            L'excellence.<br />Reconditionnée.
          </h1>
          <p className="font-sans text-xl md:text-2xl text-[#86868b] max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            Découvrez une sélection rigoureuse d'appareils authentiques. Qualité certifiée, esthétique parfaite.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="flex justify-center"
        >
          <Link 
            to="/store"
            className="inline-flex items-center gap-3 bg-[#f5f5f7] text-[#1d1d1f] font-sans font-medium px-8 py-4 rounded-full hover:scale-[1.02] transition-transform duration-300"
          >
            Découvrir l'inventaire
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// Editorial Story Section
const EditorialSection = () => {
  return (
    <section className="py-32 lg:py-48 px-6 lg:px-12 bg-white dark:bg-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <h2 className="font-sans font-semibold tracking-tight text-5xl md:text-6xl text-[#1d1d1f] dark:text-[#f5f5f7]">
              Chaque détail compte.
            </h2>
            <div className="space-y-6 font-sans text-xl lg:text-2xl text-[#86868b] dark:text-[#86868b] font-medium leading-relaxed">
              <p>
                L'acquisition d'un appareil devrait toujours être une expérience premium. C'est pourquoi nous rejetons les standards habituels de l'occasion.
              </p>
              <p className="text-[#1d1d1f] dark:text-[#f5f5f7]">
                Pas de reconditionnement hasardeux. Pas de pièces génériques. Seulement l'ingénierie originale d'Apple, vérifiée sous tous les angles.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-[#f5f5f7] dark:bg-[#1d1d1f]"
          >
            <img 
              src="https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=2000&auto=format&fit=crop" 
              alt="iPhone detail" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Trust & Authority Section
const TrustGridMinimal = () => {
  return (
    <section className="py-24 bg-[#f5f5f7] dark:bg-[#1d1d1f]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 text-center md:text-left">
          {[
            { icon: ShieldCheck, title: "Qualité Absolue", desc: "Inspection multipoint certifiant 100% de pièces d'origine Apple. Aucun compromis." },
            { icon: Zap, title: "Transaction Fluide", desc: "Découvrez, choisissez et finalisez via un accompagnement personnel immédiat." },
            { icon: Lock, title: "Transparence Totale", desc: "Grade de condition et santé de la batterie strictement documentés." }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 flex flex-col items-center md:items-start"
            >
              <div className="w-16 h-16 bg-white dark:bg-black rounded-full flex items-center justify-center shadow-sm">
                <item.icon size={24} className="text-[#1d1d1f] dark:text-[#f5f5f7]" strokeWidth={1.5} />
              </div>
              <h3 className="font-sans text-2xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">{item.title}</h3>
              <p className="font-sans text-lg text-[#86868b] font-medium leading-relaxed max-w-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Dynamic Grid - Featured Collections
const FeaturedCollections = ({ products }: { products: any[] }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-32 lg:py-48 bg-white dark:bg-black px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-sans text-6xl md:text-7xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-6">
              Sélection du moment.
            </h2>
            <p className="font-sans text-2xl text-[#86868b] font-medium max-w-md">
              Des pièces exceptionnelles. Disponibilité limitée.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Link 
              to="/store"
              className="inline-flex items-center gap-2 text-[#0066cc] dark:text-[#2997ff] font-sans text-lg font-medium hover:underline transition-colors"
            >
              Voir la collection complète <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {products.slice(0, 3).map((product, idx) => {
            // Asymmetrical span logic
            const colSpan = idx === 0 ? 'md:col-span-12 lg:col-span-8' : (idx === 1 ? 'md:col-span-6 lg:col-span-4' : 'md:col-span-6 lg:col-span-12');
            const aspect = idx === 0 ? 'aspect-[4/3] lg:aspect-[16/9]' : 'aspect-square lg:aspect-[21/9]';
            
            return (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`${colSpan} relative rounded-[2rem] overflow-hidden bg-[#f5f5f7] dark:bg-[#1d1d1f] transition-colors`}
              >
                <Link to={`/store?highlight=${product.id}`} className="absolute inset-0 z-20" aria-label={`View ${product.name}`} />
                <div className={`relative w-full ${aspect} flex flex-col justify-between overflow-hidden p-8 lg:p-12`}>
                   <div className="z-10 text-center flex flex-col items-center">
                      <span className="font-sans text-xs uppercase font-bold tracking-widest text-[#86868b] mb-2">
                        {product.condition} • {product.storage}
                      </span>
                      <h3 className="font-sans text-3xl md:text-4xl text-[#1d1d1f] dark:text-[#f5f5f7] font-semibold mb-2">
                        {product.name}
                      </h3>
                      <p className="font-sans text-xl text-[#86868b] font-medium">
                        {product.price.toLocaleString('fr-FR')} FCFA
                      </p>
                   </div>
                   
                   <div className="flex-1 min-h-[200px] flex items-center justify-center overflow-hidden transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105">
                    <img 
                      src={product.imageUrl || "https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1600"} 
                      alt={product.name} 
                      className="w-[80%] h-[80%] object-contain drop-shadow-2xl select-none"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Final CTA Section
const FinalCTA = ({ whatsappNum }: { whatsappNum: string }) => {
  return (
    <section className="py-48 relative overflow-hidden bg-white dark:bg-black flex items-center justify-center text-center px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-3xl mx-auto space-y-12"
      >
        <h2 className="font-sans text-fluid-h2 text-[#1d1d1f] dark:text-[#f5f5f7] font-semibold tracking-tight">
          Votre prochain appareil vous attend.
        </h2>
        <a 
          href={`https://wa.me/${whatsappNum}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-4 bg-black dark:bg-white text-white dark:text-black font-sans font-medium px-10 py-5 rounded-full hover:scale-105 transition-transform duration-300 text-lg"
        >
          Contacter un conseiller
        </a>
      </motion.div>
    </section>
  );
};

export default function HomePage() {
  const { products } = useProducts();
  const { settings } = useSettings();
  
  const cleanNumber = (settings.whatsappNumber || '+22799368634').replace(/[^0-9]/g, '');

  return (
    <div className="flex flex-col w-full bg-white dark:bg-black selection:bg-[#0066cc] selection:text-white">
      <HeroCinematic />
      <EditorialSection />
      <FeaturedCollections products={products} />
      <TrustGridMinimal />
      <FinalCTA whatsappNum={cleanNumber} />
    </div>
  );
}
