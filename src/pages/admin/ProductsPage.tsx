import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Edit } from 'lucide-react';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import type { Product } from '../../services/products';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prodData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(prodData);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteDoc(doc(db, 'products', id));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct) return;
    
    // basic validation
    if (!currentProduct.name || !currentProduct.price) return;

    try {
      if (currentProduct.id) {
        await updateDoc(doc(db, 'products', currentProduct.id), currentProduct as any);
      } else {
        const id = currentProduct.name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
        const newProd = {
           ...currentProduct,
           category: currentProduct.category || 'iphone',
           createdAt: new Date().toISOString()
        };
        await setDoc(doc(db, 'products', id), newProd);
      }
      setIsEditing(false);
      setCurrentProduct(null);
    } catch (e) {
      console.error(e);
      alert('Failed to save product');
    }
  };

  const openNew = () => {
    setCurrentProduct({
      name: '',
      price: 0,
      condition: 'A',
      storage: '128GB',
      batteryHealth: 100,
      category: 'iphone',
      imageUrl: ''
    });
    setIsEditing(true);
  };

  return (
    <div className="space-y-8 text-neutral-200">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Products Setup</h1>
        <button 
           onClick={openNew}
           className="bg-primary-blue hover:bg-primary-blue-hover text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      {loading ? (
         <div className="py-12 text-center text-neutral-500">Loading...</div>
      ) : products.length === 0 ? (
         <div className="py-12 text-center text-neutral-500 border border-neutral-800 rounded-2xl bg-neutral-900 border-dashed">
            No products found. Click "Add Product" to create one.
         </div>
      ) : (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-950 border-b border-neutral-800 text-neutral-400">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Condition</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-neutral-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded bg-neutral-800 object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded bg-neutral-800" />
                      )}
                      <div>
                        <p className="font-medium text-white">{product.name}</p>
                        <p className="text-neutral-500 text-xs">{product.storage} • {product.batteryHealth}% BH</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{Number(product.price).toLocaleString()} FCFA</td>
                  <td className="px-6 py-4">
                    <span className="bg-neutral-800 text-neutral-300 px-2 py-1 rounded text-xs font-medium border border-neutral-700">
                      Grade {product.condition}
                    </span>
                  </td>
                  <td className="px-6 py-4 capitalize text-neutral-400 font-medium">
                    {product.category || 'iphone'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => { setCurrentProduct(product); setIsEditing(true); }} className="text-neutral-400 hover:text-white p-2">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="text-neutral-400 hover:text-red-400 p-2 ml-2">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isEditing && currentProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-xl font-semibold text-white mb-6">
              {currentProduct.id ? 'Edit Product' : 'Add Product'}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-sm font-medium text-neutral-400 block mb-1.5">Name</label>
                  <input type="text" value={currentProduct.name || ''} onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})} className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-neutral-600" required />
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-400 block mb-1.5">Price (FCFA)</label>
                  <input type="number" value={currentProduct.price || ''} onChange={e => setCurrentProduct({...currentProduct, price: Number(e.target.value)})} className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-neutral-600" required />
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-400 block mb-1.5">Category</label>
                  <select value={currentProduct.category || 'iphone'} onChange={e => setCurrentProduct({...currentProduct, category: e.target.value as any})} className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-neutral-600">
                    <option value="iphone">iPhone</option>
                    <option value="ipad">iPad</option>
                    <option value="macbook">MacBook</option>
                    <option value="accessory">Accessory</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-400 block mb-1.5">Condition</label>
                  <select value={currentProduct.condition || 'A'} onChange={e => setCurrentProduct({...currentProduct, condition: e.target.value})} className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-neutral-600">
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-400 block mb-1.5">Battery Health %</label>
                  <input type="number" value={currentProduct.batteryHealth || ''} onChange={e => setCurrentProduct({...currentProduct, batteryHealth: Number(e.target.value)})} className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-neutral-600" required />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-neutral-400 block mb-1.5">Storage</label>
                  <input type="text" value={currentProduct.storage || ''} onChange={e => setCurrentProduct({...currentProduct, storage: e.target.value})} className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-neutral-600" placeholder="e.g. 128GB" required />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-neutral-400 block mb-1.5">Image URL</label>
                  <input type="url" value={currentProduct.imageUrl || ''} onChange={e => setCurrentProduct({...currentProduct, imageUrl: e.target.value})} className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-neutral-600" placeholder="https://..." required />
                </div>
              </div>
              <div className="flex gap-3 justify-end pt-4 border-t border-neutral-800 mt-6">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-200 transition-colors">Save Product</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
