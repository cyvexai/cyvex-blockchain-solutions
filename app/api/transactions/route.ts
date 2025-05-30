import type { NextRequest } from "next/server";

export async function GET(_req: NextRequest) {
  const rpcUrl = "https://api.mainnet-beta.solana.com";

  try {
    // Fetch the last 10 signatures involving the System Program
    const res = await fetch(rpcUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getSignaturesForAddress",
        params: ["11111111111111111111111111111111", { limit: 5 }],
      }),
    });
    if (!res.ok) throw new Error(`RPC error ${res.status}`);
    const json = await res.json();
    const sigs = Array.isArray(json.result)
      ? json.result.map((item: any) => item.signature)
      : [];

    return new Response(JSON.stringify({ signatures: sigs }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error("API /transactions error:", e);
    // On any failure, return an empty list (rather than 500)
    return new Response(JSON.stringify({ signatures: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}