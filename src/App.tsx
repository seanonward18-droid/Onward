import React, { useState } from 'react';
import { Navigation } from './components/Navigation.tsx';
import { MasterFeatureMatrix } from './components/MasterFeatureMatrix.tsx';
import { QAIAssistant } from './components/QAIAssistant.tsx';
import { MusicDNAPlayer } from './components/MusicDNAPlayer.tsx';
import { ReelsSocialFeed } from './components/ReelsSocialFeed.tsx';
import { EarningsDashboard } from './components/EarningsDashboard.tsx';
import { SafetySpacetalk } from './components/SafetySpacetalk.tsx';
import { OwnerCertificateModal } from './components/OwnerCertificateModal.tsx';
import { SosModal } from './components/SosModal.tsx';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('features');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [language, setLanguage] = useState<'shona' | 'english'>('shona');
  const [isZesaOffline, setIsZesaOffline] = useState<boolean>(false);
  const [earningsBalance, setEarningsBalance] = useState<number>(2438.50);
  const [isOwnerCertOpen, setIsOwnerCertOpen] = useState<boolean>(false);
  const [isSosOpen, setIsSosOpen] = useState<boolean>(false);

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors ${
      isDarkMode 
        ? 'bg-slate-950 text-slate-100' 
        : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Top App Header with Navigation & Global Controls */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        language={language}
        setLanguage={setLanguage}
        isZesaOffline={isZesaOffline}
        setIsZesaOffline={setIsZesaOffline}
        earningsBalance={earningsBalance}
        onOpenOwnerCert={() => setIsOwnerCertOpen(true)}
        onOpenSosModal={() => setIsSosOpen(true)}
      />

      {/* Main Dynamic View */}
      <main className="flex-1 py-6">
        {activeTab === 'features' && (
          <MasterFeatureMatrix
            onOpenOwnerCert={() => setIsOwnerCertOpen(true)}
            onNavigateToTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'q_ai' && (
          <QAIAssistant
            language={language}
            isZesaOffline={isZesaOffline}
            onNavigateToMusic={() => setActiveTab('music_dna')}
            onNavigateToEarnings={() => setActiveTab('earnings')}
          />
        )}

        {activeTab === 'music_dna' && (
          <MusicDNAPlayer />
        )}

        {activeTab === 'reels_social' && (
          <ReelsSocialFeed />
        )}

        {activeTab === 'earnings' && (
          <EarningsDashboard
            balance={earningsBalance}
            setBalance={setEarningsBalance}
            onOpenOwnerCert={() => setIsOwnerCertOpen(true)}
          />
        )}

        {activeTab === 'safety' && (
          <SafetySpacetalk
            isZesaOffline={isZesaOffline}
            setIsZesaOffline={setIsZesaOffline}
            onTriggerSos={() => setIsSosOpen(true)}
          />
        )}
      </main>

      {/* Global Modals */}
      <OwnerCertificateModal
        isOpen={isOwnerCertOpen}
        onClose={() => setIsOwnerCertOpen(false)}
        balance={earningsBalance}
      />

      <SosModal
        isOpen={isSosOpen}
        onClose={() => setIsSosOpen(false)}
      />

      {/* Global Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/90 py-6 px-4 mt-auto text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white tracking-wider">FUTURECHAT</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">
              🇿🇼 Harare (Borrowdale/Avondale) ✕ 🇬🇧 Manchester (Deansgate/Salford)
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <span className="text-amber-400 font-bold">FR1–FR105 Active</span>
            <span className="text-cyan-400 font-bold">Q AI 95% Match</span>
            <span className="text-pink-400 font-bold">Music DNA 98%</span>
            <span className="text-emerald-400 font-bold">$2,438.50 Creator Bag</span>
            <button
              onClick={() => setIsOwnerCertOpen(true)}
              className="text-amber-300 hover:underline font-bold"
            >
              Owner: YOU
            </button>
          </div>

          <div className="text-[11px] text-slate-500">
            Winner: FUTURECHAT (105) vs Spacetalk (3) vs FB (10) vs IG (8)
          </div>
        </div>
      </footer>
    </div>
  );
}
