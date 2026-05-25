import { Link } from 'react-router';
import { useSettings } from '../services/settings';

export default function Footer() {
  const { settings } = useSettings();
  const cleanNumber = (settings.whatsappNumber || '+22799368634').replace(/[^0-9]/g, '');

  return (
    <footer className="bg-ivory dark:bg-black border-t border-black/5 dark:border-white/5 pt-32 pb-16 transition-colors">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-8 mb-32">
          
          <div className="md:col-span-6 space-y-6">
            <Link to="/" className="inline-block group">
              <span className="font-sans tracking-[0.2em] font-medium text-sm text-black dark:text-white uppercase">
                Famous Store
              </span>
            </Link>
            <p className="text-neutral-500 font-sans text-sm md:text-base max-w-sm font-light leading-relaxed">
              La destination de référence pour l'acquisition d'appareils Apple d'exception.
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-sans text-xs tracking-widest uppercase text-neutral-400 mb-6 font-medium">Navigation</h3>
            <ul className="space-y-4">
              <li><Link to="/store" className="font-sans text-sm text-black dark:text-white hover:text-luxury-accent transition-colors">La Collection</Link></li>
              <li><Link to="/about" className="font-sans text-sm text-black dark:text-white hover:text-luxury-accent transition-colors">L'Héritage</Link></li>
              <li><Link to="/faq" className="font-sans text-sm text-black dark:text-white hover:text-luxury-accent transition-colors">Assistance Privée</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-sans text-xs tracking-widest uppercase text-neutral-400 mb-6 font-medium">Contact</h3>
            <ul className="space-y-4">
              <li className="font-sans text-sm text-neutral-500">
                Niamey, Niger
              </li>
              <li>
                <a href={`https://wa.me/${cleanNumber}`} className="font-sans text-sm text-black dark:text-white hover:text-luxury-accent transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-luxury-accent block" /> Connecter
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-sans text-xs text-neutral-400 tracking-wide">
            &copy; {new Date().getFullYear()} Famous Store.
          </p>
          <div className="flex gap-6">
            <Link to="/admin/login" className="font-sans text-xs text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
              Portail
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
