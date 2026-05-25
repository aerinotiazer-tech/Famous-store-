import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

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
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'settings/general');
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const updateSettings = async (newSettings: Partial<AppSettings>) => {
    try {
      await setDoc(doc(db, 'settings', 'general'), { ...settings, ...newSettings }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'settings/general');
    }
  };

  return { settings, loading, updateSettings };
}
