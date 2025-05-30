"use client";

import { useState, FormEvent } from "react";
import Header from "../../components/Header";
import Card from "../../components/Card";
import { Ubuntu } from "next/font/google";
import {
  User,
  Zap,
  BarChart2,
} from "lucide-react";

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
      { type: "buy", token: "ROUTINE", amount: 3_400, when: "1m ago" },
      { type: "sell", token: "FLOP", amount: 1_200, when: "4m ago" },
    ],
  },
  {
    id: "influencer",
    name: "Influencer",
    address: "Infx…FLU",
    score: 78,
    events: [
      { type: "buy", token: "GORK", amount: 2_000, when: "30s ago" },
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
    holders: 4_200,
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
    holders: 12_000,
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
  // wallet tracker state
  const [currentWalletId, setCurrentWalletId] = useState(WALLET_PROFILES[0].id);
  const currentWallet = WALLET_PROFILES.find((w) => w.id === currentWalletId)!;

  // token intelligence state
  const [currentTokenId, setCurrentTokenId] = useState(TOKEN_LIST[0].id);
  const currentToken = TOKEN_LIST.find((t) => t.id === currentTokenId)!;

  // alert builder state
  const [alertWallet, setAlertWallet] = useState("0xDeGen...");
  const [alertType, setAlertType] = useState<"buy" | "sell">("buy");
  const [alertThreshold, setAlertThreshold] = useState(1000);
  const [alertChannel, setAlertChannel] = useState<"Telegram" | "Email" | "Popup">(
    "Telegram"
  );
  const [alertMessage, setAlertMessage] = useState("");

  // AI Insights filters
  const [insightFilter, setInsightFilter] = useState<
    "All" | "Trending" | "Wallets" | "Pumps"
  >("All");

  // Demo mode toggle
  const [demoMode, setDemoMode] = useState<"New Trader" | "Pro Trader">(
    "New Trader"
  );

  function handleAlertSubmit(e: FormEvent) {
    e.preventDefault();
    setAlertMessage(
      `🚨 Wallet ${alertWallet} ${
        alertType === "buy" ? "bought" : "sold"
      } ${alertThreshold.toLocaleString()} ${
        alertType === "buy" ? "SOL" : "USDC"
      } — token is trending in 3 Telegram groups.`
    );
    setTimeout(() => setAlertMessage(""), 5000);
  }

  // filtered insights list
  const filteredInsights =
    insightFilter === "All"
      ? AI_INSIGHTS
      : AI_INSIGHTS.filter((i) =>
          insightFilter === "Trending"
            ? i.includes("token gained") || i.includes("pump")
            : insightFilter === "Wallets"
            ? i.includes("Whale") || i.includes("holders")
            : insightFilter === "Pumps"
            ? i.includes("pump")
            : true
        );

  return (
    <>
      <Header />
      <main className="pt-[200px] pb-20 bg-cyvexBg text-white min-h-screen px-6 space-y-12">
        {/* Page Intro */}
        <div className="max-w-4xl mx-auto text-center space-y-2">
          <h1
            className={`${ubuntu.className} text-4xl md:text-6xl font-bold
              bg-gradient-to-r from-cyvexPurple to-cyvexBlue
              leading-[1.1] md:leading-[1.1]
              bg-clip-text text-transparent`}
          >
            Cyvex AI Interactive Demo
          </h1>
          <p className="text-gray-300">
            Toggle between features, build alerts, and explore our mock dashboard.
          </p>
        </div>

        {/* 1) Live Wallet Tracker */}
        <section className="max-w-7xl mx-auto space-y-4">
          <h2 className="text-2xl font-semibold">Live Wallet Tracker</h2>
          <div className="flex gap-4">
            {WALLET_PROFILES.map((w) => (
              <button
                key={w.id}
                onClick={() => setCurrentWalletId(w.id)}
                className={`px-4 py-2 rounded-full ${
                  currentWalletId === w.id
                    ? "bg-cyvexPurple text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                } transition`}
              >
                <User className="inline mr-2" />
                {w.name}
              </button>
            ))}
          </div>
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">{currentWallet.name}</span>
              <span className="text-sm text-gray-400">
                {currentWallet.address}
              </span>
              <span className="text-lg font-semibold">
                Smart Score: {currentWallet.score}/100
              </span>
            </div>
            <ul className="space-y-2 text-sm">
              {currentWallet.events.map((e, i) => (
                <li key={i} className="flex justify-between">
                  <span className="capitalize">{e.type}</span>
                  <span>
                    {e.amount.toLocaleString()} {e.token}
                  </span>
                  <span className="text-gray-500">{e.when}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* 2) Token Intelligence Panel */}
        <section className="max-w-7xl mx-auto space-y-4">
          <h2 className="text-2xl font-semibold">Token Intelligence</h2>
          <div className="flex gap-4">
            {TOKEN_LIST.map((t) => (
              <button
                key={t.id}
                onClick={() => setCurrentTokenId(t.id)}
                className={`px-4 py-2 rounded-full ${
                  currentTokenId === t.id
                    ? "bg-cyvexBlue text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                } transition`}
              >
                {t.symbol}
              </button>
            ))}
          </div>
          <Card className="p-6">
            <div className="grid grid-cols-2 gap-6">
              {/* ←– sparkline chart replaces placeholder */}
              <div className="col-span-2 lg:col-span-1">
                <h3 className="text-sm text-gray-400">Price (24h)</h3>
                {(() => {
                  const prices = currentToken.priceHistory;
                  const maxP = Math.max(...prices);
                  const minP = Math.min(...prices);
                  const pts = prices
                    .map((p, i) => {
                      const x = (i / (prices.length - 1)) * 100;
                      const y = 30 - ((p - minP) / (maxP - minP)) * 30;
                      return `${x},${y}`;
                    })
                    .join(" ");
                  return (
                    <div className="h-32 bg-gray-800 rounded-md overflow-hidden">
                      <svg
                        viewBox="0 0 100 30"
                        preserveAspectRatio="none"
                        className="w-full h-full"
                      >
                        {/* area fill */}
                        <polyline
                          fill="rgba(59,130,246,0.2)"
                          stroke="none"
                          points={`0,30 ${pts} 100,30`}
                        />
                        {/* line */}
                        <polyline
                          fill="none"
                          stroke="#8b5cf6"
                          strokeWidth="1.5"
                          points={pts}
                        />
                      </svg>
                    </div>
                  );
                })()}
              </div>

              <div className="space-y-2">
                <p>
                  <strong>Risk Rating:</strong> {currentToken.risk}/100
                </p>
                <p>
                  <strong>Hype Rating:</strong> {currentToken.hype}/100
                </p>
                <p>
                  <strong>Holders:</strong> {currentToken.holders.toLocaleString()}
                </p>
                <p>
                  <strong>Whale Buys:</strong> {currentToken.whaleBuys}
                </p>
                <p>
                  <strong>Whale Sells:</strong> {currentToken.whaleSells}
                </p>
                <p>
                  <strong>LP Locked:</strong> {currentToken.lpLocked}
                </p>
                <p>
                  <strong>LP Unlocked:</strong> {currentToken.lpUnlocked}
                </p>
                {currentToken.honeypot && (
                  <p className="text-red-400">⚠️ Honeypot detected</p>
                )}
                {currentToken.freezeAuthority && (
                  <p className="text-red-400">⚠️ Freeze authority active</p>
                )}
              </div>
            </div>
          </Card>
        </section>

        {/* 3) Alert Builder */}
        <section className="max-w-7xl mx-auto space-y-3">
          <h2 className="text-2xl font-semibold">Mock Alert Builder</h2>
          <form
            onSubmit={handleAlertSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <input
              type="text"
              value={alertWallet}
              onChange={(e) => setAlertWallet(e.target.value)}
              className="p-3 bg-gray-800 rounded-md w-full"
              placeholder="Wallet (e.g. 0xDeGen…)"
            />
            <select
              value={alertType}
              onChange={(e) => setAlertType(
                e.target.value as "buy" | "sell"
              )}
              className="p-3 bg-gray-800 rounded-md w-full"
            >
              <option value="buy">Buy &gt; </option>
              <option value="sell">Sell &gt; </option>
            </select>
            <input
              type="number"
              value={alertThreshold}
              onChange={(e) => setAlertThreshold(+e.target.value)}
              className="p-3 bg-gray-800 rounded-md w-full"
              placeholder="Amount threshold"
            />
            <select
              value={alertChannel}
              onChange={(e) =>
                setAlertChannel(
                  e.target.value as "Telegram" | "Email" | "Popup"
                )
              }
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
              🚨 {alertMessage}
            </div>
          )}
        </section>

        {/* 4) AI Insights Feed */}
        <section className="max-w-7xl mx-auto space-y-3">
          <h2 className="text-2xl font-semibold">AI Insights Feed</h2>
          <div className="flex gap-2">
            {(["All", "Trending", "Wallets", "Pumps"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setInsightFilter(f)}
                className={`px-3 py-1 rounded-full ${
                  insightFilter === f
                    ? "bg-cyvexPurple text-white"
                    : "bg-gray-800 text-gray-300"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <Card className="p-4 space-y-2">
            {filteredInsights.map((ins, i) => (
              <p key={i} className="text-sm">
                <Zap className="inline mr-2 text-cyvexBlue" />
                {ins}
              </p>
            ))}
          </Card>
        </section>

        {/* 5) Interactive Dashboard Preview */}
        <section className="max-w-7xl mx-auto space-y-3">
          <h2 className="text-2xl font-semibold">Dashboard Preview (Read-only)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4">
              <h3 className="font-semibold">Portfolio Overview</h3>
              <BarChart2 className="w-full h-32 text-gray-500" />
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold">Watchlist & Wallet Stats</h3>
              <ul className="list-disc list-inside text-sm text-gray-300">
                <li>Smith…123: 15% ROI</li>
                <li>Wallet2…XYZ: 8% ROI</li>
              </ul>
              <small className="text-gray-500">Unlock full access with $CYVEX →</small>
            </Card>
          </div>
        </section>

        {/* 6) Demo Mode Toggle & Leaderboard */}
        <section className="max-w-7xl mx-auto space-y-3">
          <h2 className="text-2xl font-semibold">Mode & Leaderboard</h2>
          <div className="flex gap-4 mb-4">
            {(["New Trader", "Pro Trader"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setDemoMode(m)}
                className={`px-4 py-2 rounded-full ${
                  demoMode === m
                    ? "bg-cyvexBlue text-white"
                    : "bg-gray-800 text-gray-300"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <Card className="p-4">
            <h3 className="font-semibold mb-2">
              Leaderboard ({demoMode})
            </h3>
            <ul className="text-sm">
              {LEADERBOARD.map((row, i) => (
                <li key={i} className="flex justify-between">
                  <span>{row.wallet}</span>
                  <span>
                    {row.roi} / {row.accuracy}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </section>
      </main>
    </>
  );
}