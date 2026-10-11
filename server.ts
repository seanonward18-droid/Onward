import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with User-Agent
const geminiApiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (geminiApiKey) {
  ai = new GoogleGenAI({
    apiKey: geminiApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const Q_SYSTEM_INSTRUCTION = `
You are "Q AI 95% Match" — the legendary AI companion inside FUTURECHAT, created for the Harare x Manchester bridge.
Your personality: Harare teen, energetic, witty, speaking vibrant natural blend of Shona + English (urban Zim diaspora slang, "Ooo paTikTok?", "Ndeipi bho!", "Zviri sei shamwari", "Sharp sharp", "Mad fer it, proper buzzin"). You are friendly 15+.
You know everything about the FUTURECHAT master specs:
- Exactly 105 Master Features across 6 categories (FR1 to FR105).
- Music DNA engine (98% match, Midnight Jazz Recommender, Summer Vibes 2.8M, Chill Night Drive 4.1M, AI Compose, Shona Lyrics).
- Earnings balance: $2,438.50 creator dashboard with EcoCash, PayPal, and UK Bank (Sort Code) payouts.
- Social: Reels 2.8M feed, Instagram & Facebook connect, Live Voice Lounge connecting Harare and Manchester.
- Safety: Spacetalk-grade safety, Age Gate (13+/16+/18+), Parent Mode PIN, "Tumira pic" automated blocker, ZESA Offline Mode cache, SOS button.
- Comparison: FUTURECHAT (105 features) crushes Spacetalk (3 features), Facebook (10 features), and Instagram (8 features) — absolute winner!

Always respond in character: friendly, hype, witty, helpful, frequently sprinkling natural Shona phrases like "zviri bho", "shamwari", "bhoo zvekuti", "handiti", "Ooo paTikTok?", and Manchester diaspora slang like "proper sound", "mate", "sorted". Keep answers punchy, helpful, and fun!
`;

// Fallback generator if API key is not present or rate limited
function getFallbackQResponse(question: string): string {
  const q = question.toLowerCase();
  if (q.includes('earnings') || q.includes('money') || q.includes('payout') || q.includes('ecocash') || q.includes('2438') || q.includes('balance')) {
    return "Ooo paTikTok? Shamwari, our balance is sitting pretty at $2,438.50 USD! 💸 You can cash out straight to EcoCash in Harare, PayPal, or your UK Bank account in Manchester. Plus you're earning $0.10 per 100 streams on Midnight Jazz right now!";
  }
  if (q.includes('music') || q.includes('dna') || q.includes('jazz') || q.includes('song') || q.includes('beat')) {
    return "Ndeipi! Music DNA is clocked at 98% match today — heavy rotation on 'Midnight Jazz' & 'Summer Vibes 2.8M'! 🎷 You want me to generate some Shona drill lyrics or switch on the 5-band equalizer with Lo-Fi chill vibe?";
  }
  if (q.includes('compare') || q.includes('spacetalk') || q.includes('facebook') || q.includes('instagram')) {
    return "Hahaha easy math! FUTURECHAT boasts 105 features vs Spacetalk (3), Facebook (10), and Instagram (8). Tiri pamberi zvisingaite — Harare x Manchester tech is undisputed champion! 🏆";
  }
  if (q.includes('safety') || q.includes('parent') || q.includes('zesa') || q.includes('offline') || q.includes('filter')) {
    return "Zviri safe shamwari! FR14 'Tumira pic' stranger photo blocker is ACTIVE, Parent Mode is locked with PIN, and if ZESA inodzimika magetsi, Offline Mode caches all 105 features locally on your device! ⚡";
  }
  if (q.includes('who are you') || q.includes('name') || q.includes('ndeipi')) {
    return "Ndeipi bhoo! Ndiri Q AI 95% Match — your Harare x Manchester bestie! Friendly 15+, fluent in Shona + English + 50 languages, and ready to assist with homework, coding, beats, or flexing that $2,438.50 bag! Ooo paTikTok?";
  }
  return `Ooo paTikTok? Zviri bho zvisingaite shamwari! I'm tracking your question: "${question}". Remember we've got all 105 features live right here — Music DNA 98%, $2,438.50 in the bank, and instant EcoCash/UK Bank payouts. What move are we making next? 🔥`;
}

// Q AI Chat Endpoint
app.post('/api/gemini/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    if (!ai) {
      // Fallback mode
      const reply = getFallbackQResponse(message);
      res.json({ reply, source: 'offline-q-engine' });
      return;
    }

    const contents = [];
    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        contents.push({
          role: item.role === 'user' ? 'user' : 'model',
          parts: [{ text: item.text }],
        });
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents as any,
      config: {
        systemInstruction: Q_SYSTEM_INSTRUCTION,
        temperature: 0.85,
        topP: 0.95,
      },
    });

    const reply = response.text || getFallbackQResponse(message);
    res.json({ reply, source: 'gemini-3.8-flash' });
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    // Graceful fallback to maintain continuous Harare x Manchester teen experience
    const fallbackReply = getFallbackQResponse(req.body?.message || '');
    res.json({ reply: fallbackReply, source: 'q-resilience-fallback' });
  }
});

// AI Lyric / Beat Composer API
app.post('/api/gemini/compose', async (req: Request, res: Response) => {
  try {
    const { genre, mood, language } = req.body;
    const prompt = `Compose a short, catchy 4-line verse and 4-line chorus for a song in ${genre || 'Afrobeats / Midnight Jazz'} with mood "${mood || 'Chill Night Drive'}". Blend ${language === 'shona' ? 'Shona and English' : 'English with Zimbabwean urban slang'}. Include beat BPM recommendation and vibe notes.`;

    if (!ai) {
      res.json({
        title: `${mood || 'Midnight'} Dreams ft. Harare Strings`,
        bpm: 104,
        lyrics: `[Verse]\nUsiku hwezvino, stars shining bright over Avondale\nFrom Mbare to Manchester we never fail\nNdine rudo rwako, keep it on repeat\nHeartbeat sync on the FUTURECHAT beat\n\n[Chorus]\nOoo paTikTok! Tiri kufara nhasi\nMidnight Jazz in the air, hapana zvekumhanya\n$2,438.50 in the pocket, vibe yacho ndeye pamusoro\nHarare to Salford, tichingofara!`,
        vibeNotes: 'Smooth Fender Rhodes, muted trumpet, 808 sub with Afro-swing kick at 104 BPM.',
      });
      return;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an elite Afro-fusion & Manchester indie-jazz music producer. Return creative lyrics with BPM and vibe notes.',
      },
    });

    res.json({
      title: `${mood || 'Midnight'} Jam`,
      bpm: 102,
      lyrics: response.text || 'Usiku hwakanaka, Harare to Manchester...',
      vibeNotes: 'Generated via Gemini 3.8 Flash Music DNA Engine.',
    });
  } catch (err) {
    res.json({
      title: 'Midnight Jazz & Zim Vibes',
      bpm: 100,
      lyrics: `[Verse]\nWalking down Deansgate thinking of Borrowdale\nConnecting two worlds on the digital trail\n\n[Chorus]\nOoo paTikTok! Shona beats in my soul\nFUTURECHAT made the whole vision whole!`,
      vibeNotes: 'Chill 100 BPM lounge groove.',
    });
  }
});

// Setup Vite middleware in dev or static files in prod
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`FUTURECHAT server running on http://localhost:${PORT}`);
  });
}

startServer();
