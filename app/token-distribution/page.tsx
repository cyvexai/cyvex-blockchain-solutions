"use client";

import { Ubuntu } from "next/font/google";
import Header from "../../components/Header";
import Card from "../../components/Card";
import TokenomicsChart from "../../components/TokenomicsChart";
import { ChevronRight } from "lucide-react";

const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["400", "700"] });

export default function TokenDistribution() {
  const distribution = [
    {
      title: "Platform & Liquidity",
      pct: "40%",
      color: "#a855f7",
      desc: "Initial liquidity and platform incentives.",
    },
    {
      title: "Team & Advisors",
      pct: "20%",
      color: "#3b82f6",
      desc: "Allocation for team & advisors vesting.",
    },
    {
      title: "Community & Airdrops",
      pct: "20%",
      color: "#8b5cf6",
      desc: "Rewards, airdrops, and community events.",
    },
    {
      title: "Ecosystem Fund",
      pct: "10%",
      color: "#ec4899",
      desc: "Funding for partnerships & protocol growth.",
    },
    {
      title: "Reserve",
      pct: "10%",
      color: "#10b981",
      desc: "Strategic reserve for future use.",
    },
  ];

  const vestingSchedules = [
    {
      title: "Platform & Liquidity",
      allocation: "400,000,000 $CYVEX (40%)",
      cliff: "None",
      duration: "6 months",
      schedule: "Linear monthly release",
    },
    {
      title: "Team & Advisors",
      allocation: "200,000,000 $CYVEX (20%)",
      cliff: "12 months",
      duration: "4 years",
      schedule: "Monthly after cliff",
    },
    {
      title: "Community & Airdrops",
      allocation: "200,000,000 $CYVEX (20%)",
      cliff: "None",
      duration: "12 months",
      schedule: "Weekly distribution",
    },
    {
      title: "Ecosystem Fund",
      allocation: "100,000,000 $CYVEX (10%)",
      cliff: "6 months",
      duration: "24 months",
      schedule: "Quarterly release",
    },
    {
      title: "Reserve",
      allocation: "100,000,000 $CYVEX (10%)",
      cliff: "6 months",
      duration: "24 months",
      schedule: "Semi-annual release",
    },
  ];

  return (
    <>
      <Header />
      <main className="pt-[200px] pb-20 bg-cyvexBg text-white min-h-screen px-6 space-y-16">
        {/* Page Header */}
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className={`
              ${ubuntu.className}
              text-3xl md:text-6xl font-bold
              bg-gradient-to-r from-cyvexPurple to-cyvexBlue
              bg-clip-text text-transparent
              text-center
            `}
          >
            Token Distribution
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Allocation & Vesting Schedules of $CYVEX across the ecosystem
          </p>
        </div>

        {/* Chart */}
        <div className="max-w-md mx-auto">
          <TokenomicsChart />
        </div>

        {/* Distribution Cards */}
        <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {distribution.map(({ title, pct, color, desc }) => (
            <Card
              key={title}
              className="flex flex-col items-center p-6 hover:border-cyvexPurple transition"
            >
              <span
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: color }}
              />
              <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-1 text-2xl font-bold text-white">{pct}</p>
              <p className="mt-2 text-center text-gray-300">{desc}</p>
            </Card>
          ))}
        </section>

        {/* Detailed Vesting Schedules (Table) */}
        <section className="max-w-7xl mx-auto">
          <h2
            className={`
              ${ubuntu.className}
              text-3xl md:text-4xl font-bold text-gray
              text-center mb-6
            `}
          >
            Detailed Vesting Schedules
          </h2>
          <Card className="overflow-x-auto p-6">
            <table className="min-w-full table-auto text-left">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-gray-400">Bucket</th>
                  <th className="px-4 py-2 text-gray-400">Allocation</th>
                  <th className="px-4 py-2 text-gray-400">Cliff</th>
                  <th className="px-4 py-2 text-gray-400">Duration</th>
                  <th className="px-4 py-2 text-gray-400">Release</th>
                </tr>
              </thead>
              <tbody>
                {vestingSchedules.map(
                  ({ title, allocation, cliff, duration, schedule }) => (
                    <tr key={title} className="even:bg-gray-800">
                      <td className="px-4 py-3 text-white font-medium">{title}</td>
                      <td className="px-4 py-3 text-gray-200">{allocation}</td>
                      <td className="px-4 py-3 text-gray-200">{cliff}</td>
                      <td className="px-4 py-3 text-gray-200">{duration}</td>
                      <td className="px-4 py-3 text-gray-200">{schedule}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </Card>
        </section>

        {/* Token Details */}
        <section className="max-w-7xl mx-auto">
          <h2
            className={`
              ${ubuntu.className}
              text-3xl md:text-4xl font-bold text-gray
              text-center mb-6
            `}
          >
            Token Details
          </h2>
          <Card className="overflow-x-auto p-6">
            <table className="min-w-full table-auto text-left">
              <tbody>
                {[
                  ["Token Name", "Cyvex AI"],
                  ["Token Symbol", "CYVEX"],
                  ["Total Supply", "1,000,000,000 CYVEX"],
                  ["Token Type", "SPL Token (Solana)"],
                  ["Initial Circulating Supply", "100,000,000 CYVEX (10%)"],
                  ["Initial Market Cap", "$450,000 (at $0.0045)"],
                ].map(([label, value]) => (
                  <tr key={label} className="even:bg-gray-800">
                    <td className="px-4 py-3 text-white font-medium">{label}</td>
                    <td className="px-1 py-3 text-gray-400">
                      <ChevronRight className="inline-block w-4 h-4 mr-2 text-gray-400" />
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </section>
      </main>
    </>
  );
}