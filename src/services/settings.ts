import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface AppSettings {
  whatsappNumber: string;
}

const DEFAULT_SETTINGS: AppSettings = {
  whatsappNumber: '+22799368634',
};

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'general'), (docSnap) => {
      if (docSnap.exists()) {
        setSettings({ ...DEFAULT_SETTINGS, ...docSnap.data() });
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const updateSettings = async (newSettings: Partial<AppSettings>) => {
    try {
      await setDoc(doc(db, 'settings', 'general'), { ...settings, ...newSettings }, { merge: true });
    } catch (error) {
      console.error('Failed to update settings', error);
      throw error;
    }
  };

  return { settings, loading, updateSettings };
}
