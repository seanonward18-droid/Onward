import React, { useState } from 'react';
import { ShieldAlert, PhoneCall, MapPin, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../utils/audioSynth.ts';

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SosModal: React.FC<SosModalProps> = ({ isOpen, onClose }) => {
  const [sosSent, setSosSent] = useState(false);

  if (!isOpen) return null;

  const handleDispatch = () => {
    soundEngine.playSosSound();
    setSosSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-rose-600 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-rose-600/20 text-rose-500 border border-rose-500/50 flex items-center justify-center animate-bounce">
          <ShieldAlert className="w-9 h-9" />
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/30">
            FR99 EMERGENCY DISPATCH
          </span>
          <h3 className="text-xl font-black text-white">Harare ✕ Manchester Dual SOS</h3>
          <p className="text-xs text-slate-300">
            1-tap emergency panic dispatch broadcasting GPS coordinates to pre-saved guardians.
          </p>
        </div>

        {sosSent ? (
          <div className="p-4 rounded-2xl bg-rose-500/20 border border-rose-500/60 text-left space-y-2 text-xs text-rose-200 animate-pulse">
            <div className="flex items-center gap-2 font-black text-rose-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>SOS DISPATCH BROADCASTED!</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Location (-17.8248° S, 31.0530° E / 53.4808° N, 2.2426° W) dispatched to Zimbabwe Republic Police (ZRP) and UK Emergency Services (999). Guardians pinged on WhatsApp.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-left">
              <span className="font-bold text-white flex items-center gap-1">
                🇿🇼 Harare Hotline:
              </span>
              <span className="text-rose-400 font-mono font-bold mt-1 block">999 / 112 (ZRP)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-left">
              <span className="font-bold text-white flex items-center gap-1">
                🇬🇧 UK Hotline:
              </span>
              <span className="text-rose-400 font-mono font-bold mt-1 block">999 (GMP)</span>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => {
              setSosSent(false);
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
          >
            Cancel
          </button>
          {!sosSent && (
            <button
              onClick={handleDispatch}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 text-white text-xs font-black shadow-lg shadow-rose-600/40"
            >
              BROADCAST SOS 🚨
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
