"use client";

import { ClipboardCopy } from 'lucide-react';
import Header from '../components/Header';
import AnalyticsPreview from '../components/AnalyticsPreview';
import LiveTransactions from "../components/LiveTransactions";
import { Ubuntu } from 'next/font/google';
import {
  Wallet,
  ShoppingCart,
  PieChart,
  TrendingUp,
  Droplet,
  Code
} from 'lucide-react';

const ubuntu = Ubuntu({ subsets: ['latin'], weight: ['400', '700'] });

export default function Home() {
  const features = [
    { id: 'wallet',     icon: <Wallet className="w-8 h-8 text-cyvexPurple mb-4" />, title: 'Real-Time Wallet Tracking',      description: 'Track whale wallets, influencers, or competitors in real-time with AI alerts for significant actions.' },
    { id: 'purchase',   icon: <ShoppingCart className="w-8 h-8 text-cyvexPurple mb-4" />, title: 'Token Purchase Detection',     description: 'Get instant insights when tracked wallets buy or sell tokens, including memecoins and newly launched assets.' },
    { id: 'portfolio',  icon: <PieChart className="w-8 h-8 text-cyvexPurple mb-4" />, title: 'Portfolio Analytics',           description: 'Breakdown of wallet holdings by token type, sector (DeFi, NFT, meme), and performance over time.' },
    { id: 'predictive', icon: <TrendingUp className="w-8 h-8 text-cyvexPurple mb-4" />, title: 'Predictive Token Trends',      description: 'Forecast trending tokens using social signals + wallet activity + liquidity influx.' },
    { id: 'liquidity',  icon: <Droplet className="w-8 h-8 text-cyvexPurple mb-4" />, title: 'Liquidity Pool Movements',      description: 'Detect when liquidity is added, removed, or manipulated (LP rug warnings).' },
    { id: 'api',        icon: <Code className="w-8 h-8 text-cyvexPurple mb-4" />, title: 'API Access',                   description: 'For devs building bots or dashboards using Cyvex’s AI-enhanced Solana analytics.' },
  ];

  return (
    <>
      <Header />

      <main
        id="home"
        className="flex flex-col items-center justify-start min-h-screen px-6 pt-[200px] pb-24 bg-cyvexBg text-white space-y-12"
      >
        {/* —— Hero Section (no transparent panel) —— */}
        <div className="w-full max-w-3xl space-y-8">
          {/* Hero */}
          <h1
            className={`
              ${ubuntu.className}
              text-3xl md:text-7xl font-bold
              leading-[1.1] md:leading-[1.1]
              bg-gradient-to-r from-cyvexPurple to-cyvexBlue
              text-transparent bg-clip-text
              text-center
            `}
          >
            Revolutionizing Blockchain Analytics
          </h1>
          <p
            className={`
              ${ubuntu.className}
              text-lg md:text-2xl text-gray-300
              [text-shadow:0_0_4px_rgba(59,130,246,0.5)]
              text-center
            `}
          >
            With AI-powered Insights on Solana
          </p>

          {/* Coming Soon Box */}
          <div className="flex items-center justify-between w-full max-w-md mx-auto bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-full px-5 py-3">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-gray-500 rounded-full" />
              <span className="text-gray-200 text-center flex-1">
                Coming soon...
              </span>
            </div>
            <button
              onClick={async () => {
                await navigator.clipboard.writeText('Coming soon...');
              }}
              className="p-1 rounded-full hover:bg-gray-700 transition"
              aria-label="Copy text"
            >
              <ClipboardCopy className="w-5 h-5 text-gray-200" />
            </button>
          </div>

          {/* Early Access CTA */}
          <div className="text-center">
            <h3 className="text-lg md:text-xl font-semibold">
              Sign up for our early access waitlist!
            </h3>
          </div>

          {/* Waitlist Form */}
          <form id="waitlist" className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-3 rounded-3xl bg-gray-800 text-white border border-cyvexBlue focus:outline-none focus:ring-2 focus:ring-cyvexPurple"
            />
            <button className="btn-primary">
              Join Waitlist
            </button>
          </form>
        </div>

        {/* —— Live Data Section —— */}
        <section className="w-full flex flex-col lg:flex-row gap-6 justify-center">
          <div className="w-full lg:w-1/2 max-w-xl">
            <AnalyticsPreview />
          </div>
          <div className="w-full lg:w-1/2 max-w-xl">
            <LiveTransactions />
          </div>
        </section>

        {/* —— Features —— */}
        <section id="features" className="w-full max-w-7xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-white text-center">
            Advanced UI Features & Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ id, icon, title, description }) => (
              <div
                key={id}
                className="p-6 bg-gray-900 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-lg hover:border-cyvexPurple transition"
              >
                {icon}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {title}
                </h3>
                <p className="text-sm text-gray-300">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* —— How It Works —— */}
        <section id="how-it-works" className="w-full max-w-7xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-white text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-900 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-lg hover:border-cyvexPurple transition">
              <div className={`${ubuntu.className} text-4xl font-normal text-cyvexPurple mb-2`}>1</div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Sign Up & Join the Waitlist
              </h3>
              <p className="text-sm text-gray-300">
                Start by entering your email on the Cyvex homepage to join the
                waitlist for early access.
              </p>
            </div>
            <div className="p-6 bg-gray-900 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-lg hover:border-cyvexPurple transition">
              <div className={`${ubuntu.className} text-4xl font-normal text-cyvexPurple mb-2`}>2</div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Connect a Wallet
              </h3>
              <div className="text-sm text-gray-300 space-y-1">
                <ul className="list-disc list-inside">
                  <li>Personal wallet analytics and performance stats</li>
                  <li>Tracking your own buys, sells, and holdings</li>
                  <li>Setting up wallet-based alerts</li>
                </ul>
              </div>
            </div>
            <div className="p-6 bg-gray-900 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-lg hover:border-cyvexPurple transition">
              <div className={`${ubuntu.className} text-4xl font-normal text-cyvexPurple mb-2`}>3</div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Customize Your Tracking Preferences
              </h3>
              <p className="text-sm text-gray-300">
                You can either select from curated lists or input your own
                wallet/token addresses.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}