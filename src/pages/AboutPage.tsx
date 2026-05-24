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
            À Propos de Famous Store
          </h1>
          <p className="text-xl text-neutral-500 dark:text-neutral-400">
            Apporter des appareils Apple d'occasion vérifiés de qualité premium à Niamey.
          </p>
        </motion.div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="prose prose-lg prose-neutral mx-auto text-neutral-600 dark:text-neutral-300">
          <p className="lead text-2xl font-medium text-neutral-900 dark:text-white mb-8">
            Nous avons créé Famous Store avec un objectif simple : rendre les produits Apple originaux de haute qualité accessibles, transparents et dignes de confiance dans notre communauté locale.
          </p>
          <p className="mb-6">
            Le marché des smartphones d'occasion est souvent source d'anxiété. La batterie est-elle saine ? Les pièces sont-elles d'origine ? Ont-ils été réparés avec des composants tiers ? Nous éliminons entièrement ces inquiétudes.
          </p>
          <p>
            Chaque téléphone que nous vendons passe par un processus de vérification strict. S'il s'agit d'un grade A+, il a l'apparence et la sensation d'un neuf. S'il s'agit d'un grade B, nous vous disons exactement pourquoi. L'état de la santé de la batterie est affiché ouvertement et nous ne vendons jamais de téléphones avec des pièces Apple non authentiques ou mélangées.
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
              <h3 className="text-xl font-semibold">Transparence Radicale</h3>
              <p className="text-neutral-400 max-w-xs">Vous obtenez exactement ce que vous voyez. Aucun défaut caché, aucun grade exagéré.</p>
            </div>
            
             <div className="flex flex-col items-center space-y-4">
               <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-2 shadow-inner">
                <Award size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold">Qualité Premium</h3>
              <p className="text-neutral-400 max-w-xs">Nous nous approvisionnons uniquement en appareils dans le meilleur état possible, auprès de distributeurs internationaux de confiance.</p>
            </div>

            <div className="flex flex-col items-center space-y-4">
               <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-2 shadow-inner">
                <HeartHandshake size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold">Confiance Locale</h3>
              <p className="text-neutral-400 max-w-xs">Basé à Niamey. De vraies personnes, une communication simple via WhatsApp, un support fiable.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
