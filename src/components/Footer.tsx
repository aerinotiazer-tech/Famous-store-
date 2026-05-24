import { Link } from 'react-router';
import { Smartphone } from 'lucide-react';
import { useSettings } from '../services/settings';

export default function Footer() {
  const { settings } = useSettings();
  const cleanNumber = (settings.whatsappNumber || '+22799368634').replace(/[^0-9]/g, '');

  return (
    <footer className="bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-900 py-12 md:py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="bg-primary-blue p-1.5 rounded-lg text-white">
                <Smartphone size={20} />
              </div>
              <span className="font-semibold text-lg tracking-tight text-neutral-900 dark:text-white">
                Famous Store
              </span>
            </Link>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-sm">
              Appareils Apple d'occasion certifiés premium à Niamey. Produits originaux, qualité garantie et service de confiance.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">Liens Rapides</h3>
            <ul className="space-y-3">
              <li><Link to="/store" className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Boutique</Link></li>
              <li><Link to="/about" className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">À Propos</Link></li>
              <li><Link to="/faq" className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="text-sm text-neutral-500 dark:text-neutral-400">
                Niamey, Niger
              </li>
              <li>
                <a href={`https://wa.me/${cleanNumber}`} className="text-sm text-[#25D366] hover:text-[#1EBE5A] font-medium transition-colors">
                  WhatsApp: {settings.whatsappNumber || '+227 99 36 86 34'}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-neutral-100 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-400 dark:text-neutral-600">
            &copy; {new Date().getFullYear()} Famous Store. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
