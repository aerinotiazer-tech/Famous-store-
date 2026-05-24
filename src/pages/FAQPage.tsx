import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Are your phones original?",
    answer: "Yes, absolutely. We only sell 100% original, authentic Apple devices. We never sell phones that have been repaired with third-party components or mixed parts."
  },
  {
    question: "Do you offer a warranty?",
    answer: "We offer a 7-day technical testing warranty on all devices to ensure all core hardware components (cameras, Face ID, touch, speakers) are functioning exactly as advertised."
  },
  {
    question: "How do I make a purchase?",
    answer: "Purchasing is simple. Browse our store, find the phone you want, and click the 'Buy' card button. This will open a WhatsApp chat with us directly with the details of the phone. You can then arrange payment and pickup/delivery."
  },
  {
    question: "What does Grade A+ mean?",
    answer: "Grade A+ indicates the device is in pristine, like-new condition with virtually no signs of wear. Grade A indicates excellent condition with perhaps microscopic, unnoticable wear. Grade B means good condition with some visible signs of normal use."
  },
  {
    question: "Do phones come with accessories?",
    answer: "Unless specifically stated in the product description, our pre-owned devices are sold 'device only' to keep the price as low as possible. Authentic charging cables and adapters are sold separately."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full bg-neutral-50 dark:bg-black min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            Everything you need to know about our products and services.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={index} 
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:bg-neutral-50 dark:focus-visible:bg-neutral-800"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-neutral-900 dark:text-neutral-100 text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    size={20} 
                    className={`text-neutral-400 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-5 text-neutral-500 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-neutral-800 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
