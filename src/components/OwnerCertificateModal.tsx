import React from 'react';
import { Award, ShieldCheck, Download, CheckCircle2, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audioSynth.ts';

interface OwnerCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
}

export const OwnerCertificateModal: React.FC<OwnerCertificateModalProps> = ({
  isOpen,
  onClose,
  balance
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    soundEngine.playCashSound();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative bg-slate-900 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 text-center overflow-hidden">
        {/* Ornate Gold Border Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-base font-bold"
        >
          ✕
        </button>

        {/* Certificate Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black uppercase tracking-widest">
            <Award className="w-4 h-4 text-amber-400" />
            <span>FR105 MASTER DEED OF OWNERSHIP</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-amber-200 tracking-tight">
            CERTIFICATE OF MASTER OWNERSHIP
          </h2>
          <p className="text-xs text-slate-400">
            Cryptographically Verified on the Harare ✕ Manchester Digital Registry
          </p>
        </div>

        {/* Deed Body */}
        <div className="p-6 rounded-2xl bg-slate-950/90 border border-amber-500/30 text-left space-y-4 font-mono text-xs text-slate-300">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-slate-400">OFFICIAL OWNER:</span>
            <span className="text-amber-400 font-extrabold text-sm">YOU — Harare ✕ Manchester</span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-slate-400">APPLET SYSTEM:</span>
            <span className="text-white font-bold">FUTURECHAT (All 100+ Combined)</span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-slate-400">FEATURE SPECIFICATION:</span>
            <span className="text-emerald-400 font-bold">FR1 — FR105 (105 Master Features Active)</span>
          </div>

          <div className="grid grid-cols-3 gap-2 py-2 border-b border-slate-800 text-center">
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400">Q AI SCORE</div>
              <div className="text-cyan-400 font-black text-sm">95% MATCH</div>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400">MUSIC DNA</div>
              <div className="text-pink-400 font-black text-sm">98% JAZZ</div>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400">CREATOR WALLET</div>
              <div className="text-emerald-400 font-black text-sm">${balance.toFixed(2)}</div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="text-slate-500">DEED HASH:</span>
            <span className="text-slate-400 font-mono">0xFC77_HARARE_MANCHESTER_105_WINNER</span>
          </div>
        </div>

        {/* Dual Seal Stamp */}
        <div className="flex items-center justify-around pt-2">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-amber-500/60 flex items-center justify-center bg-amber-500/10 text-xl font-black text-amber-300">
              🇿🇼
            </div>
            <span className="text-[10px] font-bold text-slate-400 mt-1">Harare Seal</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-indigo-500/60 flex items-center justify-center bg-indigo-500/10 text-xl font-black text-indigo-300">
              🇬🇧
            </div>
            <span className="text-[10px] font-bold text-slate-400 mt-1">Manchester Seal</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
          >
            Close Deed
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20"
          >
            <Download className="w-4 h-4" />
            <span>Print & Export Certificate (FR105)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
