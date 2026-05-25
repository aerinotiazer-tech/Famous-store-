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
    <section className="relative h-screen min-h-[800px] w-full overflow-hidden bg-neutral-900 flex flex-col items-center justify-center text-center">
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        {/* Deep immersive background element */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-neutral-900 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2560&auto=format&fit=crop" 
          alt="Premium abstract presentation" 
          className="w-full h-full object-cover scale-105"
        />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 mt-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <span className="font-sans text-neutral-400 tracking-[0.2em] text-xs uppercase mb-8 block">La Collection Signature</span>
          <h1 className="font-serif text-fluid-hero text-white mb-6 font-medium">
            L'excellence,<br />sans compromis.
          </h1>
          <p className="font-sans text-xl md:text-2xl text-neutral-300 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Découvrez une sélection rigoureuse d'appareils Apple authentiques. Qualité certifiée, esthétique parfaite.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        >
          <Link 
            to="/store"
            className="inline-flex items-center gap-4 bg-white text-black font-sans font-medium px-10 py-5 rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            Découvrir l'inventaire <ArrowRight size={20} className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 text-white/50 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest font-sans">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
};

// Editorial Story Section
const EditorialSection = () => {
  return (
    <section className="py-32 lg:py-48 px-6 lg:px-12 bg-ivory dark:bg-neutral-900 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <h2 className="font-serif text-fluid-h2 text-neutral-900 dark:text-ivory">
              Chaque détail compte.
            </h2>
            <div className="space-y-6 font-sans text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              <p>
                Nous croyons que l'acquisition d'un appareil devrait toujours être une expérience premium. C'est pourquoi nous rejetons les standards habituels de l'occasion.
              </p>
              <p>
                Pas de reconditionnement hasardeux. Pas de pièces génériques. Seulement l'ingénierie originale d'Apple, vérifiée sous tous les angles.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-neutral-100 dark:bg-neutral-800"
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
    <section className="py-24 bg-white dark:bg-black border-y border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 text-center md:text-left">
          {[
            { icon: ShieldCheck, title: "Qualité Absolue", desc: "Inspection multipoint certifiant 100% de pièces d'origine Apple. Aucun compromis." },
            { icon: Zap, title: "Transaction Fluide", desc: "Découvrez, choisissez, et finalisez via un accompagnement personnel immédiat." },
            { icon: Lock, title: "Transparence Totale", desc: "Grade de condition et santé de la batterie strictement documentés." }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-900 rounded-full flex items-center justify-center mx-auto md:mx-0">
                <item.icon size={24} className="text-neutral-900 dark:text-ivory" />
              </div>
              <h3 className="font-serif text-2xl text-neutral-900 dark:text-white">{item.title}</h3>
              <p className="font-sans text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
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
    return (
      <section className="py-32 bg-ivory dark:bg-neutral-900 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <h2 className="font-serif text-4xl text-neutral-900 dark:text-white">Collections</h2>
          <p className="text-neutral-500">L'inventaire est en cours d'approvisionnement.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 lg:py-48 bg-ivory dark:bg-neutral-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-serif text-fluid-h1 text-neutral-900 dark:text-white mb-6">
              Sélection<br />du moment.
            </h2>
            <p className="font-sans text-xl text-neutral-500 dark:text-neutral-400 font-light max-w-md">
              Des pièces exceptionnelles. <br />Disponibilité limitée.
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
              className="inline-flex items-center gap-2 pb-2 border-b border-neutral-900 dark:border-white text-neutral-900 dark:text-white font-sans font-medium hover:text-luxury-accent hover:border-luxury-accent transition-colors"
            >
              Voir la collection complète <ArrowUpRight size={18} />
            </Link>
          </motion.div>
        </div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {products.slice(0, 3).map((product, idx) => {
            // Asymmetrical span logic
            const colSpan = idx === 0 ? 'md:col-span-12 lg:col-span-8' : (idx === 1 ? 'md:col-span-6 lg:col-span-4' : 'md:col-span-6 lg:col-span-12');
            const aspect = idx === 0 ? 'aspect-[4/3] lg:aspect-[16/9]' : 'aspect-square';
            
            return (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`${colSpan} group relative block rounded-[2rem] overflow-hidden bg-neutral-100 dark:bg-neutral-800 isolate`}
              >
                <div className={`relative w-full ${aspect} overflow-hidden`}>
                  <img 
                    src={product.imageUrl || "https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1600"} 
                    alt={product.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                  
                  {/* Floating Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 flex justify-between items-end">
                    <div className="space-y-3">
                      <span className="font-sans text-xs uppercase tracking-widest text-white/70">
                        {product.condition} • {product.storage}
                      </span>
                      <h3 className="font-serif text-3xl md:text-4xl text-white font-medium">
                        {product.name}
                      </h3>
                      <p className="font-sans text-lg text-white/90">
                        {product.price.toLocaleString('fr-FR')} FCFA
                      </p>
                    </div>
                    <Link
                       to={`/store?highlight=${product.id}`}
                       className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300"
                    >
                      <ArrowUpRight size={24} />
                    </Link>
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
    <section className="py-48 relative overflow-hidden bg-emerald-950 flex items-center justify-center text-center px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-luxury-accent/20 to-neutral-950 z-0"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-3xl mx-auto space-y-12"
      >
        <h2 className="font-serif text-fluid-h2 text-white">
          Votre prochain appareil vous attend.
        </h2>
        <a 
          href={`https://wa.me/${whatsappNum}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-4 bg-white text-black font-sans font-medium px-12 py-6 rounded-full hover:scale-105 transition-transform duration-300 shadow-2xl hover:shadow-luxury-accent/20 text-lg"
        >
          Contacter notre conseiller
        </a>
      </motion.div>
    </section>
  );
};

export default function HomePage() {
  const { products, loading } = useProducts();
  const { settings } = useSettings();
  
  const cleanNumber = (settings.whatsappNumber || '+22799368634').replace(/[^0-9]/g, '');

  return (
    <div className="flex flex-col w-full bg-ivory dark:bg-neutral-900">
      <HeroCinematic />
      <EditorialSection />
      <FeaturedCollections products={products} />
      <TrustGridMinimal />
      <FinalCTA whatsappNum={cleanNumber} />
    </div>
  );
}
