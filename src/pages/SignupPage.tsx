import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { motion } from 'motion/react';
import { ShoppingBag } from 'lucide-react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered.');
      } else {
        setError(err.message || 'Failed to create an account');
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
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white text-center mb-2">Create Account</h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-center mb-8">Join Famous Store today</p>
        
        {error && <p className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm p-3 rounded-lg border border-red-100 dark:border-red-500/20 mb-6 text-center font-medium">{error}</p>}
        
        <form onSubmit={handleSignup} className="space-y-4">
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
               minLength={6}
               className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-primary-blue transition-colors"
               placeholder="••••••••"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 block">Confirm Password</label>
            <input 
               type="password" 
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               required
               minLength={6}
               className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-primary-blue transition-colors"
               placeholder="••••••••"
            />
          </div>
          <button 
             type="submit"
             disabled={loading}
             className="w-full bg-primary-blue text-white font-medium py-3 rounded-xl hover:bg-primary-blue-hover transition-colors disabled:opacity-50 mt-6 shadow-lg shadow-primary-blue/20"
          >
             {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-blue font-medium hover:underline">
            Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
