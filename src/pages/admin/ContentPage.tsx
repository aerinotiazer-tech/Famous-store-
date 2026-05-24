import React from 'react';
import { motion } from 'motion/react';
import { Edit3 } from 'lucide-react';

export default function ContentPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Content Management</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl flex flex-col justify-between items-start space-y-4">
           <div>
             <h3 className="text-lg font-medium text-white flex items-center gap-2"><Edit3 size={18}/> Home Page Elements</h3>
             <p className="text-neutral-500 text-sm mt-1">Update hero text, welcome messages, and banners.</p>
           </div>
           <button className="bg-white text-black px-4 py-2 rounded-xl text-sm font-medium hover:bg-neutral-200 transition-colors">
              Edit Home Page
           </button>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl flex flex-col justify-between items-start space-y-4">
           <div>
             <h3 className="text-lg font-medium text-white flex items-center gap-2"><Edit3 size={18}/> FAQ Editor</h3>
             <p className="text-neutral-500 text-sm mt-1">Manage frequently asked questions displayed to users.</p>
           </div>
           <button className="bg-white text-black px-4 py-2 rounded-xl text-sm font-medium hover:bg-neutral-200 transition-colors">
              Edit FAQs
           </button>
        </div>
      </div>
    </div>
  );
}
