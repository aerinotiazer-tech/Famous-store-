import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { Users, Trash2, Plus, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../../contexts/AuthContext';

interface AdminUser {
  id: string;
  email: string;
  createdAt: string;
}

export default function UsersPage() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { user } = useAuth();
  // Master admin who can manage everything
  const isMaster = user?.email?.toLowerCase() === 'aerinotiazer@gmail.com';

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'admins'));
      const adminList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as AdminUser[];
      setAdmins(adminList);
    } catch (err) {
      console.error("Error fetching admins:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !isMaster) return;
    
    setIsAdding(true);
    setError('');
    setSuccess('');
    
    try {
      // Create a doc in admins with a random ID
      const newDocRef = doc(collection(db, 'admins'));
      await setDoc(newDocRef, {
        email: newEmail.toLowerCase(),
        createdAt: new Date().toISOString()
      });
      setSuccess('Administrateur ajouté avec succès.');
      setNewEmail('');
      fetchAdmins();
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'ajout.');
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id: string, email: string) => {
    if (!isMaster) return;
    if (email === 'aerinotiazer@gmail.com') {
      setError('Impossible de supprimer l\'administrateur principal.');
      return;
    }
    if (confirm(`Êtes-vous sûr de vouloir retirer les droits d'administration à ${email} ?`)) {
      try {
        await deleteDoc(doc(db, 'admins', id));
        fetchAdmins();
      } catch (err: any) {
        setError(err.message || 'Erreur lors de la suppression.');
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
          <Users size={24} className="text-primary-blue" />
          Administrateurs
        </h1>
      </div>
      
      {error && <div className="bg-red-500/10 text-red-500 border border-red-500/20 p-4 rounded-xl">{error}</div>}
      {success && <div className="bg-green-500/10 text-green-500 border border-green-500/20 p-4 rounded-xl">{success}</div>}

      {!isMaster && (
        <div className="bg-primary-blue/10 text-primary-blue border border-primary-blue/20 p-4 rounded-xl flex items-center gap-3">
          <ShieldAlert size={20} />
          <p className="text-sm">Seul l'administrateur principal (Propriétaire) peut ajouter ou supprimer d'autres administrateurs.</p>
        </div>
      )}

      {isMaster && (
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
          <h2 className="text-lg font-medium text-white mb-4">Ajouter un administrateur</h2>
          <form onSubmit={handleAddAdmin} className="flex gap-4">
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Adresse email du nouvel administrateur"
              className="flex-1 bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
              required
            />
            <button
              type="submit"
              disabled={isAdding}
              className="px-6 py-2.5 bg-primary-blue hover:bg-primary-blue-hover text-white rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <Plus size={18} />
              {isAdding ? 'Ajout...' : 'Ajouter'}
            </button>
          </form>
        </div>
      )}

      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-neutral-500">Chargement...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="px-6 py-4 text-sm font-medium text-neutral-400">Email</th>
                <th className="px-6 py-4 text-sm font-medium text-neutral-400">Date d'ajout</th>
                <th className="px-6 py-4 text-sm font-medium text-neutral-400">Rôle</th>
                {isMaster && <th className="px-6 py-4 text-right text-sm font-medium text-neutral-400">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="border-b border-neutral-800 last:border-0 hover:bg-neutral-800/50 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">{admin.email}</td>
                  <td className="px-6 py-4 text-neutral-400 text-sm">
                    {new Date(admin.createdAt).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4">
                    {admin.email === 'aerinotiazer@gmail.com' ? (
                      <span className="px-2 py-1 bg-primary-blue/20 text-primary-blue text-xs font-semibold rounded-md">
                        Propriétaire
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-neutral-800 text-neutral-300 text-xs font-medium rounded-md">
                        Admin
                      </span>
                    )}
                  </td>
                  {isMaster && (
                    <td className="px-6 py-4 text-right">
                      {admin.email !== 'aerinotiazer@gmail.com' && (
                        <button
                          onClick={() => handleDelete(admin.id, admin.email)}
                          className="text-neutral-500 hover:text-red-500 transition-colors p-2"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
