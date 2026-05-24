import { Link, useLocation } from 'react-router';
import { Package, LayoutDashboard, LogOut, Settings, MessageSquare, Edit3 } from 'lucide-react';
import { auth } from '../../lib/firebase';
import { useNavigate } from 'react-router';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { name: 'Tableau de bord', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Produits', path: '/admin/products', icon: Package },
    { name: 'Contenu', path: '/admin/content', icon: Edit3 },
    { name: 'Paramètres', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="w-64 bg-black border-r border-neutral-800 flex flex-col min-h-screen text-white">
      <div className="p-6">
        <Link to="/" className="text-xl font-semibold tracking-tight text-white hover:opacity-80 transition-opacity">
          Famous Store <span className="text-primary-blue">72</span>
        </Link>
        <p className="text-xs text-neutral-500 mt-1">Système Admin</p>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {links.map((link) => {
          const isActive = location.pathname.startsWith(link.path);
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary-blue/10 text-primary-blue font-semibold' 
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <link.icon size={18} />
              <span className="font-medium text-sm">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-neutral-800">
        <button 
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium"
        >
          <LogOut size={18} />
          Se déconnecter
        </button>
      </div>
    </div>
  );
}
