import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Quelle est la garantie de provenance ?",
    answer: "Nous ne travaillons qu'avec un circuit d'approvisionnement extrêmement limité et vérifié. Chaque terminaux est un produit 100% original, n'ayant jamais subi de remplacement par des composants tiers ou non authentiques. La traçabilité est totale."
  },
  {
    question: "Offrez-vous une garantie de fonctionnement ?",
    answer: "L'excellence implique la sérénité. Nous offrons une garantie technique incluse de 6 mois sur l'intégralité du matériel (carte mère, écran, capteurs biométriques). En cas de défaillance non liée à l'usure, le terminal est réparé ou remplacé."
  },
  {
    question: "Comment se déroule le processus d'acquisition ?",
    answer: "L'expérience d'achat est fluide. Sélectionnez votre pièce, ajoutez-la à votre sélection, et un conseiller privé prendra en charge votre dossier via WhatsApp pour organiser la remise en main propre sécurisée ou la livraison selon vos convenances."
  },
  {
    question: "Que certifie précisément le Grade A+ ?",
    answer: "Le Grade A+ est la plus haute distinction de l'occasion. Il certifie une intégrité cosmétique absolue (aucune micro-rayure visible à l'œil nu) et un fonctionnement clinique. Le Grade A tolère de microscopiques marques d'usure sur les tranches en titane ou aluminium."
  },
  {
    question: "Le packaging d'origine est-il fourni ?",
    answer: "Dans une démarche d'optimisation tarifaire stricte, les grades d'occasion sont fournis nus, seuls. Néanmoins, pour les grades «Neufs scellés», le packaging d'origine intégral Apple est conservé intact sous blister."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full bg-ivory dark:bg-neutral-900 min-h-screen pt-32 pb-32 px-6 lg:px-12 transition-colors">
      <div className="max-w-3xl mx-auto space-y-16">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-6"
        >
          <span className="font-sans text-xs tracking-widest uppercase text-neutral-400 block">Sérénité & Confiance</span>
          <h1 className="font-serif text-4xl md:text-6xl text-black dark:text-white">
            Questions Fréquentes
          </h1>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                key={index} 
                className="border-b border-black/5 dark:border-white/5 last:border-0"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full py-8 flex items-center justify-between text-left group"
                  aria-expanded={isOpen}
                >
                  <span className={`font-serif text-xl md:text-2xl transition-colors ${isOpen ? 'text-black dark:text-white' : 'text-neutral-500 group-hover:text-black dark:group-hover:text-white'}`}>
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center flex-shrink-0 ml-4 group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors">
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-black dark:text-white"
                    >
                      {isOpen ? <Minus size={16} strokeWidth={1} /> : <Plus size={16} strokeWidth={1} />}
                    </motion.div>
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="pb-8 font-sans text-neutral-500 leading-relaxed pr-12">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
