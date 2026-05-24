import { motion } from 'motion/react';
import { ShieldCheck, Award, HeartHandshake } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="w-full bg-white dark:bg-black">
      {/* Hero */}
      <section className="pt-20 pb-16 px-4 md:py-32 md:px-8 text-center bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-100 dark:border-neutral-900">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
            About Famous Store
          </h1>
          <p className="text-xl text-neutral-500 dark:text-neutral-400">
            Bringing premium verified pre-owned Apple devices to Niamey.
          </p>
        </motion.div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="prose prose-lg prose-neutral mx-auto text-neutral-600 dark:text-neutral-300">
          <p className="lead text-2xl font-medium text-neutral-900 dark:text-white mb-8">
            We started Famous Store with a simple goal: to make high-quality, original Apple products accessible, transparent, and trustworthy in our local community.
          </p>
          <p className="mb-6">
            The second-hand smartphone market is often filled with anxiety. Is the battery healthy? Are the parts original? Has it been repaired with third-party components? We eliminate these concerns entirely.
          </p>
          <p>
            Every phone we sell goes through a strict verification process. If it's an A+ grade, it looks and feels brand new. If it's a B grade, we tell you exactly why. We display battery health openly, and we never sell devices with mixed or non-authentic Apple parts. 
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-neutral-900 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center space-y-4">
               <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-2 shadow-inner">
                <ShieldCheck size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold">Radical Transparency</h3>
              <p className="text-neutral-400 max-w-xs">You get exactly what you see. No hidden defects, no exaggerated grades.</p>
            </div>
            
             <div className="flex flex-col items-center space-y-4">
               <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-2 shadow-inner">
                <Award size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold">Premium Quality</h3>
              <p className="text-neutral-400 max-w-xs">We source only the best condition devices from trusted international distributors.</p>
            </div>

            <div className="flex flex-col items-center space-y-4">
               <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-2 shadow-inner">
                <HeartHandshake size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold">Local Trust</h3>
              <p className="text-neutral-400 max-w-xs">Based in Niamey. Real people, simple communication via WhatsApp, reliable support.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
