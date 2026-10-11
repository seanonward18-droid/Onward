import React, { useState } from 'react';
import { 
  Sparkles, Search, CheckCircle2, Shield, 
  Award, Trophy, ExternalLink, ArrowRight, 
  Flame, Bot, Music, Video, DollarSign, Zap
} from 'lucide-react';
import { ALL_105_FEATURES, CATEGORIES, BENCHMARK_COMPARISON, FeatureItem } from '../types/features.ts';
import { soundEngine } from '../utils/audioSynth.ts';

interface MasterFeatureMatrixProps {
  onOpenOwnerCert: () => void;
  onNavigateToTab: (tab: string) => void;
}

export const MasterFeatureMatrix: React.FC<MasterFeatureMatrixProps> = ({
  onOpenOwnerCert,
  onNavigateToTab
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFeature, setSelectedFeature] = useState<FeatureItem | null>(null);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const filteredFeatures = ALL_105_FEATURES.filter((f) => {
    const matchesCategory = selectedCategory === 'all' || f.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      f.code.toLowerCase().includes(q) || 
      f.name.toLowerCase().includes(q) || 
      f.description.toLowerCase().includes(q) ||
      (f.badge && f.badge.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'q_ai': return <Bot className="w-3.5 h-3.5 text-cyan-400" />;
      case 'music_dna': return <Music className="w-3.5 h-3.5 text-pink-400" />;
      case 'reels_social': return <Video className="w-3.5 h-3.5 text-violet-400" />;
      case 'earnings': return <DollarSign className="w-3.5 h-3.5 text-emerald-400" />;
      case 'safety_tech': return <Shield className="w-3.5 h-3.5 text-blue-400" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'q_ai': return 'border-cyan-500/30 hover:border-cyan-500/60 bg-cyan-950/10';
      case 'music_dna': return 'border-pink-500/30 hover:border-pink-500/60 bg-pink-950/10';
      case 'reels_social': return 'border-violet-500/30 hover:border-violet-500/60 bg-violet-950/10';
      case 'earnings': return 'border-emerald-500/30 hover:border-emerald-500/60 bg-emerald-950/10';
      case 'safety_tech': return 'border-blue-500/30 hover:border-blue-500/60 bg-blue-950/10';
      default: return 'border-amber-500/30 hover:border-amber-500/60 bg-amber-950/10';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Hero Master Feature Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950/70 via-slate-900 to-indigo-950/80 border border-amber-500/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5" />
                105 COMBINED MASTER FEATURES
              </span>
              <span className="bg-slate-900 text-slate-300 text-xs px-2.5 py-1 rounded-full border border-slate-800">
                Owner: You — Harare ✕ Manchester
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-1 rounded-full border border-emerald-500/30 font-bold">
                Balance: $2,438.50 USD
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              FUTURECHAT Master Matrix
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              FR1–FR100 + Extra 5 Play Store specs combining Harare teen Q AI (95% match), Music DNA synth (98%), Reels 2.8M, creator monetization, and Spacetalk-grade child protection.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Compare Winner Button */}
            <button
              onClick={() => {
                soundEngine.playChime();
                setShowCompareModal(true);
              }}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all"
            >
              <Trophy className="w-4 h-4" />
              <span>Compare: 105 vs Spacetalk / FB / IG</span>
            </button>

            {/* Owner Certificate */}
            <button
              onClick={onOpenOwnerCert}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 text-xs font-bold transition-all"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Owner Deed (FR105)</span>
            </button>
          </div>
        </div>

        {/* Quick Highlights Counter */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span className="text-slate-300">FR1–15 Q AI (95%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-400"></span>
            <span className="text-slate-300">FR16–40 Music DNA (98%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-400"></span>
            <span className="text-slate-300">FR41–65 Reels (2.8M)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-slate-300">FR66–85 Earnings ($2,438.50)</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search FR1–FR105 by code, name, or keyword (e.g. EcoCash, ZESA, Jazz)..."
              className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div className="text-xs font-bold text-slate-400">
            Showing <span className="text-amber-400 font-black">{filteredFeatures.length}</span> of 105 Master Features
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  soundEngine.playChime();
                }}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Features Grid (105 items) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredFeatures.map((feat) => {
          return (
            <div
              key={feat.id}
              onClick={() => setSelectedFeature(feat)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between ${getCategoryColor(feat.category)}`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {getCategoryIcon(feat.category)}
                    <span className="font-mono font-black text-xs text-amber-400">
                      {feat.code}
                    </span>
                  </div>
                  {feat.badge && (
                    <span className="text-[10px] bg-slate-950/80 border border-slate-800 text-slate-300 font-bold px-2 py-0.5 rounded-full">
                      {feat.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-black text-white mt-2 group-hover:text-amber-300 transition-colors">
                  {feat.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              {feat.highlights && feat.highlights.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3 pt-2.5 border-t border-slate-800/60">
                  {feat.highlights.map((h, i) => (
                    <span key={i} className="text-[10px] bg-slate-950/60 text-slate-400 px-1.5 py-0.5 rounded">
                      • {h}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Feature Details Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedFeature(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm font-bold"
            >
              ✕
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-black px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                {selectedFeature.code}
              </span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Category: {selectedFeature.category.toUpperCase()}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-black text-white">{selectedFeature.name}</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {selectedFeature.description}
              </p>
            </div>

            {selectedFeature.highlights && (
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <span className="text-xs font-bold text-amber-400">Technical Highlights:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedFeature.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-950 p-2 rounded-xl border border-slate-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <button
                onClick={() => {
                  const cat = selectedFeature.category;
                  setSelectedFeature(null);
                  if (cat === 'q_ai') onNavigateToTab('q_ai');
                  else if (cat === 'music_dna') onNavigateToTab('music_dna');
                  else if (cat === 'reels_social') onNavigateToTab('reels_social');
                  else if (cat === 'earnings') onNavigateToTab('earnings');
                  else if (cat === 'safety_tech') onNavigateToTab('safety');
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-black text-xs shadow"
              >
                Launch This Feature Module ➔
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Comparison Benchmark Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 md:p-8 max-w-3xl w-full space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full">
                  OFFICIAL FEATURE.DART BENCHMARK
                </span>
                <h3 className="text-2xl font-black text-white mt-2">
                  FUTURECHAT (105) vs Spacetalk (3) vs Facebook (10) vs IG (8)
                </h3>
                <p className="text-xs text-emerald-400 font-extrabold mt-1">
                  🏆 UNDISPUTED WINNER: FUTURECHAT (Harare ✕ Manchester)
                </p>
              </div>
              <button
                onClick={() => setShowCompareModal(false)}
                className="text-slate-400 hover:text-white text-base font-bold"
              >
                ✕
              </button>
            </div>

            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
                <thead className="bg-slate-950 text-slate-400 font-extrabold text-[11px] uppercase">
                  <tr>
                    <th className="p-3">Platform Capability</th>
                    <th className="p-3 text-amber-300 bg-amber-500/10 font-black">FUTURECHAT (105)</th>
                    <th className="p-3">Spacetalk (3)</th>
                    <th className="p-3">Facebook (10)</th>
                    <th className="p-3">Instagram (8)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-900/60">
                  {BENCHMARK_COMPARISON.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-950/50">
                      <td className="p-3 font-bold text-slate-300">{row.metric}</td>
                      <td className="p-3 font-extrabold text-amber-300 bg-amber-500/10">
                        {row.futurechat}
                      </td>
                      <td className="p-3 text-slate-400">{row.spacetalk}</td>
                      <td className="p-3 text-slate-400">{row.facebook}</td>
                      <td className="p-3 text-slate-400">{row.instagram}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-slate-200 space-y-1">
              <span className="font-extrabold text-amber-300">Quote from FEATURE.dart compare():</span>
              <p className="italic font-mono text-[11px] text-amber-200">
                "FUTURECHAT FEATURE 105 vs Spacetalk 3 vs Facebook 10 vs IG 8 — Winner FUTURECHAT"
              </p>
            </div>

            <button
              onClick={() => setShowCompareModal(false)}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
            >
              Close Benchmark
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
