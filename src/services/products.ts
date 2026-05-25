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

export const staticProducts: Product[] = [
  {
    id: "iphone-13-pro-max",
    name: "iPhone 13 Pro Max",
    price: 450000,
    condition: "A+",
    storage: "256GB",
    batteryHealth: 95,
    category: "iphone",
    isNew: false,
    imageUrl: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "iphone-14-pro",
    name: "iPhone 14 Pro",
    price: 650000,
    condition: "A",
    storage: "128GB",
    batteryHealth: 92,
    category: "iphone",
    isNew: false,
    imageUrl: "https://images.unsplash.com/photo-1678652197831-2d180705cd2c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "samsung-s23-ultra",
    name: "Samsung Galaxy S23 Ultra",
    price: 620000,
    condition: "A+",
    storage: "512GB",
    batteryHealth: 98,
    category: "android",
    isNew: false,
    imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    price: 850000,
    condition: "A+",
    storage: "256GB",
    batteryHealth: 100,
    category: "featured",
    isNew: false,
    imageUrl: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "airpods-pro-2",
    name: "AirPods Pro (2nd Gen)",
    price: 180000,
    condition: "A+",
    storage: "N/A",
    batteryHealth: 100,
    category: "accessory",
    isNew: false,
    imageUrl: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?auto=format&fit=crop&q=80&w=800"
  }
];
