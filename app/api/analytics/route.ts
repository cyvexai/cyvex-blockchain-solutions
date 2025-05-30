import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // 1) CoinGecko: top Solana token by volume
    const cgRes = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=solana-ecosystem&order=volume_desc&per_page=1&sparkline=false'
    );
    if (!cgRes.ok) throw new Error('CoinGecko fetch failed');
    const cgJson = await cgRes.json();
    if (!cgJson.length) throw new Error('No CoinGecko data');
    const top = cgJson[0];
    
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
    const sample = perfJson.result[0];
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
    const slot = slotJson.result;

    const result = {
      volume: top.total_volume,
      topToken: top.name,
      tps,
      slot,
    };

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || 'Unknown error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}