import { motion } from 'motion/react';
import { Package } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl"
        >
          <div className="flex items-center gap-4">
             <div className="p-3 bg-neutral-800 rounded-xl text-neutral-400">
               <Package size={24} />
             </div>
             <div>
               <p className="text-sm text-neutral-500 font-medium">Manage Products</p>
               <p className="text-2xl font-semibold text-white">Store Inventory</p>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
