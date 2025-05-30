import { NextRequest, NextResponse } from 'next/server';

interface AnalyticsData {
  volume: number;
  topToken: string;
  tps: number;
  slot: number;
}

export async function GET(_req: NextRequest) {
  try {
    // 1) CoinGecko: top Solana token by volume
    const cgRes = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=solana-ecosystem&order=volume_desc&per_page=1&sparkline=false'
    );
    if (!cgRes.ok) throw new Error('CoinGecko fetch failed');
    const cgJson = await cgRes.json();
    if (!Array.isArray(cgJson) || cgJson.length === 0) {
      throw new Error('No CoinGecko data');
    }
    const top = cgJson[0] as { total_volume: number; name: string };

    // 2) Solana RPC: performance samples
    const rpcUrl = 'https://api.mainnet-beta.solana.com';
    const perfRes = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getRecentPerformanceSamples',
        params: [1],
      }),
    });
    if (!perfRes.ok) throw new Error('RPC perf fetch failed');
    const perfJson = await perfRes.json();
    const sample = (perfJson.result as Array<{ numTransactions: number; samplePeriodSecs: number }>)[0];
    const tps = sample.numTransactions / sample.samplePeriodSecs;

    // 3) Solana RPC: current slot
    const slotRes = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getSlot',
      }),
    });
    if (!slotRes.ok) throw new Error('RPC slot fetch failed');
    const slotJson = await slotRes.json();
    const slot = slotJson.result as number;

    const result: AnalyticsData = {
      volume: top.total_volume,
      topToken: top.name,
      tps,
      slot,
    };

    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}