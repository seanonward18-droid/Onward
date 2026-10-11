import React from 'react';
import { 
  Bot, Music, Video, DollarSign, Shield, Sparkles, 
  WifiOff, Zap, Sun, Moon, Globe, Award, ShieldAlert
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  language: 'shona' | 'english';
  setLanguage: (lang: 'shona' | 'english') => void;
  isZesaOffline: boolean;
  setIsZesaOffline: (val: boolean) => void;
  earningsBalance: number;
  onOpenOwnerCert: () => void;
  onOpenSosModal: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  isDarkMode,
  setIsDarkMode,
  language,
  setLanguage,
  isZesaOffline,
  setIsZesaOffline,
  earningsBalance,
  onOpenOwnerCert,
  onOpenSosModal
}) => {
  const tabs = [
    { id: 'features', label: language === 'shona' ? '105 Features' : '105 Master Features', icon: Sparkles, badge: '105' },
    { id: 'q_ai', label: 'Q AI 95%', icon: Bot, badge: '95%' },
    { id: 'music_dna', label: 'Music DNA', icon: Music, badge: '98%' },
    { id: 'reels_social', label: 'Reels 2.8M', icon: Video, badge: 'LIVE' },
    { id: 'earnings', label: `$${earningsBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, icon: DollarSign, badge: 'EARN', highlight: true },
    { id: 'safety', label: 'Safety & Spacetalk', icon: Shield, badge: 'SAFE' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80 transition-colors">
      {/* Top Banner: Harare x Manchester Diaspora Bridge & Status */}
      <div className="bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-indigo-500/15 border-b border-slate-800/50 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium text-slate-300">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-amber-400 font-semibold tracking-wide">FUTURECHAT</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300 flex items-center gap-1">
              🇿🇼 Harare <span className="text-amber-400">✕</span> 🇬🇧 Manchester
            </span>
            <span className="hidden md:inline text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700/60 text-[11px]">
              FR1–FR105 + Q AI 95% + Music DNA 98%
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* ZESA Load Shedding Offline Mode Toggle */}
            <button
              onClick={() => setIsZesaOffline(!isZesaOffline)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                isZesaOffline
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
              title="FR15 / FR97: Offline Mode for ZESA power cuts"
            >
              {isZesaOffline ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-slate-950" />
                  <span>ZESA Offline ON</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>ZESA Grid Normal</span>
                </>
              )}
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'shona' ? 'english' : 'shona')}
              className="flex items-center gap-1 px-2 py-1 rounded bg-slate-900 text-slate-300 hover:text-white border border-slate-800 text-[11px] transition-colors"
              title="FR104: Language Switch Shona/English"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language === 'shona' ? 'ChiShona' : 'English'}</span>
            </button>

            {/* Dark / Light Mode Switcher */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1.5 rounded bg-slate-900 text-slate-300 hover:text-white border border-slate-800 text-[11px] transition-colors"
              title="FR102 / FR103: Dark Mode / Light Mode"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-indigo-300" />}
            </button>

            {/* Owner Certificate */}
            <button
              onClick={onOpenOwnerCert}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-bold text-[11px] shadow hover:brightness-110 transition-all"
              title="FR105: Owner Certificate YOU"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Owner: YOU</span>
            </button>

            {/* Emergency SOS Button */}
            <button
              onClick={onOpenSosModal}
              className="flex items-center gap-1 px-2 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] transition-all shadow-sm shadow-rose-600/30"
              title="FR99: SOS Button"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>SOS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('features')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-rose-500 to-violet-600 p-[2px] shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-transparent bg-clip-text bg-gradient-to-tr from-amber-300 to-rose-400 text-lg">
                FC
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-tight text-base text-white">FUTURECHAT</span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded">
                  105 MASTER
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Harare ✕ Manchester Super-App</p>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? tab.highlight 
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive
                        ? 'bg-slate-950 text-white'
                        : tab.highlight
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Balance Indicator on Header */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('earnings')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all text-left"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-emerald-400/80 font-medium">Earnings Dashboard</div>
              <div className="text-xs font-extrabold text-emerald-300 tracking-tight">$2,438.50</div>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Scroll Tab Bar */}
      <div className="lg:hidden flex items-center gap-1 px-3 py-1.5 overflow-x-auto no-scrollbar border-t border-slate-800/60 bg-slate-950">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-300 bg-slate-900/60 border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
