import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Edit, Package, UploadCloud, Image, Trash, X, Check, Eye, HelpCircle, Star, Sparkles, Battery, RefreshCw } from 'lucide-react';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { type Product } from '../../services/products';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null);

  // File upload states
  const [dragActive, setDragActive] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
          storage: data.storage || '128GB',
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

  const handleDelete = async (id: string) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce produit de votre magasin ?')) {
      try {
        await deleteDoc(doc(db, 'products', id));
      } catch (e: any) {
        handleFirestoreError(e, OperationType.DELETE, `products/${id}`);
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct) return;
    
    // Basic verification
    if (!currentProduct.name || !currentProduct.price) {
      alert('Veuillez renseigner au moins le nom et le prix.');
      return;
    }

    const docId = currentProduct.id || 
      currentProduct.name.toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\-]/g, '') + '-' + Date.now();

    try {
      const now = new Date().toISOString();
      const isNewLocal = currentProduct.isNew ?? false;

      // Construct a valid payload matching exactly the 10-key validation constraints of firestore.rules
      const productPayload = {
        name: currentProduct.name.trim(),
        price: Number(currentProduct.price),
        category: currentProduct.category || 'iphone',
        condition: isNewLocal ? 'Neuf' : (currentProduct.condition || 'A+'),
        batteryHealth: isNewLocal ? 100 : Number(currentProduct.batteryHealth || 100),
        storage: currentProduct.storage?.trim() || '128GB',
        imageUrl: currentProduct.imageUrl || '',
        isNew: isNewLocal,
        createdAt: currentProduct.createdAt || now,
        updatedAt: now
      };

      await setDoc(doc(db, 'products', docId), productPayload);
      setIsEditing(false);
      setCurrentProduct(null);
    } catch (e: any) {
      console.error("Firestore Save Error:", e);
      handleFirestoreError(e, OperationType.WRITE, `products/${docId}`);
    }
  };

  const openNew = () => {
    setCurrentProduct({
      name: '',
      price: 0,
      condition: 'A+',
      storage: '128GB',
      batteryHealth: 100,
      category: 'iphone',
      isNew: false,
      imageUrl: ''
    });
    setIsEditing(true);
  };

  // Drag and drop events logic
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      await handleFileProcess(file);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      await handleFileProcess(file);
    }
  };

  const handleFileProcess = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert("Veuillez sélectionner un format d'image valide (PNG, JPG, JPEG, WEBP).");
      return;
    }
    setUploadLoading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setCurrentProduct(prev => prev ? { ...prev, imageUrl: reader.result as string } : null);
      setUploadLoading(false);
    };
    reader.onerror = () => {
      alert("Une erreur s'est produite lors de la conversion de l'image.");
      setUploadLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const triggerSelectFile = () => {
    fileInputRef.current?.click();
  };

  const categories = [
    { value: 'iphone', label: 'iPhone', icon: '📱' },
    { value: 'android', label: 'Android', icon: '🤖' },
    { value: 'ipad', label: 'iPad', icon: '📟' },
    { value: 'macbook', label: 'MacBook', icon: '💻' },
    { value: 'accessory', label: 'Accessoire', icon: '🎧' },
    { value: 'featured', label: 'Populaire', icon: '⭐' }
  ];

  const conditionGrades = [
    { value: 'A+', label: 'Comme neuf (A+)', desc: 'État irréprochable, sans rayure' },
    { value: 'A', label: 'Excellent état (A)', desc: 'Très propre, micro-fissure d\'utilisation invisibles' },
    { value: 'B', label: 'Très bon état (B)', desc: 'Légères rayures d\'usage ordinaire' },
    { value: 'C', label: 'Bon état (C)', desc: 'Marques esthétiques plus prononcées' }
  ];

  return (
    <div className="space-y-8 text-neutral-200 overflow-x-hidden">
      {/* Header section with responsive layout block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">Catalogue Produits</h1>
          <p className="text-neutral-500 text-sm">Créez, éditez et catégorisez les produits disponibles dans votre boutique.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button 
            onClick={openNew}
            id="admin_add_new_product_btn"
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer shadow-md"
          >
            <Plus size={18} /> Ajouter un Produit
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center text-neutral-500 flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-neutral-800 border-t-emerald-500 rounded-full animate-spin"></div>
          <span className="text-sm">Mise à jour du catalogue en cours...</span>
        </div>
      ) : products.length === 0 ? (
        <div className="py-16 px-4 text-center text-neutral-400 border border-neutral-800 rounded-3xl bg-neutral-900/50 border-dashed flex flex-col items-center">
          <div className="w-16 h-16 bg-neutral-800/80 rounded-full flex items-center justify-center mb-4 text-neutral-500">
            <Package size={24} />
          </div>
          <p className="font-bold text-white text-lg mb-1">Aucun produit en vitrine</p>
          <p className="text-sm text-neutral-500 max-w-md mx-auto mb-6">Votre base de données Firestore est vide. Veuillez ajouter un premier article en vitrine pour commencer.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={openNew}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus size={13} /> Créer le premier article
            </button>
          </div>
        </div>
      ) : (
        /* Styled robust responsive data layout */
        <div className="bg-neutral-900 border border-neutral-800/80 rounded-2xl overflow-hidden w-full shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-neutral-950 border-b border-neutral-800/80 text-neutral-400">
                <tr>
                  <th className="px-6 py-4.5 font-bold text-xs uppercase tracking-wider">Produit</th>
                  <th className="px-6 py-4.5 font-bold text-xs uppercase tracking-wider">Prix</th>
                  <th className="px-6 py-4.5 font-bold text-xs uppercase tracking-wider">État / Classification</th>
                  <th className="px-6 py-4.5 font-bold text-xs uppercase tracking-wider">Catégorie</th>
                  <th className="px-6 py-4.5 font-bold text-xs uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/50 bg-neutral-900/45">
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-neutral-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.imageUrl ? (
                          <div className="w-11 h-11 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center overflow-hidden p-1 flex-shrink-0">
                            <img src={product.imageUrl} alt={product.name} className="max-w-full max-h-full object-contain filter drop-shadow-sm" referrerPolicy="no-referrer" />
                          </div>
                        ) : (
                          <div className="w-11 h-11 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center text-neutral-600 flex-shrink-0">
                            <Image size={16} />
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-white text-sm">{product.name}</p>
                          <p className="text-neutral-500 text-[11px] flex items-center gap-1.5 mt-0.5 font-medium">
                            <span className="bg-neutral-800 text-neutral-300 px-1.5 py-0.5 rounded text-[9px] font-bold">{product.storage}</span>
                            <span>•</span>
                            <span className="flex items-center gap-0.5">
                              <Battery size={11} className="text-neutral-500" />
                              {product.batteryHealth}% Capacité
                            </span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-white text-sm">
                      {Number(product.price).toLocaleString()} FCFA
                    </td>
                    <td className="px-6 py-4">
                      {product.isNew ? (
                        <span className="bg-emerald-500/15 text-emerald-400 px-2.5 py-1 rounded-full text-[10px] font-black border border-emerald-500/25 tracking-wider uppercase">
                          Neuf
                        </span>
                      ) : (
                        <span className="bg-blue-500/15 text-blue-400 px-2.5 py-1 rounded-lg text-[10px] font-black border border-blue-500/25">
                          Grade {product.condition}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="capitalize text-xs font-semibold text-neutral-400 bg-neutral-800/60 px-2 py-1 rounded border border-neutral-800">
                        {product.category || 'iphone'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button 
                          onClick={() => { setCurrentProduct(product); setIsEditing(true); }} 
                          className="text-neutral-400 hover:text-white p-2 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                          title="Modifier"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)} 
                          className="text-neutral-500 hover:text-red-400 p-2 hover:bg-neutral-800 rounded-lg transition-all cursor-pointer"
                          title="Supprimer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Improved Product modal form containing sophisticated controls */}
      <AnimatePresence>
        {isEditing && currentProduct && (
          <div className="fixed inset-0 bg-neutral-950/85 backdrop-blur-md z-[60] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="bg-neutral-900 border border-neutral-800/80 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col my-auto"
            >
              {/* Modal header segment */}
              <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-white">
                    {currentProduct.id ? 'Éditer l\'appareil' : 'Ajouter un nouvel appareil'}
                  </h2>
                  <p className="text-neutral-500 text-xs mt-0.5">Configurez et enregistrez les caractéristiques et visuels produits.</p>
                </div>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="p-1 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable form */}
              <form onSubmit={handleSave} className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[75vh]">
                
                {/* CHOICE 1: Neuf vs Reconditionné */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">État Initial de l'appareil</label>
                  <div className="grid grid-cols-2 gap-3 bg-neutral-950 p-1.5 border border-neutral-800 rounded-2xl">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentProduct({
                          ...currentProduct,
                          isNew: false,
                          condition: 'A+',
                        });
                      }}
                      className={`py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                        !currentProduct.isNew
                          ? 'bg-neutral-800 text-white border border-neutral-700 shadow-md'
                          : 'text-neutral-500 hover:text-neutral-300'
                      }`}
                    >
                      <RefreshCw size={14} />
                      <span>Reconditionné (Grade)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentProduct({
                          ...currentProduct,
                          isNew: true,
                          condition: 'Neuf',
                          batteryHealth: 100
                        });
                      }}
                      className={`py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                        currentProduct.isNew
                          ? 'bg-emerald-600 border border-emerald-500 text-white shadow-md'
                          : 'text-neutral-500 hover:text-neutral-300'
                      }`}
                    >
                      <Sparkles size={14} />
                      <span>Neuf (Sous Blister)</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">Nom d'affichage</label>
                    <input 
                      type="text" 
                      value={currentProduct.name || ''} 
                      onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})} 
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neutral-750 focus:ring-1 focus:ring-neutral-700 transition-colors text-sm font-medium" 
                      placeholder="ex: iPhone 14 Pro" 
                      required 
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">Tarif de vente (FCFA)</label>
                    <input 
                      type="number" 
                      value={currentProduct.price || ''} 
                      onChange={e => setCurrentProduct({...currentProduct, price: Number(e.target.value)})} 
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neutral-750 focus:ring-1 focus:ring-neutral-700 transition-colors text-sm font-bold text-white" 
                      placeholder="ex: 550000" 
                      min="0"
                      required 
                    />
                  </div>

                  {/* Storage */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">Stockage stockage</label>
                    <input 
                      type="text" 
                      value={currentProduct.storage || ''} 
                      onChange={e => setCurrentProduct({...currentProduct, storage: e.target.value})} 
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neutral-750 focus:ring-1 focus:ring-neutral-700 transition-colors text-sm font-medium" 
                      placeholder="ex: 128GB, 256GB ou N/A" 
                      required 
                    />
                  </div>

                  {/* CHOICE 2: Catégorie visually represented */}
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-1">Choix de la Catégorie</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {categories.map((cat) => {
                        const isSelected = currentProduct.category === cat.value;
                        return (
                          <button
                            key={cat.value}
                            type="button"
                            onClick={() => setCurrentProduct({ ...currentProduct, category: cat.value as any })}
                            className={`p-3 rounded-xl border text-left flex items-center gap-2 transition-all ${
                              isSelected
                                ? 'bg-neutral-800 border-neutral-600 text-white'
                                : 'bg-neutral-950 hover:bg-neutral-850 border-neutral-800/80 text-neutral-400 hover:text-neutral-200'
                            }`}
                          >
                            <span className="text-lg">{cat.icon}</span>
                            <span className="text-xs font-bold">{cat.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Refurbished specific controls (Grades and Health status) */}
                  {!currentProduct.isNew && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3 border-t border-neutral-800/50"
                    >
                      {/* Dropdown Grades */}
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">Grade d'état reconditionné</label>
                        <select 
                          value={currentProduct.condition || 'A'} 
                          onChange={e => setCurrentProduct({...currentProduct, condition: e.target.value})} 
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neutral-750 transition-colors appearance-none cursor-pointer text-sm"
                        >
                          {conditionGrades.map(g => (
                            <option key={g.value} value={g.value}>{g.label}</option>
                          ))}
                        </select>
                        <p className="text-[10px] text-neutral-500 mt-1 leading-normal">
                          {conditionGrades.find(g => g.value === currentProduct.condition)?.desc || ''}
                        </p>
                      </div>

                      {/* Battery capacity */}
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">Santé Batterie (%)</label>
                          <span className="text-xs text-white font-bold bg-neutral-800 px-2 py-0.5 rounded-full">{currentProduct.batteryHealth || 85}%</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <input 
                            type="range" 
                            min="80" 
                            max="100" 
                            value={currentProduct.batteryHealth || 85} 
                            onChange={e => setCurrentProduct({...currentProduct, batteryHealth: Number(e.target.value)})} 
                            className="flex-1 accent-white bg-neutral-850 h-1.5 rounded-lg cursor-pointer"
                          />
                          <input
                            type="number"
                            min="50"
                            max="100"
                            value={currentProduct.batteryHealth || ''}
                            onChange={e => setCurrentProduct({...currentProduct, batteryHealth: Math.min(100, Math.max(0, Number(e.target.value)))})}
                            className="w-16 bg-neutral-950 border border-neutral-800 rounded-lg py-1 px-1.5 text-center text-xs text-white"
                          />
                        </div>
                        <p className="text-[10px] text-neutral-500 mt-1">Normalement supérieur à 80% pour livraison standard.</p>
                      </div>
                    </motion.div>
                  )}

                  {/* CHOICE 3: Drag & Drop Image Uploader (Zero mocks, directly persistent) */}
                  <div className="sm:col-span-2 space-y-3 pt-3 border-t border-neutral-800/50">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">Visuel du Produit</label>
                    
                    {/* Drag & Drop Main Zone */}
                    <div 
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={triggerSelectFile}
                      className={`relative border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer select-none transition-all ${
                        dragActive 
                          ? 'border-emerald-500 bg-emerald-500/10' 
                          : 'border-neutral-800 bg-neutral-950 hover:bg-neutral-950/70 hover:border-neutral-700'
                      }`}
                    >
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileSelect} 
                        className="hidden" 
                      />

                      {currentProduct.imageUrl ? (
                        /* Direct persistent image thumbnail preview zone inside drag zone */
                        <div className="space-y-4 w-full flex flex-col items-center relative z-10" onClick={(e) => e.stopPropagation()}>
                          <div className="w-28 h-28 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center overflow-hidden p-2 shadow-inner">
                            <img src={currentProduct.imageUrl} alt="Aperçu" className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-emerald-400 font-bold flex items-center justify-center gap-1">
                              <Check size={13} /> Visuel chargé avec succès
                            </p>
                            <p className="text-[10px] text-neutral-500">Glissez une autre image ou cliquez pour remplacer</p>
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => setCurrentProduct({...currentProduct, imageUrl: ''})}
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-lg border border-red-500/25 flex items-center gap-1.5"
                          >
                            <Trash size={12} /> Réinitialiser
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2.5">
                          <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-500">
                            {uploadLoading ? (
                              <svg className="animate-spin h-5 w-5 text-neutral-400" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                            ) : (
                              <UploadCloud size={20} />
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">Glissez-déposez l'image ici</p>
                            <p className="text-[10px] text-neutral-500 mt-1">ou cliquez pour choisir un fichier depuis votre disque</p>
                          </div>
                          <p className="text-[9px] text-neutral-600">Formats acceptés: PNG, JPG, JPEG jusqu'à 2.5Mo (Directement encodé)</p>
                        </div>
                      )}
                    </div>

                    {/* Alternative manual input for URL option */}
                    <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-850">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1">Option alternative</span>
                        <span className="text-[10px] text-neutral-600 bg-neutral-900 px-2 py-0.5 rounded">Lien externe</span>
                      </div>
                      <input 
                        type="url" 
                        value={currentProduct.imageUrl && !currentProduct.imageUrl.startsWith('data:') ? currentProduct.imageUrl : ''} 
                        onChange={e => setCurrentProduct({...currentProduct, imageUrl: e.target.value})} 
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-neutral-700 text-xs mt-1" 
                        placeholder="Insérer l'URL absolue de l'image (https://...)" 
                      />
                    </div>
                  </div>
                </div>

                {/* Form submit bar */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-neutral-800 mt-6">
                  <button 
                    type="button" 
                    onClick={() => setIsEditing(false)} 
                    className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-bold text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-750 transition-colors text-center cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit" 
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl text-xs font-black tracking-wide uppercase transition-colors text-center cursor-pointer shadow-md"
                  >
                    Enregistrer l'appareil
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
