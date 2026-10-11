import React, { useState } from 'react';
import { 
  DollarSign, ArrowUpRight, Smartphone, Building, 
  CreditCard, Sparkles, Download, CheckCircle2, 
  TrendingUp, Users, ShieldCheck, FileText, 
  Wallet, Award, Clock
} from 'lucide-react';
import { soundEngine } from '../utils/audioSynth.ts';

interface EarningsDashboardProps {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  onOpenOwnerCert: () => void;
}

export const EarningsDashboard: React.FC<EarningsDashboardProps> = ({
  balance,
  setBalance,
  onOpenOwnerCert
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'GBP' | 'ZiG'>('USD');
  const [activePayoutTab, setActivePayoutTab] = useState<'ecocash' | 'uk_bank' | 'paypal'>('ecocash');

  // EcoCash state
  const [ecoPhone, setEcoPhone] = useState('0772 198 402');
  const [ecoAmount, setEcoAmount] = useState('250.00');
  const [isProcessingEco, setIsProcessingEco] = useState(false);
  const [payoutSuccessMsg, setPayoutSuccessMsg] = useState<string | null>(null);

  // UK Bank state
  const [sortCode, setSortCode] = useState('01-02-03');
  const [accNumber, setAccNumber] = useState('82910482');
  const [bankName, setBankName] = useState('Barclays Manchester Deansgate');

  // Stream calculator state (FR75: 10c per 100 streams)
  const [calcStreams, setCalcStreams] = useState(2400000);

  // Transactions list (FR81)
  const [transactions, setTransactions] = useState([
    { id: 'TX-901', date: 'Today, 02:40 AM', desc: 'Midnight Jazz Stream Royalties (FR75)', amount: '+$340.00', status: 'Settled', method: 'Streaming 10c/100' },
    { id: 'TX-902', date: 'Yesterday', desc: 'Summer Vibes 2.8M Viral Bonus', amount: '+$280.00', status: 'Settled', method: 'Ad Share 50/50' },
    { id: 'TX-903', date: 'Oct 09, 2026', desc: 'EcoCash Mobile Payout (Harare)', amount: '-$150.00', status: 'Paid Out', method: 'EcoCash USD 077***' },
    { id: 'TX-904', date: 'Oct 07, 2026', desc: 'UK Bank Transfer (Manchester Sort Code)', amount: '-$500.00', status: 'Paid Out', method: 'Faster Payments GBP' },
    { id: 'TX-905', date: 'Oct 05, 2026', desc: 'Student Creator Grant Stipend (FR77)', amount: '+$450.00', status: 'Settled', method: 'Student Fund' },
    { id: 'TX-906', date: 'Oct 03, 2026', desc: 'Referral Rewards (94 Creators x $0.50)', amount: '+$47.00', status: 'Settled', method: 'Referral Wall' }
  ]);

  const currencyRates = {
    USD: { symbol: '$', rate: 1, label: 'USD (United States Dollar)' },
    GBP: { symbol: '£', rate: 0.77, label: 'GBP (British Pound / Manchester)' },
    ZiG: { symbol: 'ZiG ', rate: 26.8, label: 'ZiG (Zimbabwe Gold)' },
  };

  const currentRate = currencyRates[selectedCurrency];
  const formattedBalance = (balance * currentRate.rate).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleEcoCashWithdraw = () => {
    const amt = parseFloat(ecoAmount);
    if (isNaN(amt) || amt <= 0 || amt > balance) return;

    setIsProcessingEco(true);
    soundEngine.playChime();

    setTimeout(() => {
      soundEngine.playCashSound();
      setBalance(prev => Math.max(0, prev - amt));
      setTransactions(prev => [
        {
          id: `TX-${Date.now().toString().slice(-4)}`,
          date: 'Just now',
          desc: `EcoCash Cashout to ${ecoPhone}`,
          amount: `-$${amt.toFixed(2)}`,
          status: 'Paid Out',
          method: 'EcoCash Zim USD'
        },
        ...prev
      ]);
      setPayoutSuccessMsg(`Success! $${amt.toFixed(2)} sent to EcoCash account ${ecoPhone}. Ref: EC-${Math.floor(Math.random() * 899999 + 100000)}`);
      setIsProcessingEco(false);
    }, 1200);
  };

  const handleUkBankWithdraw = () => {
    const amt = 200.00;
    if (balance < amt) return;

    soundEngine.playCashSound();
    setBalance(prev => prev - amt);
    setTransactions(prev => [
      {
        id: `TX-${Date.now().toString().slice(-4)}`,
        date: 'Just now',
        desc: `UK Faster Payments to ${sortCode} / ${accNumber}`,
        amount: `-$${amt.toFixed(2)}`,
        status: 'Paid Out',
        method: 'UK Bank Transfer'
      },
      ...prev
    ]);
    setPayoutSuccessMsg(`Success! £${(amt * 0.77).toFixed(2)} disbursed to ${bankName} via UK Faster Payments.`);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Master Earnings Banner (FR66) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950/80 via-teal-950/70 to-slate-950 border border-emerald-500/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                FR66 MASTER EARNINGS DASHBOARD
              </span>
              <span className="bg-slate-900/80 text-slate-300 text-xs px-2.5 py-1 rounded-full border border-slate-800">
                Harare ✕ Manchester Payout Gateway
              </span>
              <span className="bg-cyan-500/20 text-cyan-300 text-xs px-2.5 py-1 rounded-full border border-cyan-500/30">
                FR76: Automatic Friday Payouts Active
              </span>
            </div>

            <div className="mt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Total Available Creator Balance
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  {currentRate.symbol}{formattedBalance}
                </h1>
                <span className="text-sm font-bold text-emerald-400 flex items-center">
                  <ArrowUpRight className="w-4 h-4 mr-0.5" />
                  +18.4% this week
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Verified stream royalties, 50/50 ad revenue, referral credits, and live lounge gifts.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Currency Switcher */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-1 flex items-center gap-1">
              {(['USD', 'GBP', 'ZiG'] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setSelectedCurrency(curr)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedCurrency === curr
                      ? 'bg-emerald-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>

            <button
              onClick={onOpenOwnerCert}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all"
              title="FR69: Creator NFT Certificate"
            >
              <Award className="w-4 h-4" />
              <span>Owner NFT Cert (FR69)</span>
            </button>
          </div>
        </div>

        {/* 4 Financial Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-[11px] text-slate-400 font-medium">FR75 Music Stream Royalties</div>
            <div className="text-lg font-black text-white mt-0.5">$1,840.00</div>
            <div className="text-[10px] text-emerald-400 font-bold">10c per 100 streams</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-[11px] text-slate-400 font-medium">FR68 Ad Revenue (50/50)</div>
            <div className="text-lg font-black text-white mt-0.5">$398.50</div>
            <div className="text-[10px] text-cyan-400 font-bold">50% Creator Split</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-[11px] text-slate-400 font-medium">FR73 Referral Rewards</div>
            <div className="text-lg font-black text-white mt-0.5">$120.00</div>
            <div className="text-[10px] text-amber-400 font-bold">240 creators @ $0.50</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-[11px] text-slate-400 font-medium">FR78 Gifts & Diamonds (16+)</div>
            <div className="text-lg font-black text-white mt-0.5">$80.00</div>
            <div className="text-[10px] text-pink-400 font-bold">Live Room Tipping</div>
          </div>
        </div>
      </div>

      {/* Success Notification Alert */}
      {payoutSuccessMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{payoutSuccessMsg}</span>
          </div>
          <button
            onClick={() => setPayoutSuccessMsg(null)}
            className="text-slate-400 hover:text-white text-xs font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Payout Channels Matrix (FR70 EcoCash, FR72 UK Bank, FR71 PayPal) */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Wallet className="w-5 h-5 text-emerald-400" />
              <span>Direct Multi-Channel Payout Gateway</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Instant mobile money in Zimbabwe or direct Faster Payments in Greater Manchester.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActivePayoutTab('ecocash')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activePayoutTab === 'ecocash'
                  ? 'bg-emerald-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>FR70 EcoCash (Zim)</span>
            </button>

            <button
              onClick={() => setActivePayoutTab('uk_bank')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activePayoutTab === 'uk_bank'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>FR72 UK Bank (MCR)</span>
            </button>

            <button
              onClick={() => setActivePayoutTab('paypal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activePayoutTab === 'paypal'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>FR71 PayPal</span>
            </button>
          </div>
        </div>

        {/* CHANNEL 1: EcoCash Zimbabwe (FR70) */}
        {activePayoutTab === 'ecocash' && (
          <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  🇿🇼
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">EcoCash Instant USD / ZiG Mobile Wallet</h4>
                  <p className="text-[11px] text-slate-400">Zero foreign exchange deductions • Econet Zimbabwe Network</p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded">
                Instant USSD Settlement
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300">EcoCash Phone Number (Harare)</label>
                <input
                  type="text"
                  value={ecoPhone}
                  onChange={(e) => setEcoPhone(e.target.value)}
                  placeholder="077x xxx xxx or 078x xxx xxx"
                  className="mt-1 w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Withdraw Amount (USD)</label>
                <div className="relative mt-1">
                  <span className="absolute left-3.5 top-2.5 text-xs text-slate-400 font-bold">$</span>
                  <input
                    type="number"
                    value={ecoAmount}
                    onChange={(e) => setEcoAmount(e.target.value)}
                    max={balance}
                    min="1"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-[11px] text-slate-400">
                Minimum withdrawal: $5.00 • Guardian approval verified for 18+ (FR80)
              </span>
              <button
                onClick={handleEcoCashWithdraw}
                disabled={isProcessingEco || balance < parseFloat(ecoAmount)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
              >
                {isProcessingEco ? 'Processing EcoCash...' : 'Disburse to EcoCash Wallet Now (FR70)'}
              </button>
            </div>
          </div>
        )}

        {/* CHANNEL 2: UK Bank Faster Payments (FR72) */}
        {activePayoutTab === 'uk_bank' && (
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                  🇬🇧
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">UK Bank Faster Payments (Manchester)</h4>
                  <p className="text-[11px] text-slate-400">Direct BACS / Faster Payments settlement in British Pounds (GBP)</p>
                </div>
              </div>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-bold px-2 py-0.5 rounded">
                Under 2hr Clearance
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300">Sort Code (6 Digits)</label>
                <input
                  type="text"
                  value={sortCode}
                  onChange={(e) => setSortCode(e.target.value)}
                  className="mt-1 w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Account Number (8 Digits)</label>
                <input
                  type="text"
                  value={accNumber}
                  onChange={(e) => setAccNumber(e.target.value)}
                  className="mt-1 w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Bank & Branch</label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="mt-1 w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-[11px] text-slate-400">
                Settles in £GBP at mid-market rate • Verified for UK diaspora creators
              </span>
              <button
                onClick={handleUkBankWithdraw}
                disabled={balance < 200}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs transition-all shadow"
              >
                Disburse £154.00 to UK Account (FR72)
              </button>
            </div>
          </div>
        )}

        {/* CHANNEL 3: PayPal Global (FR71) */}
        {activePayoutTab === 'paypal' && (
          <div className="p-5 rounded-2xl bg-slate-950 border border-blue-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  🌐
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">PayPal Global Electronic Settlement</h4>
                  <p className="text-[11px] text-slate-400">Instant payout to verified PayPal email address in 180+ countries</p>
                </div>
              </div>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded">
                Global Coverage
              </span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300">PayPal Email Address</label>
              <input
                type="email"
                defaultValue="creator@futurechat.zim"
                className="mt-1 w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  soundEngine.playCashSound();
                  setPayoutSuccessMsg("Success! PayPal transfer scheduled.");
                }}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-all shadow"
              >
                Disburse via PayPal (FR71)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Stream Royalty Calculator (FR75: 10c per 100 Streams) */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>FR75 Interactive Stream Calculator ($0.10 per 100 Streams)</span>
          </h3>
          <span className="text-[11px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
            3x Higher than Spotify / TikTok
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span>Calculated Streams: {calcStreams.toLocaleString()} plays</span>
            <span className="text-emerald-400 text-sm font-black">
              = ${((calcStreams / 100) * 0.10).toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
            </span>
          </div>
          <input
            type="range"
            min="10000"
            max="10000000"
            step="50000"
            value={calcStreams}
            onChange={(e) => setCalcStreams(parseInt(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Financial Ledger / Transaction History (FR81 & FR82 Tax Reports) */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>FR81 Transaction History & FR82 ZIMRA/HMRC Tax Reports</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Immutable ledger of royalties, EcoCash cashouts, and tax deductible deductions.
            </p>
          </div>

          <button
            onClick={() => soundEngine.playChime()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export ZIMRA / HMRC PDF (FR82)</span>
          </button>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider font-extrabold">
              <tr>
                <th className="py-2.5 px-3">Transaction ID</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Description</th>
                <th className="py-2.5 px-3">Method</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-950/40 transition-colors">
                  <td className="py-3 px-3 font-mono text-slate-400 font-bold">{tx.id}</td>
                  <td className="py-3 px-3 text-slate-300">{tx.date}</td>
                  <td className="py-3 px-3 font-bold text-white">{tx.desc}</td>
                  <td className="py-3 px-3 text-slate-400">{tx.method}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      tx.status === 'Paid Out'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className={`py-3 px-3 text-right font-black ${
                    tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-slate-200'
                  }`}>
                    {tx.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
