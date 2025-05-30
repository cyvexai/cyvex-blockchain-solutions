import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

interface SignatureResult {
  signature: string;
}

export async function GET(_req: NextRequest) {
  const rpcUrl = "https://api.mainnet-beta.solana.com";

  try {
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
    const raw = Array.isArray(json.result) ? json.result : [];

    const signatures: string[] = raw
      .map((entry: unknown) => {
        if (typeof entry === "object" && entry !== null) {
          const maybe = entry as Partial<SignatureResult>;
          if (typeof maybe.signature === "string") {
            return maybe.signature;
          }
        }
        return undefined;
      })
      .filter((sig: string | undefined): sig is string => typeof sig === "string");

    return NextResponse.json({ signatures });
  } catch (err) {
    console.error("API /transactions error:", err);
    return NextResponse.json({ signatures: [] });
  }
}