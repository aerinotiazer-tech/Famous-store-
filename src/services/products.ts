import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Product {
  id: string;
  name: string;
  price: number;
  condition: string;
  storage: string;
  batteryHealth: number;
  imageUrl: string;
  category: 'iphone' | 'accessory' | 'ipad' | 'macbook';
  createdAt?: string;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prodData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(prodData);
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
    imageUrl: "https://images.unsplash.com/photo-1678652197831-2d180705cd2c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "iphone-12",
    name: "iPhone 12",
    price: 220000,
    condition: "B",
    storage: "64GB",
    batteryHealth: 88,
    category: "iphone",
    imageUrl: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    price: 850000,
    condition: "A+",
    storage: "256GB",
    batteryHealth: 100,
    category: "iphone",
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
    imageUrl: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?auto=format&fit=crop&q=80&w=800"
  }
];
