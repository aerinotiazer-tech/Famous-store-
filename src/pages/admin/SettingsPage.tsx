import React, { useState, useEffect } from 'react';
import { useSettings } from '../../services/settings';

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
      setMessage('Settings saved successfully.');
    } catch (err) {
      setMessage('Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">System Settings</h1>
      </div>
      
      <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl max-w-2xl">
        <form onSubmit={handleSave} className="space-y-6">
          {message && (
            <div className={`p-3 rounded-xl text-sm font-medium ${message.includes('success') ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
              {message}
            </div>
          )}
          
          <div>
             <label className="text-sm font-medium text-neutral-400 block mb-1.5">WhatsApp Admin Number</label>
             <input 
               type="text" 
               className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-white focus:border-neutral-600 focus:outline-none placeholder-neutral-700" 
               placeholder="+227..."
               value={whatsappNumber}
               onChange={(e) => setWhatsappNumber(e.target.value)}
               disabled={settingsLoading}
             />
             <p className="text-xs text-neutral-500 mt-2">All cart checkouts and inquiries will be routed to this number (include country code like +227).</p>
          </div>
          <div className="pt-4 border-t border-neutral-800">
             <button 
               type="submit" 
               disabled={isSaving || settingsLoading}
               className="bg-primary-blue hover:bg-primary-blue-hover text-white px-6 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-50"
             >
                {isSaving ? 'Saving...' : 'Save Settings'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
