import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Vos téléphones sont-ils d'origine ?",
    answer: "Oui, absolument. Nous ne vendons que des appareils Apple 100% originaux et authentiques. Nous ne vendons jamais de téléphones qui ont été réparés avec des composants tiers ou des pièces mélangées."
  },
  {
    question: "Offrez-vous une garantie ?",
    answer: "Nous offrons une garantie technique de test de 7 jours sur tous les appareils pour s'assurer que tous les composants matériels de base (caméras, Face ID, tactile, haut-parleurs) fonctionnent exactement comme annoncé."
  },
  {
    question: "Comment puis-je effectuer un achat ?",
    answer: "L'achat est simple. Parcourez notre boutique, trouvez le téléphone que vous voulez, et ajoutez le au panier. Une fois votre sélection faite, le passage en caisse vous redirigera sur une discussion WhatsApp avec nous pour finaliser la commande."
  },
  {
    question: "Que signifie le Grade A+ ?",
    answer: "Le Grade A+ indique que l'appareil est dans un état impeccable, comme neuf, avec pratiquement aucun signe d'usure. Le Grade A indique un excellent état avec peut-être une usure microscopique imperceptible. Le Grade B signifie un bon état avec quelques signes visibles d'utilisation normale."
  },
  {
    question: "Les téléphones sont-ils livrés avec des accessoires ?",
    answer: "Sauf mention expresse dans la description du produit, nos appareils d'occasion sont vendus 'appareil seul' pour maintenir le prix le plus bas possible. Les câbles de charge et adaptateurs authentiques sont vendus séparément."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full bg-neutral-50 dark:bg-black min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Foire Aux Questions
          </h1>
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            Tout ce que vous devez savoir sur nos produits et services.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={index} 
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:bg-neutral-50 dark:focus-visible:bg-neutral-800"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-neutral-900 dark:text-neutral-100 text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    size={20} 
                    className={`text-neutral-400 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-5 text-neutral-500 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-neutral-800 pt-4">
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
