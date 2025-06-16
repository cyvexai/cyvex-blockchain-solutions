"use client";

import { useState, useEffect, useMemo, FormEvent } from "react";
import Header from "../../components/Header";
import Card from "../../components/Card";
import { Ubuntu } from "next/font/google";
import {
  User,
  Zap,
  PieChart as PieIcon,
  AlertCircle,
  TrendingUp,
  BarChart2,
} from "lucide-react";

const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["400", "700"] });

// — Demo Data Types & Constants —
type Tx = { type: "buy" | "sell"; token: string; amount: number; when: string };
type WalletProfile = { id: string; name: string; address: string; score: number; events: Tx[] };
type TokenProfile = {
  id: string;
  symbol: string;
  history: number[];
  risk: number;
  hype: number;
  holders: number;
};
type AlertItem = { id: string; wallet: string; type: "buy" | "sell"; threshold: number; channel: string; enabled: boolean };

const WALLET_PROFILES: WalletProfile[] = [
  { id: "whale", name: "Whale Wallet", address: "Jq9…WHALE", score: 92, events: [
      { type: "buy",  token: "SOL",  amount: 1200,    when: "2m ago" },
      { type: "sell", token: "USDC", amount: 500_000,  when: "5m ago" },
    ] },
  { id: "smart",  name: "Smart Money", address: "Smrt…MONEY", score: 87, events: [
      { type: "buy",  token: "ROUTINE", amount: 3400, when: "1m ago" },
      { type: "sell", token: "FLOP",    amount: 1200, when: "4m ago" },
    ] },
  { id: "influencer", name: "KOL", address: "Infx…FLU", score: 78, events: [
      { type: "buy",  token: "GROOK", amount: 2000, when: "30s ago" },
      { type: "sell", token: "MANGO", amount: 50_000, when: "3m ago" },
    ] },
];

const TOKEN_LIST: TokenProfile[] = [
  { id: "ROUTINE", symbol: "$ROUTINE", history: [5,5.2,5.1,5.25,5.3,5.4,5.35], risk:72, hype:83, holders:4200 },
  { id: "FARTCOIN", symbol: "$FARTCOIN", history: [0.02,0.021,0.019,0.022,0.023,0.025,0.024], risk:95, hype:40, holders:12000 },
];

const INITIAL_ALERTS: AlertItem[] = [
  { id:"a1", wallet:"Jq9…WHALE", type:"buy",  threshold:1000, channel:"Telegram", enabled:true },
  { id:"a2", wallet:"Smrt…MONEY", type:"sell", threshold:2000, channel:"Email",    enabled:false },
];

const AI_INSIGHTS = [
  "$SNIPE token gained 12 new holders from smart wallets in the last hour.",
  "Whale cluster activity spiking in low-cap token: $GROOK.",
  "AI predicts 75% pump likelihood based on wallet behavior.",
  "$DOGWIFARM alerts: 7 Telegram groups mentioning buying signals.",
];

const DEMO_PORTFOLIO = [
  { token:"SOL",  pct:"45%", value:"$4,500" },
  { token:"USDC", pct:"35%", value:"$3,500" },
  { token:"PMON", pct:"20%", value:"$2,000" },
];

const LEADERBOARD = [
  { wallet:"Whale1…XYZ",    roi:"432%", accuracy:"91%" },
  { wallet:"Sniper…234",    roi:"312%", accuracy:"88%" },
  { wallet:"Smart…MNY",     roi:"287%", accuracy:"94%" },
];

const WALLET_METADATA: Record<string, { created: string; tags: string[] }> = {
  whale:      { created:"2020-08-10", tags:["Whale"] },
  smart:      { created:"2021-05-22", tags:["Smart Money"] },
  influencer: { created:"2022-01-11", tags:["KOL"] },
};

// ← per-wallet P&L & ROI
const PNL_MAP: Record<string, { pnl:number; roi:number }> = {
  whale:      { pnl: 12.4,  roi: 158 },
  smart:      { pnl: 8.9,   roi: 120 },
  influencer: { pnl: -3.5,  roi:  45 },
  custom:     { pnl: 0,     roi:   0 },
};

// — Dashboard Tabs Configuration —
const tabs = [
  { key:"wallet",    label:"Wallet Tracker",     icon:<User />      },
  { key:"token",     label:"Token Intelligence", icon:<TrendingUp /> },
  { key:"alerts",    label:"Alerts",             icon:<AlertCircle />},
  { key:"insights",  label:"AI Insights",        icon:<Zap />       },
  { key:"portfolio", label:"Portfolio",          icon:<PieIcon />   },
  { key:"leader",    label:"Leaderboard",        icon:<BarChart2 /> },
];

export default function DashboardPage() {
  const [active, setActive] = useState<string>(tabs[0].key);
  const currentTabLabel = tabs.find((t) => t.key === active)?.label;

  return (
    <>
      <Header />
      <div className="pt-[200px] flex">
        {/* Sidebar (unchanged) */}
        <aside className="w-60 fixed top-[200px] left-0 h-[calc(100vh-200px)] bg-gray-900 bg-opacity-50 backdrop-blur-sm border-r border-gray-700 z-10">
          <nav className="p-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActive(tab.key)}
                className={`
                  flex items-center gap-3 w-full p-2 rounded-lg transition
                  ${active === tab.key
                    ? "bg-cyvexPurple text-white"
                    : "text-gray-300 hover:bg-gray-800"}
                `}
              >
                <span className="w-5 h-5">{tab.icon}</span>
                <span className={ubuntu.className}>{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="ml-60 flex-1 px-6 space-y-8 pb-20">
          {active === "wallet" ? (
            <WalletTracker />
          ) : (
            <section>
              <h2 className="text-2xl font-semibold mb-4">{currentTabLabel}</h2>
              <Card className="p-6 text-center text-gray-400 text-2xl">
                Coming Soon...
              </Card>
            </section>
          )}
        </main>
      </div>
    </>
  );
}


// — Wallet Tracker —
function WalletTracker() {
  const BUILTIN = WALLET_PROFILES;

  const BALANCE_MAP: Record<string, {token:string; pct:string; value:string}[]> = {
    whale:      [ {token:"SOL",pct:"60%",value:"$6,000"}, {token:"USDC",pct:"25%",value:"$2,500"}, {token:"SPX",pct:"15%",value:"$1,500"} ],
    smart:      [ {token:"SOL",pct:"40%",value:"$4,000"}, {token:"USDC",pct:"35%",value:"$3,500"}, {token:"ROUTINE",pct:"25%",value:"$2,500"} ],
    influencer: [ {token:"GORK",pct:"50%",value:"$5,000"}, {token:"SOL",pct:"30%",value:"$3,000"}, {token:"MASK",pct:"20%",value:"$2,000"} ],
    custom:     DEMO_PORTFOLIO
  };

  const [newWalletInput, setNewWalletInput] = useState("");
  const [customAddress, setCustomAddress] = useState<string|null>(null);
  const [customScore, setCustomScore] = useState(0);
  const [current, setCurrent] = useState<string>(BUILTIN[0].id);
  const [events, setEvents] = useState<Tx[]>(BUILTIN[0].events.slice(0,5));

  // update events when you switch
  useEffect(() => {
    if (current === "custom" && customAddress) {
      setEvents([]);
    } else {
      const p = BUILTIN.find(w => w.id===current)!;
      setEvents(p.events.slice(0,5));
    }
  }, [current, customAddress]);

  // simulate a new event every 5s
  useEffect(() => {
    const iv = setInterval(() => {
      const types:Tx["type"][] = ["buy","sell"];
      const tokens = ["SOL","USDC","ROUTINE","FLOP","GORK","MASK","AURA","SPX","FART"];
      const type = types[Math.floor(Math.random()*types.length)];
      const token= tokens[Math.floor(Math.random()*tokens.length)];
      const amount = Math.floor(Math.random()*(type==="buy"?2000:100_000))+1;
      const newEvent: Tx = { type, token, amount, when:"just now" };
      setEvents(prev=>[newEvent,...prev].slice(0,5));
    },5000);
    return ()=>clearInterval(iv);
  },[current]);

  const handleAddCustom = (e:FormEvent)=>{
    e.preventDefault();
    if(!newWalletInput.trim())return;
    setCustomAddress(newWalletInput.trim());
    setCustomScore(Math.floor(50+Math.random()*50));
    setCurrent("custom");
    setNewWalletInput("");
  };

  const profile =
    current==="custom" && customAddress
      ? { name:"Custom Wallet", address:customAddress, score:customScore }
      : BUILTIN.find(w=>w.id===current)!;

  const { pnl, roi } = PNL_MAP[current] || { pnl:0, roi:0 };
  const balances = BALANCE_MAP[current] || DEMO_PORTFOLIO;

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Live Wallet Tracker</h2>

      <form onSubmit={handleAddCustom} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newWalletInput}
          onChange={e=>setNewWalletInput(e.target.value)}
          placeholder="Enter wallet address"
          className="flex-1 px-3 py-2 bg-gray-800 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyvexPurple"
        />
        <button type="submit" className="px-4 py-2 bg-cyvexPurple hover:bg-cyvexBlue text-white rounded-full transition">
          Track
        </button>
      </form>

      <div className="flex gap-2 mb-4">
        {BUILTIN.map(w=>(
          <button
            key={w.id}
            onClick={()=>setCurrent(w.id)}
            className={`px-4 py-2 rounded-full transition ${
              current===w.id
                ? "bg-cyvexPurple text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {w.name}
          </button>
        ))}
        {customAddress && (
          <button
            onClick={()=>setCurrent("custom")}
            className={`px-4 py-2 rounded-full transition ${
              current==="custom"
                ? "bg-cyvexPurple text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Custom: {customAddress.slice(0,6)}…{customAddress.slice(-4)}
          </button>
        )}
      </div>

      <Card className="p-4">
        <div className="flex justify-between mb-4">
          <span className="font-medium">{profile.name}</span>
          <span className="text-sm text-gray-400">{profile.address}</span>
          <span className="text-lg font-semibold">Score: {profile.score}/100</span>
        </div>
        <ul className="space-y-2 text-sm">
          {events.map((e,i)=>(
            <li key={i} className="flex justify-between">
              <span className="capitalize">{e.type}</span>
              <span>{e.amount.toLocaleString()} {e.token}</span>
              <span className="text-gray-500">{e.when}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ← P&L & ROI Gauge (dynamic) */}
      <Card className="p-4">
        <h3 className="text-xl font-semibold mb-4">P&amp;L &amp; ROI</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-400">P&amp;L vs Entry</span>
              <span className={`text-sm font-semibold ${pnl>=0?"text-green-400":"text-red-400"}`}>
                {pnl>=0?`+${pnl}%`:`${pnl}%`}
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <div
                className={`h-2 ${pnl>=0?"bg-green-500":"bg-red-500"}`}
                style={{width:`${Math.abs(pnl)}%`}}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-400">ROI</span>
              <span className="text-sm font-semibold text-cyvexBlue">
                {roi>=0?`+${roi}%`:`${roi}%`}
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <div
                className="h-2 bg-cyvexBlue"
                style={{width:`${Math.min(Math.abs(roi),100)}%`}}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* On-Chain Scorecard */}
      <Card className="p-4">
        <h3 className="text-xl font-semibold mb-4">On-Chain Scorecard</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div><p className="text-gray-400">Avg. Gas Fees Paid</p><p className="font-semibold text-white">0.0005 SOL</p></div>
          <div><p className="text-gray-400">Distinct Counterparties</p><p className="font-semibold text-white">23</p></div>
          <div><p className="text-gray-400">Staking Activity</p><p className="font-semibold text-white">Active</p></div>
          <div><p className="text-gray-400">Txn Success Rate</p><p className="font-semibold text-white">98%</p></div>
        </div>
      </Card>

      {/* Wallet Metadata */}
      <Card className="p-4">
        <h3 className="text-xl font-semibold mb-4">Wallet Metadata</h3>
        {(() => {
          const md = WALLET_METADATA[current] ?? { created:"Unknown", tags:["Custom"] };
          return (
            <>
              <p className="text-sm text-gray-400">
                Created: <span className="font-semibold text-white">{md.created}</span>
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {md.tags.map(tag=>(
                  <span key={tag} className="px-2 py-1 bg-gray-800 bg-opacity-50 backdrop-blur-sm text-xs font-semibold text-white rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </>
          );
        })()}
      </Card>

      {/* Real-time Balance Breakdown */}
      <Card className="p-4">
        <h3 className="text-xl font-semibold mb-4">Real-time Balance Breakdown</h3>
        <div className="space-y-3">
          {balances.map(({token,pct,value})=>(
            <div key={token} className="flex items-center space-x-2">
              <span className="w-20 text-sm">{token}</span>
              <div className="relative flex-1 h-4 bg-gray-800 rounded" title={`${token}: ${pct} (${value})`}>
                <div className="h-4 bg-cyvexBlue rounded" style={{width:pct}} />
              </div>
              <span className="w-16 text-right text-sm text-gray-300">{pct}</span>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}


// — Token Intelligence —
function TokenIntelligence() {
  const [current, setCurrent] = useState(TOKEN_LIST[0].id);
  const token = TOKEN_LIST.find(t=>t.id===current)!;
  const [history, setHistory] = useState<number[]>([...token.history]);

  useEffect(()=>{ setHistory([...token.history]) },[current]);
  useEffect(()=>{
    const iv = setInterval(()=>{
      setHistory(prev=>{
        const last = prev[prev.length-1];
        const next = +(last*(1 + (Math.random()-0.5)*0.02)).toFixed(3);
        return [...prev.slice(1), next];
      });
    },3000);
    return ()=>clearInterval(iv);
  },[current]);

  const sparkPoints = useMemo(()=>{
    const min=Math.min(...history), max=Math.max(...history);
    return history.map((p,i)=>{
      const x=(i/(history.length-1))*100;
      const y=100-((p-min)/(max-min))*100;
      return `${x},${y}`;
    }).join(" ");
  },[history]);

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Token Intelligence</h2>
      <div className="flex gap-2 mb-4">
        {TOKEN_LIST.map(t=>(
          <button
            key={t.id}
            onClick={()=>setCurrent(t.id)}
            className={`px-4 py-2 rounded-full ${
              current===t.id
                ? "bg-cyvexBlue text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {t.symbol}
          </button>
        ))}
      </div>
      <Card className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm text-gray-400 mb-2">Price (24h)</h3>
            <div className="h-32 bg-gray-800 rounded overflow-hidden">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <polyline fill="none" stroke="#3b82f6" strokeWidth="2" points={sparkPoints} />
              </svg>
            </div>
          </div>
          <div className="space-y-1 text-sm">
            <p><strong>Risk:</strong> {token.risk}/100</p>
            <p><strong>Hype:</strong> {token.hype}/100</p>
            <p><strong>Holders:</strong> {token.holders.toLocaleString()}</p>
          </div>
        </div>
      </Card>
    </section>
  );
}


// — Alerts Manager —
function AlertsManager() {
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const toggle = (id:string)=> setAlerts(prev=>prev.map(a=>a.id===id?{...a,enabled:!a.enabled}:a));

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Alerts</h2>
      <Card className="p-4">
        <table className="w-full text-sm">
          <thead><tr className="text-gray-400"><th>Wallet</th><th>Type</th><th>Threshold</th><th>Channel</th><th>Active</th></tr></thead>
          <tbody>
            {alerts.map(a=>(
              <tr key={a.id} className="border-t border-gray-700">
                <td className="py-2">{a.wallet}</td>
                <td className="capitalize py-2">{a.type}</td>
                <td className="py-2">{a.threshold}</td>
                <td className="py-2">{a.channel}</td>
                <td className="py-2">
                  <input type="checkbox" checked={a.enabled} onChange={()=>toggle(a.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </section>
  );
}


// — Insights Feed —
function InsightsFeed() {
  const [items, setItems] = useState<string[]>(AI_INSIGHTS);
  useEffect(()=>{
    const iv = setInterval(()=>{
      const next = AI_INSIGHTS[Math.floor(Math.random()*AI_INSIGHTS.length)];
      setItems(prev=>[next,...prev].slice(0,5));
    },5000);
    return ()=>clearInterval(iv);
  },[]);

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">AI Insights Feed</h2>
      <Card className="p-4 space-y-2">
        {items.map((ins,i)=>(
          <p key={i} className="text-sm">
            <Zap className="inline mr-2 text-cyvexBlue"/> {ins}
          </p>
        ))}
      </Card>
    </section>
  );
}


// — Portfolio Snapshot —
function PortfolioSnapshot() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Portfolio Snapshot</h2>
      <Card className="p-4">
        <ul className="space-y-2 text-sm">
          {DEMO_PORTFOLIO.map(({token,pct,value})=>(
            <li key={token} className="flex justify-between">
              <span>{token} ({pct})</span>
              <span className="font-semibold text-white">{value}</span>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
}


// — Leaderboard View —
function LeaderboardView() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
      <Card className="p-4">
        <ul className="space-y-2 text-sm text-gray-300">
          {LEADERBOARD.map((row,i)=>(
            <li key={i} className="flex justify-between">
              <span>{row.wallet}</span>
              <span>{row.roi} / {row.accuracy}</span>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
}