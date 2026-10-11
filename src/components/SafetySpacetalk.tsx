import React, { useState } from 'react';
import { 
  Shield, Lock, EyeOff, AlertTriangle, PhoneCall, 
  CheckCircle2, XCircle, Zap, ShieldAlert, Cpu, 
  Flame, Key, HeartPulse, UserCheck
} from 'lucide-react';
import { soundEngine } from '../utils/audioSynth.ts';

interface SafetySpacetalkProps {
  isZesaOffline: boolean;
  setIsZesaOffline: (val: boolean) => void;
  onTriggerSos: () => void;
}

export const SafetySpacetalk: React.FC<SafetySpacetalkProps> = ({
  isZesaOffline,
  setIsZesaOffline,
  onTriggerSos
}) => {
  const [ageTier, setAgeTier] = useState<'13+' | '16+' | '18+'>('16+');
  const [isParentModeActive, setIsParentModeActive] = useState(false);
  const [parentPin, setParentPin] = useState('1234');
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);

  // Stranger pic block test state
  const [picBlockTestActive, setPicBlockTestActive] = useState(true);
  const [simulatedPicBlocked, setSimulatedPicBlocked] = useState(false);

  const handleToggleParentMode = () => {
    if (isParentModeActive) {
      setShowPinModal(true);
    } else {
      setIsParentModeActive(true);
      soundEngine.playChime();
    }
  };

  const handleUnlockParentMode = () => {
    if (enteredPin === parentPin) {
      setIsParentModeActive(false);
      setShowPinModal(false);
      setEnteredPin('');
      setPinError(false);
      soundEngine.playChime();
    } else {
      setPinError(true);
      soundEngine.playSosSound();
    }
  };

  const testStrangerPicBlock = () => {
    soundEngine.playSosSound();
    setSimulatedPicBlocked(true);
    setTimeout(() => {
      setSimulatedPicBlocked(false);
    }, 4000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Top Safety Banner & Spacetalk Benchmark */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950/80 via-slate-900 to-slate-950 border border-blue-500/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              FR86–FR100 SAFETY & TECH MATRIX
            </span>
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black px-2.5 py-1 rounded-full">
              FUTURECHAT (105) ✕ SPACETALK (3)
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Next-Gen Teen & Family Protection Architecture
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Spacetalk safety standards elevated to 105 features: age-tiered content gating, guardian PIN controls, automated "Tumira pic" stranger blockers, and Zimbabwe ZESA power-cut offline resilience.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* Age Tier Selector (FR86) */}
            <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 px-2">FR86 Age Gate:</span>
              {(['13+', '16+', '18+'] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => {
                    setAgeTier(tier);
                    soundEngine.playChime();
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                    ageTier === tier
                      ? 'bg-blue-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>

            {/* Parent Mode Toggle (FR87) */}
            <button
              onClick={handleToggleParentMode}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all border ${
                isParentModeActive
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-blue-400'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isParentModeActive ? 'Parent Mode LOCKED (FR87)' : 'Enable Parent Mode'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Safety Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: FR88 No Stranger Pics Block ("Tumira Pic" Shield) */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                <EyeOff className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white">FR88 & FR14 No Stranger Pics Block</h4>
                <p className="text-[11px] text-slate-400">Harare x UK Automated "Tumira pic" shield</p>
              </div>
            </div>
            <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-bold border border-rose-500/40">
              Active Guard
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Neural computer vision and text analysis immediately block and quarantine image requests from accounts outside verified friend circles. If someone requests "Tumira pic shamwari", the chat is instantly quarantined.
          </p>

          {simulatedPicBlocked && (
            <div className="p-3.5 rounded-xl bg-rose-500/20 border border-rose-500 text-rose-200 text-xs font-bold space-y-1 animate-pulse">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>⚠️ [FR14/FR88 SHIELD TRIGGERED]: UNVERIFIED PHOTO EXCHANGE BLOCKED!</span>
              </div>
              <div className="text-[11px] text-rose-300 font-normal">
                Stranger photo request quarantined. Guardian notification pinged. Zero media leaked.
              </div>
            </div>
          )}

          <button
            onClick={testStrangerPicBlock}
            className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-rose-950/60 text-rose-300 border border-rose-500/30 hover:border-rose-500 text-xs font-bold transition-all"
          >
            Simulate "Tumira Pic" Block Attack (Test Shield)
          </button>
        </div>

        {/* Card 2: FR97 & FR15 Offline Mode for ZESA Power Cuts */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white">FR15 & FR97 Offline Mode for ZESA</h4>
                <p className="text-[11px] text-slate-400">Harare load-shedding resilient edge database</p>
              </div>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${
              isZesaOffline
                ? 'bg-amber-500 text-slate-950 border-amber-400'
                : 'bg-slate-800 text-slate-300 border-slate-700'
            }`}>
              {isZesaOffline ? '⚡ ZESA Cut ON' : 'Grid Connected'}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Engineered specifically for Zimbabwean power outages. Automatically falls back to device-side IndexedDB caching for Q AI responses, local synthesizer audio playback, and offline balance ledger.
          </p>

          <button
            onClick={() => {
              soundEngine.playChime();
              setIsZesaOffline(!isZesaOffline);
            }}
            className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
              isZesaOffline
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-950 text-amber-300 border border-amber-500/40 hover:bg-amber-500/10'
            }`}
          >
            {isZesaOffline ? 'Restore Normal Electricity (Grid Active)' : 'Toggle ZESA Blackout Simulation Mode (FR97)'}
          </button>
        </div>

        {/* Card 3: FR99 Emergency SOS Button (Harare ✕ UK) */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center font-bold">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white">FR99 Dual Emergency SOS Hotline</h4>
                <p className="text-[11px] text-slate-400">Simultaneous Harare 999 & Manchester 999 dispatch</p>
              </div>
            </div>
            <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-bold border border-rose-500/40">
              Immediate GPS
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            One-touch panic dispatch broadcasting GPS location coordinates and active alert status to designated family guardians across Zimbabwe and Great Britain.
          </p>

          <button
            onClick={onTriggerSos}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-xs shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>TRIGGER EMERGENCY SOS DISPATCH (FR99)</span>
          </button>
        </div>

        {/* Card 4: FR90 Harm Detector & FR91 Privacy Shield */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white">FR90 Harm Detector & FR91 Privacy Shield</h4>
                <p className="text-[11px] text-slate-400">Zero third-party tracking • Emotional wellness care</p>
              </div>
            </div>
            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-bold border border-cyan-500/40">
              Zero Telemetry
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Predictive sentiment monitoring offering warm de-escalation prompts. Strictly zero advertiser tracking pixels, zero external cookies, and complete user encryption sovereignty.
          </p>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Harare Crisis: +263 242 703370</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>UK Childline: 0800 1111</span>
            </div>
          </div>
        </div>
      </div>

      {/* Parent Mode Unlock PIN Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-xs w-full space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Key className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-black text-white">Enter Parent Mode PIN</h4>
            <p className="text-xs text-slate-400">Enter your 4-digit guardian PIN to disable restrictions (Default: 1234)</p>

            <input
              type="password"
              maxLength={4}
              value={enteredPin}
              onChange={(e) => setEnteredPin(e.target.value)}
              placeholder="••••"
              className="w-full text-center text-xl tracking-widest bg-slate-950 border border-slate-800 rounded-xl py-2.5 text-white font-mono"
            />

            {pinError && (
              <p className="text-xs text-rose-400 font-bold">Incorrect PIN code! Try 1234.</p>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => setShowPinModal(false)}
                className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleUnlockParentMode}
                className="flex-1 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-black"
              >
                Unlock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
