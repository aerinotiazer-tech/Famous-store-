import React from 'react';
import { motion } from 'motion/react';
import { Edit3, MessageCircleQuestion, Home } from 'lucide-react';

export default function ContentPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">Contenu</h1>
          <p className="text-neutral-500 text-sm">Gérez le contenu textuel de votre site web.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors p-6 rounded-3xl flex flex-col justify-between items-start space-y-6"
        >
           <div className="flex items-start gap-4">
             <div className="w-12 h-12 bg-primary-blue/10 rounded-2xl flex items-center justify-center shrink-0">
               <Home size={24} className="text-primary-blue" />
             </div>
             <div>
               <h3 className="text-xl font-semibold text-white">Page d'accueil</h3>
               <p className="text-neutral-500 text-sm mt-1">Mettez à jour le texte principal, les messages de bienvenue et les bannières.</p>
             </div>
           </div>
           <button className="w-full sm:w-auto bg-white text-black px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-neutral-200 transition-colors">
              Modifier l'accueil
           </button>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors p-6 rounded-3xl flex flex-col justify-between items-start space-y-6"
        >
           <div className="flex items-start gap-4">
             <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center shrink-0">
               <MessageCircleQuestion size={24} className="text-amber-500" />
             </div>
             <div>
               <h3 className="text-xl font-semibold text-white">Foire Aux Questions</h3>
               <p className="text-neutral-500 text-sm mt-1">Gérez les questions fréquemment posées affichées aux utilisateurs.</p>
             </div>
           </div>
           <button className="w-full sm:w-auto bg-white text-black px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-neutral-200 transition-colors">
              Modifier la FAQ
           </button>
        </motion.div>
      </div>

      <div className="mt-8 bg-neutral-900/50 border border-neutral-800 border-dashed rounded-3xl p-8 text-center text-neutral-400">
         <p>D'autres modules de contenu seront disponibles prochainement.</p>
      </div>
    </div>
  );
}
