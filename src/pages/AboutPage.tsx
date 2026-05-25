import { motion } from 'motion/react';
import { ShieldCheck, Award, HeartHandshake } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="w-full bg-ivory dark:bg-neutral-900 min-h-screen transition-colors">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-12 text-center border-b border-black/5 dark:border-white/5">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <span className="font-sans text-xs tracking-widest uppercase text-neutral-400 block">La Maison</span>
          <h1 className="font-serif text-5xl md:text-7xl text-black dark:text-white mb-6">
            L'Héritage Famous Store
          </h1>
          <p className="font-sans text-lg text-neutral-500 max-w-2xl mx-auto">
            L'excellence de la technologie d'occasion garantie, sélectionnée avec une rigueur absolue pour notre clientèle premium.
          </p>
        </motion.div>
      </section>

      {/* Story */}
      <section className="py-24 md:py-32 px-6 lg:px-12 max-w-4xl mx-auto">
        <div className="space-y-12">
          <p className="font-serif text-3xl md:text-4xl text-black dark:text-white leading-tight">
            Nous avons fondé Famous Store avec une conviction : l'acquisition d'un produit premium d'occasion doit offrir la même sérénité et le même prestige qu'un produit neuf.
          </p>
          <div className="grid md:grid-cols-2 gap-12 font-sans text-neutral-500 leading-relaxed">
            <p>
              Le marché de la seconde main est trop souvent synonyme de compromis et d'incertitude. Composants non authentiques, usure masquée, origines douteuses. Nous avons décidé d'élever les standards pour proposer une expérience d'achat digne de la haute technologie qui la compose.
            </p>
            <p>
              Chaque pièce de notre sélection est rigoureusement audité. Un «Grade A+» chez nous représente une intégrité visuelle et fonctionnelle clinique. Une transparence totale sur la santé énergétique et un refus catégorique des assemblages falsifiés. L'excellence n'est pas une option, c'est notre signature.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 bg-neutral-100 dark:bg-black px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            <div className="flex flex-col space-y-6 md:border-r border-black/5 dark:border-white/5 md:pr-8">
              <ShieldCheck size={28} className="text-black dark:text-white" strokeWidth={1} />
              <h3 className="font-serif text-2xl text-black dark:text-white">Transparence Radicale</h3>
              <p className="font-sans text-sm text-neutral-500 leading-relaxed">
                 Oubliez les vices cachés. Notre diagnostic en 45 points est partagé avec vous. Le grade que vous voyez est la réalité que vous tenez.
              </p>
            </div>
            
            <div className="flex flex-col space-y-6 md:border-r border-black/5 dark:border-white/5 md:px-8">
              <Award size={28} className="text-black dark:text-white" strokeWidth={1} />
              <h3 className="font-serif text-2xl text-black dark:text-white">Sélection Premium</h3>
              <p className="font-sans text-sm text-neutral-500 leading-relaxed">
                Notre circuit d'approvisionnement exclusif nous permet d'isoler uniquement les terminaux répondant aux standards les plus exigeants de la conservation.
              </p>
            </div>

            <div className="flex flex-col space-y-6 md:pl-8">
              <HeartHandshake size={28} className="text-black dark:text-white" strokeWidth={1} />
              <h3 className="font-serif text-2xl text-black dark:text-white">Service Conciergerie</h3>
              <p className="font-sans text-sm text-neutral-500 leading-relaxed">
                Au-delà de la vente, nous bâtissons une relation. Notre équipe est joignable à tout moment, garantissant un accompagnement post-achat irréprochable.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
