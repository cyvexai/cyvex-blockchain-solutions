"use client";

import Header from '../../components/Header';
import { Ubuntu } from 'next/font/google';
import { ChevronRight } from 'lucide-react';
import Card from '../../components/Card';
import TokenomicsChart from '../../components/TokenomicsChart';

const ubuntu = Ubuntu({ subsets: ['latin'], weight: ['400','700'] });

export default function Whitepaper() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-cyvexBg text-white px-6 pt-40 pb-20">
        {/* Page title */}
        <h1
          className={`
            ${ubuntu.className}
            text-4xl md:text-6xl font-bold
            bg-gradient-to-r from-cyvexPurple to-cyvexBlue
            bg-clip-text text-transparent
            leading-snug md:leading-snug
            text-center mb-12
          `}
        >
          Cyvex Token Whitepaper
        </h1>

        {/* Two-column layout: TOC + Content */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[250px_1fr] items-start gap-8">
          {/* ← Table of Contents */}
          <aside className="hidden lg:block sticky top-24">
            <Card>
              <nav>
                <h2 className="text-lg font-semibold text-white mb-4">Contents</h2>
                <ul className="space-y-2">
                  {[
                    ['#introduction', 'Introduction'],
                    ['#vision', 'Vision & Purpose'],
                    ['#utility', 'Token Utility'],
                    ['#roadmap', 'Roadmap'],
                    ['#architecture', 'Architecture & Technology'],
                    ['#tokenomics', 'Tokenomics'],
                    ['#team', 'Team'],
                  ].map(([href, label]) => (
                    <li key={href} className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-cyvexBlue" />
                      <a href={href} className="hover:text-cyvexPurple">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </Card>
          </aside>

          {/* → Main Content */}
          <div className="space-y-8">
            {/* 1. Introduction */}
            <section id="introduction">
              <Card>
                <h2 className="text-2xl font-semibold text-white mb-2">1. Introduction</h2>
                <p className="text-gray-300 leading-relaxed">
                  Cyvex Blockchain Solutions is a cutting-edge AI-powered analytics platform built exclusively for the Solana blockchain. It provides real-time wallet tracking, token behavior analysis, and AI-driven insights to give traders, degens, and developers a competitive edge in a rapidly evolving ecosystem. To support this platform, we are launching CyvexAI ($CYVEX) — a utility and governance token designed to power user access, incentivize contributions, and decentralize the platform&apos;s evolution.
                </p>
              </Card>
            </section>

            {/* 2. Vision & Purpose */}
            <section id="vision">
              <Card>
                <h2 className="text-2xl font-semibold text-white mb-2">2. Vision &amp; Purpose</h2>
                <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-1">
                  <li><strong>Access:</strong> Unlock advanced features on the Cyvex platform through token holding or microtransactions.</li>
                  <li><strong>Governance:</strong> Enable the community to vote on development priorities, model tuning, and treasury allocation.</li>
                  <li><strong>Incentivization:</strong> Reward active users for training AI, flagging wallet behavior, and helping improve data quality.</li>
                </ul>
              </Card>
            </section>

            {/* 3. Token Utility */}
            <section id="utility">
              <Card>
                <h2 className="text-2xl font-semibold text-white mb-2">3. Token Utility</h2>
                <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-1">
                  <li>Premium dashboards and advanced analytics</li>
                  <li>Smart money wallet scoring</li>
                  <li>Real-time alerts and predictive token heatmaps</li>
                  <li>Developer tools and API access</li>
                </ul>
                <p className="mt-4 text-gray-300">
                  Access is tiered by token holdings or pay-per-use for lighter users.
                </p>
              </Card>
            </section>

            {/* 4. Roadmap */}
            <section id="roadmap">
              <Card>
                <h2 className="text-2xl font-semibold text-white mb-2">4. Roadmap</h2>
                <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-1">
                  <li>Q3 2025: Beta launch & early access</li>
                  <li>Q4 2025: Full public release & governance module</li>
                  <li>Q1 2026: Mobile app & API v2</li>
                </ul>
              </Card>
            </section>

            {/* 5. Architecture & Technology */}
            <section id="architecture">
              <h2 className={`${ubuntu.className} text-3xl md:text-4xl font-bold text-gray text-center mb-6`}>
                Architecture &amp; Technology
              </h2>
              <Card>
                <p className="text-gray-300 leading-relaxed">
                  CyvexAI is built on a modular, data-driven architecture that integrates real-time Solana blockchain indexing with AI-powered analytics. At its core, the platform continuously listens to on-chain activity—tracking wallets, token movements, and liquidity changes—via custom Solana RPC endpoints and indexing nodes. This raw data is funnelled into a processing layer where machine learning models analyze behavioural patterns, detect anomalies, and generate predictive insights. The frontend, built with Next.js and Tailwind, delivers a sleek, responsive dashboard where users can explore AI-scored wallets, monitor token performance, and set custom alerts. A microservices-based backend handles alert distribution, API access, and token-gated features using the $CYVEX token, enabling seamless scaling and user customization. Social signals from platforms like Twitter and Telegram are also aggregated and fused with on-chain data to enhance sentiment-aware predictions.
                </p>
              </Card>
            </section>

            {/* 6. Tokenomics */}
            <section id="tokenomics">
              <h2 className={`${ubuntu.className} text-3xl md:text-4xl font-bold text-gray text-center mb-6`}>
                Tokenomics
              </h2>
              <Card>
                <p className="text-gray-300 leading-relaxed">Total Supply: 1,000,000,000 $CYVEX tokens</p>
                <div className="mt-6 flex justify-center">
                  <TokenomicsChart />
                </div>
                <ul className="mt-6 list-disc list-inside text-gray-300 space-y-1">
                  <li><span className="inline-block w-3 h-3 mr-2 bg-[#a855f7] rounded-full" />Platform &amp; Liquidity (40%)</li>
                  <li><span className="inline-block w-3 h-3 mr-2 bg-[#3b82f6] rounded-full" />Team &amp; Advisors (20%)</li>
                  <li><span className="inline-block w-3 h-3 mr-2 bg-[#8b5cf6] rounded-full" />Community &amp; Airdrops (20%)</li>
                  <li><span className="inline-block w-3 h-3 mr-2 bg-[#ec4899] rounded-full" />Ecosystem Fund (10%)</li>
                  <li><span className="inline-block w-3 h-3 mr-2 bg-[#10b981] rounded-full" />Reserve (10%)</li>
                </ul>
              </Card>
            </section>

            {/* 7. Team */}
            <section id="team">
              <h2 className={`${ubuntu.className} text-3xl md:text-4xl font-bold text-gray text-center mb-6`}>
                Team
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <h3 className="text-xl font-semibold text-white mb-1">Alexei Podgorsky</h3>
                  <p className="text-cyvexBlue font-medium mb-2">Founder</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Visionary behind Cyvex AI, extensive background in blockchain ecosystems and Web3 product strategy. Strategic partner with several large-scale cryptocurrency projects involving on-chain intelligence & AI integration.
                  </p>
                </Card>
                <Card>
                  <h3 className="text-xl font-semibold text-white mb-1">Christopher Drozd</h3>
                  <p className="text-cyvexBlue font-medium mb-2">Lead Developer</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Technical architect of Cyvex AI, responsible for building core infrastructure, 6+ years in blockchain development and scalable system design.
                  </p>
                </Card>
                <Card>
                  <h3 className="text-xl font-semibold text-white mb-1">Emilia Balkova</h3>
                  <p className="text-cyvexBlue font-medium mb-2">Head of Research</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Expert in AI model development, wallet behaviour analysis, and social signal fusion. Strong background in machine learning and data science, leading research efforts that power Cyvex&apos;s predictive algorithms and smart money scoring systems.
                  </p>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}