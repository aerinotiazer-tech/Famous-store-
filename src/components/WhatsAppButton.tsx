import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useSettings } from '../services/settings';

export default function WhatsAppButton() {
  const { settings } = useSettings();
  const cleanNumber = (settings.whatsappNumber || '+22799368634').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanNumber}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] hover:bg-[#1EBE5A] rounded-full flex items-center justify-center text-white shadow-xl z-50 transition-colors duration-200"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={28} />
    </motion.a>
  );
}
