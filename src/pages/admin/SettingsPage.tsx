import React, { useState, useEffect } from 'react';
import { useSettings } from '../../services/settings';
import { Settings, Phone } from 'lucide-react';

export default function SettingsPage() {
  const { settings, updateSettings, loading: settingsLoading } = useSettings();
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!settingsLoading) {
      setWhatsappNumber(settings.whatsappNumber || '');
    }
  }, [settings, settingsLoading]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage('');
    try {
      await updateSettings({ whatsappNumber });
      setMessage('Paramètres enregistrés avec succès.');
    } catch (err: any) {
      setMessage('Échec de l\'enregistrement des paramètres : ' + (err.message || 'Erreur rules'));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2 mb-1">
            <Settings size={28} className="text-primary-blue" />
            Paramètres
          </h1>
          <p className="text-neutral-500 text-sm">Gérez la configuration globale de la boutique.</p>
        </div>
      </div>
      
      <div className="bg-neutral-900 border border-neutral-800 p-6 sm:p-8 rounded-3xl max-w-2xl">
        <form onSubmit={handleSave} className="space-y-6">
          {message && (
            <div className={`p-4 rounded-xl text-sm font-medium ${message.includes('succès') ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
              {message}
            </div>
          )}
          
          <div>
             <label className="text-sm font-medium text-neutral-400 block mb-2">Numéro WhatsApp de l'Admin</label>
             <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <Phone size={18} className="text-neutral-500" />
               </div>
               <input 
                 type="text" 
                 className="w-full bg-black border border-neutral-800 rounded-xl pl-11 pr-4 py-3.5 text-white focus:border-primary-blue focus:outline-none placeholder-neutral-700 transition-colors" 
                 placeholder="ex: +227 90 00 00 00"
                 value={whatsappNumber}
                 onChange={(e) => setWhatsappNumber(e.target.value)}
                 disabled={settingsLoading}
               />
             </div>
             <p className="text-sm text-neutral-500 mt-2">Toutes les commandes et demandes seront envoyées sur ce numéro. Veillez à inclure l'indicatif du pays.</p>
          </div>
          
          <div className="pt-6 border-t border-neutral-800 flex justify-end">
             <button 
               type="submit" 
               disabled={isSaving || settingsLoading}
               className="w-full sm:w-auto bg-primary-blue hover:bg-primary-blue-hover text-white px-8 py-3 rounded-xl font-medium transition-colors disabled:opacity-50"
             >
                {isSaving ? 'Enregistrement...' : 'Enregistrer'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
