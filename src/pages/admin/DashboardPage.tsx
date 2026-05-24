import { motion } from 'motion/react';
import { Package, TrendingUp, Users, Smartphone, Zap } from 'lucide-react';
import { Link } from 'react-router';

export default function DashboardPage() {
  const cards = [
    { title: "Produits en Stock", value: "--", description: "Mettre à jour l'inventaire", icon: Package, color: "text-blue-500", bg: "bg-blue-500/10", link: "/admin/products" },
    { title: "Administrateurs", value: "Actifs", description: "Gérer l'accès", icon: Users, color: "text-purple-500", bg: "bg-purple-500/10", link: "/admin/users" },
    { title: "Nouveautés", value: "Rapide", description: "Modifier le contenu", icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10", link: "/admin/content" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Tableau de Bord</h1>
          <p className="text-neutral-500">Bienvenue dans l'espace d'administration de Famous Store.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <Link key={idx} to={card.link}>
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 p-6 rounded-2xl transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                 <div className={`p-3 rounded-xl ${card.bg} ${card.color}`}>
                   <card.icon size={24} />
                 </div>
                 <TrendingUp size={18} className="text-neutral-600 group-hover:text-neutral-400 transition-colors" />
              </div>
              <div>
                 <p className="text-3xl font-bold text-white mb-1">{card.value}</p>
                 <p className="text-sm font-medium text-neutral-300">{card.title}</p>
                 <p className="text-xs text-neutral-500 mt-2">{card.description}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden p-6 sm:p-8">
         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
               <div className="w-16 h-16 bg-gradient-to-br from-primary-blue to-purple-600 rounded-2xl flex items-center justify-center shrink-0">
                  <Smartphone size={32} className="text-white" />
               </div>
               <div>
                  <h3 className="text-xl font-bold text-white mb-1">Gérer votre catalogue</h3>
                  <p className="text-neutral-400 max-w-sm">Ajoutez de nouveaux arrivages, ajustez les prix et mettez à jour l'état de votre stock en temps réel.</p>
               </div>
            </div>
            <Link to="/admin/products" className="bg-white text-black font-semibold px-6 py-3 rounded-xl hover:bg-neutral-200 transition-colors shrink-0 text-center w-full sm:w-auto">
               Aller aux produits
            </Link>
         </div>
      </div>
    </div>
  );
}
