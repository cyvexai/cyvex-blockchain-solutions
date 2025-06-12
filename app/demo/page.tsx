"use client";

import { useState, useEffect, useMemo, FormEvent } from "react";
import Header from "../../components/Header";
import Card from "../../components/Card";
import { Ubuntu } from "next/font/google";
import {
  User,
  BarChart2,
  Zap,
  PieChart,
} from "lucide-react";

 const DEMO_PORTFOLIO = [
   { token: "SOL", pct: "45%", value: "$4,500" },
   { token: "USDC", pct: "35%", value: "$3,500" },
   { token: "PMON", pct: "20%", value: "$2,000" },
 ];

const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["400", "700"] });

// --- Dummy data for wallets ---
const WALLET_PROFILES = [
  {
    id: "whale",
    name: "Whale Wallet",
    address: "Jq9…WHALE",
    score: 92,
    events: [
      { type: "buy", token: "SOL", amount: 1200, when: "2m ago" },
      { type: "sell", token: "USDC", amount: 500_000, when: "5m ago" },
    ],
  },
  {
    id: "smart",
    name: "Smart Money",
    address: "Smrt…MONEY",
    score: 87,
    events: [
      { type: "buy", token: "ROUTINE", amount: 3400, when: "1m ago" },
      { type: "sell", token: "FLOP", amount: 1200, when: "4m ago" },
    ],
  },
  {
    id: "influencer",
    name: "Influencer",
    address: "Infx…FLU",
    score: 78,
    events: [
      { type: "buy", token: "GROOK", amount: 2000, when: "30s ago" },
      { type: "sell", token: "MANGO", amount: 50_000, when: "3m ago" },
    ],
  },
];

// --- Dummy data for tokens ---
const TOKEN_LIST = [
  {
    id: "ROUTINE",
    symbol: "$ROUTINE",
    priceHistory: [5, 5.2, 5.1, 5.25, 5.3, 5.4, 5.35],
    risk: 72,
    hype: 83,
    holders: 4200,
    whaleBuys: 12,
    whaleSells: 4,
    lpLocked: "80%",
    lpUnlocked: "20%",
    honeypot: false,
    freezeAuthority: false,
  },
  {
    id: "FARTCOIN",
    symbol: "$FARTCOIN",
    priceHistory: [0.02, 0.021, 0.019, 0.022, 0.023, 0.025, 0.024],
    risk: 95,
    hype: 40,
    holders: 12000,
    whaleBuys: 3,
    whaleSells: 8,
    lpLocked: "50%",
    lpUnlocked: "50%",
    honeypot: true,
    freezeAuthority: true,
  },
];

// --- Dummy AI insights ---
const AI_INSIGHTS = [
  "$SNIPE token gained 12 new holders from smart wallets in the last hour.",
  "Whale cluster activity spiking in low-cap token: $GROOK.",
  "AI predicts 75% pump likelihood based on wallet behavior.",
  "$DOGWIFARM alerts: 7 Telegram groups mentioning buying signals.",
];

// --- Dummy leaderboard ---
const LEADERBOARD = [
  { wallet: "Whale1…XYZ", roi: "432%", accuracy: "91%" },
  { wallet: "Sniper…234", roi: "312%", accuracy: "88%" },
  { wallet: "Smart…MNY", roi: "287%", accuracy: "94%" },
];

export default function DemoPage() {
  // 1) Wallet tracker
  const [currentWalletId, setCurrentWalletId] = useState(WALLET_PROFILES[0].id);
  const currentWalletProfile = WALLET_PROFILES.find(w => w.id === currentWalletId)!;
  const [walletEvents, setWalletEvents] = useState(currentWalletProfile.events);

  // re-initialize on wallet switch
  useEffect(() => {
    setWalletEvents(currentWalletProfile.events);
  }, [currentWalletId]);

  // simulate a new event every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      const types = ["buy", "sell"] as const;
      const tokens = ["SOL","USDC","ROUTINE","FLOP","GROOK"];
      const type = types[Math.floor(Math.random()*types.length)];
      const token = tokens[Math.floor(Math.random()*tokens.length)];
      const amount = Math.floor(Math.random()*(type==="buy"?2000:100_000))+1;
      const newEvent = {
        type,
        token,
        amount,
        when: "just now",
      };
      setWalletEvents(prev => [ newEvent, ...prev ].slice(0,5));
    }, 5000);
    return () => clearInterval(interval);
  }, [currentWalletId]);

  // 2) Token intelligence
  const [currentTokenId, setCurrentTokenId] = useState(TOKEN_LIST[0].id);
  const currentToken = TOKEN_LIST.find(t => t.id === currentTokenId)!;
  const [priceHistory, setPriceHistory] = useState([...currentToken.priceHistory]);

  useEffect(() => setPriceHistory([...currentToken.priceHistory]), [currentTokenId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPriceHistory(prev => {
        const last = prev[prev.length-1];
        const next = +(last * (1 + (Math.random()-0.5)*0.02)).toFixed(3);
        return [...prev.slice(1), next];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [currentTokenId]);

  // generate sparkline points
  const sparkPoints = useMemo(() => {
    const arr = priceHistory;
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    if (max === min) {
      // flat line
      return arr.map((_, i) => `${(i/(arr.length-1))*100},50`).join(" ");
    }
    return arr
      .map((p, i) => {
        const x = (i / (arr.length - 1)) * 100;
        const y = 100 - ((p - min) / (max - min)) * 100;
        return `${x},${y}`;
      })
      .join(" ");
  }, [priceHistory]);

  // 3) AI Insights Feed
  const [insights, setInsights] = useState(AI_INSIGHTS);
  useEffect(() => {
    const interval = setInterval(() => {
      const rand = AI_INSIGHTS[Math.floor(Math.random()*AI_INSIGHTS.length)];
      setInsights(prev => [rand, ...prev].slice(0,5));
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // 4) Alert builder
  const [alertWallet, setAlertWallet] = useState("0xDeGen...");
  const [alertType, setAlertType] = useState<"buy"|"sell">("buy");
  const [alertThreshold, setAlertThreshold] = useState(1000);
  const [alertChannel, setAlertChannel] = useState<"Telegram"|"Email"|"Popup">("Telegram");
  const [alertMessage, setAlertMessage] = useState("");

  function handleAlertSubmit(e: FormEvent) {
    e.preventDefault();
    setAlertMessage(
      `🚨 Wallet ${alertWallet} ${alertType==="buy"?"bought":"sold"} ` +
      `${alertThreshold.toLocaleString()} ${alertType==="buy"?"SOL":"USDC"} — alert triggered.`
    );
    setTimeout(() => setAlertMessage(""), 5000);
  }

  // 5) Leaderboard / mode
  const [demoMode, setDemoMode] = useState<"New Trader"|"Pro Trader">("New Trader");

  return (
    <>
      <Header />
      <main className="pt-[200px] pb-20 bg-cyvexBg text-white min-h-screen px-6 space-y-12">
        {/* Page Intro */}
        <div className="max-w-4xl mx-auto text-center space-y-2">
          <h1 className={`${ubuntu.className} 
          text-4xl md:text-6xl font-bold 
          leading-[1.1] md:leading-[1.1]
          bg-gradient-to-r from-cyvexPurple to-cyvexBlue
          text-transparent bg-clip-text`}>
            Interactive Dashboard Preview
          </h1>
          <p className="text-gray-300">
            Experience real-time tracking: wallets, tokens, alerts & AI insights.
          </p>
        </div>

        {/* 1) Live Wallet Tracker */}
        <section className="max-w-7xl mx-auto space-y-4">
          <h2 className="text-2xl font-semibold">Live Wallet Tracker</h2>
          <div className="flex gap-4">
            {WALLET_PROFILES.map(w => (
              <button
                key={w.id}
                onClick={() => setCurrentWalletId(w.id)}
                className={`px-4 py-2 rounded-full transition ${
                  currentWalletId===w.id
                    ? "bg-cyvexPurple text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                <User className="inline mr-2" /> {w.name}
              </button>
            ))}
          </div>
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">{currentWalletProfile.name}</span>
              <span className="text-sm text-gray-400">{currentWalletProfile.address}</span>
              <span className="text-lg font-semibold">
                Smart Score: {currentWalletProfile.score}/100
              </span>
            </div>
            <ul className="space-y-2 text-sm">
              {walletEvents.map((e,i) => (
                <li key={i} className="flex justify-between">
                  <span className="capitalize">{e.type}</span>
                  <span>{e.amount.toLocaleString()} {e.token}</span>
                  <span className="text-gray-500">{e.when}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* 2) Token Intelligence */}
        <section className="max-w-7xl mx-auto space-y-4">
          <h2 className="text-2xl font-semibold">Token Intelligence</h2>
          <div className="flex gap-4">
            {TOKEN_LIST.map(t => (
              <button
                key={t.id}
                onClick={() => setCurrentTokenId(t.id)}
                className={`px-4 py-2 rounded-full transition ${
                  currentTokenId===t.id
                    ? "bg-cyvexBlue text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {t.symbol}
              </button>
            ))}
          </div>
          <Card className="p-6">
            <div className="grid grid-cols-2 gap-6">
              {/* ← sparkline SVG replaces the raw numbers */}
              <div className="col-span-2 lg:col-span-1">
                <h3 className="text-sm text-gray-400">Price (24h)</h3>
                <div className="h-32 bg-gray-800 rounded-md overflow-hidden">
                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="w-full h-full"
                  >
                    <polyline
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="2"
                      points={sparkPoints}
                    />
                  </svg>
                </div>
              </div>
              {/* Token stats */}
              <div className="space-y-2 text-sm">
                <p><strong>Risk:</strong> {currentToken.risk}/100</p>
                <p><strong>Hype:</strong> {currentToken.hype}/100</p>
                <p><strong>Holders:</strong> {currentToken.holders.toLocaleString()}</p>
                <p><strong>Whale Buys:</strong> {currentToken.whaleBuys}</p>
                <p><strong>Whale Sells:</strong> {currentToken.whaleSells}</p>
                <p><strong>LP Locked:</strong> {currentToken.lpLocked}</p>
                <p><strong>LP Unlocked:</strong> {currentToken.lpUnlocked}</p>
                {currentToken.honeypot && <p className="text-red-400">⚠️ Honeypot detected</p>}
                {currentToken.freezeAuthority && <p className="text-red-400">⚠️ Freeze authority active</p>}
              </div>
            </div>
          </Card>
        </section>

        {/* 3) Mock Alert Builder */}
        <section className="max-w-7xl mx-auto space-y-3">
          <h2 className="text-2xl font-semibold">Mock Alert Builder</h2>
          <form
            onSubmit={handleAlertSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <input
              type="text" value={alertWallet}
              onChange={e => setAlertWallet(e.target.value)}
              className="p-3 bg-gray-800 rounded-md w-full"
              placeholder="Wallet (e.g. 0xDeGen…)" />
            <select
              value={alertType}
              onChange={e => setAlertType(e.target.value as any)}
              className="p-3 bg-gray-800 rounded-md w-full"
            >
              <option value="buy">Buy &gt; </option>
              <option value="sell">Sell &gt; </option>
            </select>
            <input
              type="number" value={alertThreshold}
              onChange={e => setAlertThreshold(+e.target.value)}
              className="p-3 bg-gray-800 rounded-md w-full"
              placeholder="Amount" />
            <select
              value={alertChannel}
              onChange={e => setAlertChannel(e.target.value as any)}
              className="p-3 bg-gray-800 rounded-md w-full"
            >
              <option>Telegram</option>
              <option>Email</option>
              <option>On-page Popup</option>
            </select>
            <button
              type="submit"
              className="col-span-full sm:col-span-2 lg:col-span-4 px-6 py-3 bg-cyvexPurple rounded-md"
            >
              Set Mock Alert
            </button>
          </form>
          {alertMessage && (
            <div className="p-4 bg-green-800 rounded-md text-white">
              {alertMessage}
            </div>
          )}
        </section>

        {/* 4) AI Insights Feed */}
        <section className="max-w-7xl mx-auto space-y-3">
          <h2 className="text-2xl font-semibold">AI Insights Feed</h2>
          <Card className="p-4 space-y-2">
            {insights.map((txt,i) => (
              <p key={i} className="text-sm">
                <Zap className="inline mr-2 text-cyvexBlue" />{txt}
              </p>
            ))}
          </Card>
        </section>

        {/* 5) Portfolio Snapshot */}
        <section className="max-w-7xl mx-auto space-y-4">
         <h2 className="text-2xl font-semibold">Portfolio Snapshot</h2>
         <Card className="p-6">
      <div className="flex items-center mb-4">
        <PieChart className="w-6 h-6 text-cyvexPurple mr-2" />
        <span className="text-sm text-gray-400">Demo Portfolio</span>
      </div>
      <ul className="space-y-2 text-sm">
        {DEMO_PORTFOLIO.map(({ token, pct, value }) => (
          <li key={token} className="flex justify-between">
            <span>{token} ({pct})</span>
            <span className="font-semibold text-white">{value}</span>
          </li>
        ))}
      </ul>
    </Card>
  </section>

        {/* 5) Dashboard Preview & Leaderboard */}
        <section className="max-w-7xl mx-auto space-y-3">
          <h2 className="text-2xl font-semibold">Mode & Leaderboard</h2>
          <div className="flex gap-4 mb-4">
            {(["New Trader","Pro Trader"] as const).map(m => (
              <button
                key={m} onClick={() => setDemoMode(m)}
                className={`px-4 py-2 rounded-full ${
                  demoMode===m ? "bg-cyvexBlue text-white" : "bg-gray-800 text-gray-300"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4">
              <h3 className="font-semibold">Portfolio Overview</h3>
              <BarChart2 className="w-full h-32 text-gray-500" />
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Leaderboard ({demoMode})</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {LEADERBOARD.map((row,i) => (
                  <li key={i} className="flex justify-between">
                    <span>{row.wallet}</span>
                    <span>{row.roi} / {row.accuracy}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
}