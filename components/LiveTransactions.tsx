"use client";

import { useEffect, useState } from "react";

export default function LiveTransactions() {
  const [txs, setTxs] = useState<string[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    const fetchTxs = async () => {
      try {
        const res = await fetch("/api/transactions");
        const json = await res.json();
        if (mounted && Array.isArray(json.signatures)) {
          setTxs(json.signatures);
          setLastUpdated(new Date().toLocaleTimeString());
        }
      } catch (err) {
        console.error("LiveTransactions fetch error:", err);
      }
    };

    fetchTxs();
    const interval = setInterval(fetchTxs, 10000); // every 10s

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="p-4 bg-gray-900 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-lg max-h-[400px] overflow-hidden">
      <h3 className="text-lg font-semibold text-white mb-3">Live Transactions</h3>

      <div className="h-full grid grid-cols-1 lg:grid-cols-2">
        {/* Left: signature list */}
        <ul className="space-y-2 text-sm text-gray-300 overflow-y-auto pr-4">
          {txs.length > 0 ? (
            txs.map((sig) => (
              <li key={sig}>
                <a
                  href={`https://explorer.solana.com/tx/${sig}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyvexPurple transition"
                >
                  {sig.slice(0, 8)}…{sig.slice(-8)}
                </a>
              </li>
            ))
          ) : (
            <li>Waiting for transactions…</li>
          )}
        </ul>

        {/* Right: stats */}
        <div className="hidden lg:flex flex-col justify-start items-start pl-6 border-l border-gray-700">
          {/* Tx Count */}
          <div className="mb-4">
            <div className="text-sm text-gray-300">Tx Count</div>
            <div className="text-xl font-medium text-white">{txs.length}</div>
          </div>
          {/* Last Updated */}
          <div>
            <div className="text-sm text-gray-300">Last Updated</div>
            <div className="text-xl font-medium text-white">{lastUpdated}</div>
          </div>
        </div>
      </div>
    </section>
  );
}