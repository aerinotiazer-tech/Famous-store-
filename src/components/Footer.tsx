import { Link } from 'react-router';
import { Smartphone } from 'lucide-react';
import { useSettings } from '../services/settings';

export default function Footer() {
  const { settings } = useSettings();
  const cleanNumber = (settings.whatsappNumber || '+22790000000').replace(/[^0-9]/g, '');

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
              Premium certified pre-owned Apple devices in Niamey. Original products, guaranteed quality, and trusted service.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/store" className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Store</Link></li>
              <li><Link to="/about" className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">About Us</Link></li>
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
                <a href={`https://wa.me/${cleanNumber}`} className="text-sm text-whatsapp-green hover:text-whatsapp-green-hover font-medium transition-colors">
                  WhatsApp: {settings.whatsappNumber || '+227 90 00 00 00'}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-neutral-100 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-400 dark:text-neutral-600">
            &copy; {new Date().getFullYear()} Famous Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
