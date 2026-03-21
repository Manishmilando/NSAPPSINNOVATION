import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const EventPopup = () => {
  const [showEventPopup, setShowEventPopup] = useState(true);

  return (
    <AnimatePresence>
      {showEventPopup && (
        <motion.div 
          id="bihar-diwas-popup"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300, delay: 1 }}
          className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-50 bg-gradient-to-br from-[#fef3c7] via-[#fcd34d] to-[#fef3c7] border-2 border-[#d97706] p-6 rounded-3xl shadow-[0_10px_40px_rgba(217,119,6,0.25)] max-w-[320px] md:max-w-sm overflow-hidden"
        >
          {/* Shine Effect */}
          <motion.div
            className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-20deg] pointer-events-none z-0"
            initial={{ left: '-100%' }}
            animate={{ left: '200%' }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut", delay: 1.5 }}
          />

          <div className="relative z-10">
            <button 
              onClick={() => setShowEventPopup(false)} 
              className="absolute -top-2 -right-2 text-amber-700 hover:text-amber-900 bg-amber-100/50 hover:bg-amber-200 rounded-full p-1 transition-colors"
            >
              <X className="w-5 h-5"/>
            </button>
            
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl drop-shadow-sm">🎉</span>
              <h3 className="text-xl font-black text-amber-900 drop-shadow-sm">
                Bihar Diwas 2026
              </h3>
            </div>
            
            <p className="text-sm text-amber-900/80 font-bold leading-relaxed mb-5">
              Join our interactive games and climb the leaderboard to win exciting prizes! Don't miss out.
            </p>
            
            <Link 
              to="/bihardiwas"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#b45309] hover:to-[#92400e] text-white py-3 rounded-xl text-sm font-bold shadow-lg shadow-amber-900/30 transition-all transform hover:-translate-y-0.5"
            >
              Explore Leaderboard <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventPopup;
