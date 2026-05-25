import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

export interface Product {
  id: string;
  name: string;
  price: number;
  condition: string;
  storage: string;
  batteryHealth: number;
  imageUrl: string;
  category: 'iphone' | 'accessory' | 'ipad' | 'macbook' | 'android' | 'featured';
  isNew: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prodData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || '',
          price: data.price || 0,
          condition: data.condition || 'A',
          storage: data.storage || '',
          batteryHealth: data.batteryHealth || 100,
          imageUrl: data.imageUrl || '',
          category: data.category || 'iphone',
          isNew: data.isNew ?? false,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt
        } as Product;
      });
      setProducts(prodData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'products');
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { products, loading };
}
