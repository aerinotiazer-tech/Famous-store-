import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { motion } from 'motion/react';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  
  if (isAdmin || (user && user.email?.toLowerCase() === 'aerinotiazer@gmail.com')) {
    navigate('/admin/dashboard', { replace: true });
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      if (email.toLowerCase() === 'aerinotiazer@gmail.com') {
         await setDoc(doc(db, 'admins', userCredential.user.uid), {
             email: userCredential.user.email,
             createdAt: new Date().toISOString()
         });
      }
      
      const adminDoc = await getDoc(doc(db, 'admins', userCredential.user.uid));
      if (!adminDoc.exists()) {
         auth.signOut();
         setError('Accès Refusé. Vous n\'êtes pas un admin.');
      } else {
         navigate('/admin/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Échec de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8"
      >
         <h1 className="text-2xl font-semibold text-white mb-6">Connexion Admin</h1>
         {error && <p className="bg-red-500/10 text-red-500 text-sm p-3 rounded-lg border border-red-500/20 mb-4">{error}</p>}
         <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-neutral-400 mb-1.5 block">Email</label>
              <input 
                 type="email" 
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 required
                 className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
                 placeholder="admin@famousstore.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-400 mb-1.5 block">Mot de passe</label>
              <input 
                 type="password" 
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required
                 className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
                 placeholder="••••••••"
              />
            </div>
            <button 
               type="submit"
               disabled={loading}
               className="w-full bg-white text-black font-medium py-3 rounded-xl hover:bg-neutral-200 transition-colors disabled:opacity-50 mt-4"
            >
               {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
         </form>
      </motion.div>
    </div>
  );
}
