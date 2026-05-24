import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { motion } from 'motion/react';
import { ShoppingBag } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect back to where they came from, or home
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err: any) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password.');
      } else {
        setError(err.message || 'Failed to login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black pt-24 pb-12 px-4 flex items-center justify-center transition-colors">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 shadow-xl shadow-neutral-200/50 dark:shadow-none"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-primary-blue/10 text-primary-blue p-3 rounded-xl">
             <ShoppingBag size={28} />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white text-center mb-2">Welcome Back</h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-center mb-8">Sign in to your Famous Store account</p>
        
        {error && <p className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm p-3 rounded-lg border border-red-100 dark:border-red-500/20 mb-6 text-center font-medium">{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 block">Email Address</label>
            <input 
               type="email" 
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
               className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-primary-blue transition-colors"
               placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 block">Password</label>
            <input 
               type="password" 
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
               className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-primary-blue transition-colors"
               placeholder="••••••••"
            />
          </div>
          <button 
             type="submit"
             disabled={loading}
             className="w-full bg-primary-blue text-white font-medium py-3 rounded-xl hover:bg-primary-blue-hover transition-colors disabled:opacity-50 mt-6 shadow-lg shadow-primary-blue/20"
          >
             {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary-blue font-medium hover:underline">
            Create account
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
