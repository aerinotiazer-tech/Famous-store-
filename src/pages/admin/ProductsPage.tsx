import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Edit, Package } from 'lucide-react';
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
    <div className="space-y-8 text-neutral-200 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">Produits</h1>
          <p className="text-neutral-500 text-sm">Gérez le catalogue de votre boutique.</p>
        </div>
        <button 
           onClick={openNew}
           className="w-full sm:w-auto bg-primary-blue hover:bg-primary-blue-hover text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={18} /> Ajouter un Produit
        </button>
      </div>

      {loading ? (
         <div className="py-12 text-center text-neutral-500 flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-neutral-800 border-t-primary-blue rounded-full animate-spin"></div>
            Chargement...
         </div>
      ) : products.length === 0 ? (
         <div className="py-16 px-4 text-center text-neutral-400 border border-neutral-800 rounded-3xl bg-neutral-900/50 border-dashed flex flex-col items-center">
            <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mb-4">
               <Package size={24} className="text-neutral-500" />
            </div>
            <p className="font-medium text-white text-lg mb-1">Aucun produit trouvé</p>
            <p className="text-sm">Cliquez sur "Ajouter un Produit" pour créer votre premier article.</p>
         </div>
      ) : (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden w-full">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-neutral-950 border-b border-neutral-800 text-neutral-400">
                <tr>
                  <th className="px-6 py-4 font-medium text-xs font-semibold uppercase tracking-wider">Produit</th>
                  <th className="px-6 py-4 font-medium text-xs font-semibold uppercase tracking-wider">Prix</th>
                  <th className="px-6 py-4 font-medium text-xs font-semibold uppercase tracking-wider">État</th>
                  <th className="px-6 py-4 font-medium text-xs font-semibold uppercase tracking-wider">Catégorie</th>
                  <th className="px-6 py-4 font-medium text-xs font-semibold uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.imageUrl ? (
                          <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-lg bg-neutral-800 object-cover border border-neutral-700" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-neutral-800 border border-neutral-700" />
                        )}
                        <div>
                          <p className="font-semibold text-white">{product.name}</p>
                          <p className="text-neutral-500 flex items-center gap-1.5 mt-0.5">
                             <span className="bg-neutral-800 px-1.5 py-0.5 text-[10px] rounded text-neutral-300 font-medium">{product.storage}</span>
                             <span>•</span>
                             <span>{product.batteryHealth}% BH</span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-white">{Number(product.price).toLocaleString()} FCFA</td>
                    <td className="px-6 py-4">
                      <span className="bg-primary-blue/10 text-primary-blue px-2 py-1 rounded text-xs font-bold border border-primary-blue/20">
                        Grade {product.condition}
                      </span>
                    </td>
                    <td className="px-6 py-4 capitalize text-neutral-400 font-medium">
                      {product.category || 'iphone'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => { setCurrentProduct(product); setIsEditing(true); }} className="text-neutral-400 hover:text-white p-2 transition-colors">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="text-neutral-500 hover:text-red-500 p-2 ml-1 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isEditing && currentProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-2xl p-6 sm:p-8 my-8 relative"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              {currentProduct.id ? 'Modifier le Produit' : 'Ajouter un Produit'}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-neutral-400 block mb-1.5">Nom du produit</label>
                  <input type="text" value={currentProduct.name || ''} onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})} className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neutral-600 transition-colors" placeholder="ex: iPhone 13 Pro Max" required />
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-400 block mb-1.5">Prix (FCFA)</label>
                  <input type="number" value={currentProduct.price || ''} onChange={e => setCurrentProduct({...currentProduct, price: Number(e.target.value)})} className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neutral-600 transition-colors" placeholder="ex: 450000" required />
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-400 block mb-1.5">Catégorie</label>
                  <select value={currentProduct.category || 'iphone'} onChange={e => setCurrentProduct({...currentProduct, category: e.target.value as any})} className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neutral-600 transition-colors appearance-none cursor-pointer">
                    <option value="iphone">iPhone</option>
                    <option value="android">Android</option>
                    <option value="ipad">iPad</option>
                    <option value="macbook">MacBook</option>
                    <option value="accessory">Accessoire</option>
                    <option value="featured">Populaire (Featured)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-400 block mb-1.5">État</label>
                  <select value={currentProduct.condition || 'A'} onChange={e => setCurrentProduct({...currentProduct, condition: e.target.value})} className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neutral-600 transition-colors appearance-none cursor-pointer">
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-400 block mb-1.5">Santé Batterie (%)</label>
                  <input type="number" value={currentProduct.batteryHealth || ''} onChange={e => setCurrentProduct({...currentProduct, batteryHealth: Number(e.target.value)})} className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neutral-600 transition-colors" placeholder="ex: 100" required />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-neutral-400 block mb-1.5">Stockage</label>
                  <input type="text" value={currentProduct.storage || ''} onChange={e => setCurrentProduct({...currentProduct, storage: e.target.value})} className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neutral-600 transition-colors" placeholder="ex: 128GB" required />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-neutral-400 block mb-1.5">Image du produit</label>
                  <div className="flex flex-col gap-3">
                    <input type="url" value={currentProduct.imageUrl || ''} onChange={e => setCurrentProduct({...currentProduct, imageUrl: e.target.value})} className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neutral-600 transition-colors" placeholder="URL de l'image (https://...)" required />
                    
                    {/* Add a hint for future file upload or URL usage */}
                    <p className="text-xs text-neutral-500">
                       Collez une URL d'image valide pour ce produit. (L'upload direct Firebase Storage est configuré en backend).
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-neutral-800 mt-8">
                <button type="button" onClick={() => setIsEditing(false)} className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-medium text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 transition-colors text-center cursor-pointer">Annuler</button>
                <button type="submit" className="w-full sm:w-auto bg-primary-blue hover:bg-primary-blue-hover text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors text-center cursor-pointer">Enregistrer</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
