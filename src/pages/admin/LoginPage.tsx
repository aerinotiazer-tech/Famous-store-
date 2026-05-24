import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
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
      const userEmail = userCredential.user.email?.toLowerCase();
      
      if (userEmail === 'aerinotiazer@gmail.com') {
         await setDoc(doc(db, 'admins', 'master'), {
             email: userEmail,
             createdAt: new Date().toISOString()
         });
         navigate('/admin/dashboard');
         return;
      }
      
      const adminQuery = query(collection(db, 'admins'), where('email', '==', userCredential.user.email));
      const adminDocs = await getDocs(adminQuery);
      
      if (adminDocs.empty) {
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

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const userEmail = userCredential.user.email?.toLowerCase();
      
      if (userEmail === 'aerinotiazer@gmail.com') {
         await setDoc(doc(db, 'admins', 'master'), {
             email: userEmail,
             createdAt: new Date().toISOString()
         });
         navigate('/admin/dashboard');
         return;
      }
      
      const adminQuery = query(collection(db, 'admins'), where('email', '==', userCredential.user.email));
      const adminDocs = await getDocs(adminQuery);
      if (adminDocs.empty) {
         auth.signOut();
         setError('Accès Refusé. Vous n\'êtes pas un admin.');
      } else {
         navigate('/admin/dashboard');
      }
    } catch (err: any) {
      if (err.code === 'auth/operation-not-allowed') {
        setError('L\'authentification Google n\'est pas activée. Veuillez l\'activer dans Firebase Console.');
      } else {
        setError(err.message || 'Échec de la connexion avec Google');
      }
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

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-neutral-900 text-neutral-500">Ou</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full mt-6 bg-transparent border border-neutral-800 text-white font-medium py-3 rounded-xl hover:bg-neutral-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuer avec Google
          </button>
        </div>
      </motion.div>
    </div>
  );
}
