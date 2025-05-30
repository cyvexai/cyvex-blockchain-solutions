"use client";
import { useEffect, useState } from 'react';

interface AnalyticsData {
  volume: number;
  topToken: string;
  tps: number;
  slot: number;
}

export default function AnalyticsPreview() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load analytics');
        return res.json();
      })
      .then((json: AnalyticsData) => setData(json))
      .catch(err => setError(err.message));
  }, []);

  const renderStats = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center text-center flex-1">
      <div>
        <h3 className="text-sm text-gray-400">Real-Time Token Volume (24h) SOL</h3>
        <p className="mt-1 text-xl font-semibold text-white">
          ${data!.volume.toLocaleString()}
        </p>
      </div>
      <div>
        <h3 className="text-sm text-gray-400">Top Token (24h)</h3>
        <p className="mt-1 text-xl font-semibold text-white">{data!.topToken}</p>
      </div>
      <div>
        <h3 className="text-sm text-gray-400">Network TPS</h3>
        <p className="mt-1 text-xl font-semibold text-white">
          {data!.tps.toFixed(2)} tx/s
        </p>
      </div>
      <div>
        <h3 className="text-sm text-gray-400">Current Slot</h3>
        <p className="mt-1 text-xl font-semibold text-white">{data!.slot}</p>
      </div>
    </div>
  );

  // this container now fills its parent height and is a flex column
  const containerClasses =
    "h-full flex flex-col p-6 bg-gray-900 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-lg";

  if (error) {
    return (
      <section className={containerClasses}>
        <p className="text-red-500 text-center flex-1 flex items-center justify-center">
          Error loading analytics: {error}
        </p>
      </section>
    );
  }

  if (!data) {
    return (
      <section className={containerClasses}>
        <p className="text-center flex-1 flex items-center justify-center">
          Loading analytics...
        </p>
      </section>
    );
  }

  return (
    <section className={containerClasses}>
      {renderStats()}
    </section>
  );
}