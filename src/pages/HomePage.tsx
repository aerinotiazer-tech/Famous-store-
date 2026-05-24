import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Battery, Zap } from 'lucide-react';
import { Link } from 'react-router';
import { useProducts, staticProducts } from '../services/products';
import { useSettings } from '../services/settings';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const { products, loading } = useProducts();
  const { settings } = useSettings();
  
  const displayProducts = products.length > 0 ? products : staticProducts;
  const featuredProducts = displayProducts.slice(0, 3);
  
  const cleanNumber = (settings.whatsappNumber || '+22790000000').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanNumber}`;

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col items-center text-center">
        <div className="absolute inset-0 bg-neutral-100/50 dark:bg-black -z-10" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-primary-blue/10 text-primary-blue text-sm font-medium mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-blue"></span>
            </span>
            Premium Pre-Owned iPhones in Niamey
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white leading-tight">
            Original Apple Devices. <br className="hidden md:block" />
            Zero Compromises.
          </h1>
          <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
            Experience the quality of authentic Apple devices with verified battery health and trusted condition grades. Fast checkout via WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              to="/store"
              className="w-full sm:w-auto bg-primary-blue hover:bg-primary-blue-hover text-white font-medium px-8 py-3.5 rounded-full transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
            >
              Shop Collection <ArrowRight size={18} />
            </Link>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-900 dark:text-white font-medium px-8 py-3.5 rounded-full transition-all duration-200"
            >
              Contact Support
            </a>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white dark:bg-neutral-950 px-4 sm:px-6 lg:px-8 border-y border-neutral-100 dark:border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-4"
            >
              <div className="w-16 h-16 bg-blue-50 dark:bg-primary-blue/10 text-primary-blue rounded-2xl flex items-center justify-center mb-2">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">100% Original</h3>
              <p className="text-neutral-500 dark:text-neutral-400 max-w-xs">We never sell repaired or mixed parts. Every component is authentic Apple.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center space-y-4"
            >
              <div className="w-16 h-16 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-500 rounded-2xl flex items-center justify-center mb-2">
                <Battery size={32} />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">Verified Battery</h3>
              <p className="text-neutral-500 dark:text-neutral-400 max-w-xs">Transparent battery health scores for every device. No surprises.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center space-y-4"
            >
              <div className="w-16 h-16 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500 rounded-2xl flex items-center justify-center mb-2">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">Fast Purchase</h3>
              <p className="text-neutral-500 dark:text-neutral-400 max-w-xs">See it, like it, WhatsApp us. Simple, direct, and local checkout.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-neutral-50 dark:bg-black px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex justify-between items-end">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
                Featured Devices
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 max-w-xl">
                Hand-picked selections from our current inventory. High grades, healthy batteries.
              </p>
            </div>
            <Link 
              to="/store"
              className="hidden md:flex text-primary-blue hover:text-primary-blue-hover font-medium items-center gap-1 transition-colors"
            >
              View all <ArrowRight size={16} />
            </Link>
          </div>
          
          {loading ? (
             <div className="flex justify-center items-center py-12">     
               <div className="w-8 h-8 border-4 border-primary-blue border-t-transparent rounded-full animate-spin"></div>
             </div>
          ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
               {featuredProducts.map((product) => (
                 <ProductCard key={product.id} product={product} />
               ))}
             </div>
          )}

          <div className="md:hidden flex justify-center pt-8">
            <Link 
              to="/store"
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white font-medium px-8 py-3 rounded-full flex items-center gap-2"
            >
              View all inventory
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
