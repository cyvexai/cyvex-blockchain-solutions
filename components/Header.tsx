"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Ubuntu, Space_Grotesk } from "next/font/google";

const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["400", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "700"] });

declare global {
  interface PhantomProvider {
    isPhantom?: boolean;
    connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: { toString(): string } }>;
    on: (evt: string, cb: () => void) => void;
    publicKey: { toString(): string };
  }
  interface Window {
    solana?: PhantomProvider;
  }  
}

export default function Header() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const provider = window.solana;
    if (provider && provider.isPhantom) {
      provider.on("connect", () =>
        setWalletAddress(provider.publicKey.toString())
      );
      provider.on("disconnect", () => setWalletAddress(null));
      provider.connect({ onlyIfTrusted: true }).catch(() => {});
    }
  }, []);

  const connectWallet = async () => {
    const provider = window.solana;
    if (provider && provider.isPhantom) {
      try {
        const resp = await provider.connect();
        setWalletAddress(resp.publicKey.toString());
      } catch (err) {
        console.error("Connection error:", err);
      }
    } else {
      window.open("https://phantom.app/", "_blank");
    }
  };

  const shortAddress = walletAddress
    ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
    : null;

  return (
    <header className="fixed top-0 left-0 w-full bg-cyvexBg/30 backdrop-blur-3xl z-50">
      <div className="w-full flex justify-between items-center px-2 py-0">
        {/* Logo + Title */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/newlogo.png"
            alt="Cyvex Logo"
            width={55}
            height={55}
            className="object-contain"
          />
          <span
            className={`${spaceGrotesk.className} text-xl md:text-2xl font-normal text-gray`}
          >
            Cyvex Blockchain Solutions
          </span>
        </Link>

        {/* Centered Nav */}
        <nav className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-6">
          <Link
            href="/"
            className={`${ubuntu.className} text-white hover:text-cyvexPurple transition`}
          >
            Home
          </Link>
          <Link
            href="/demo"
            className={`${ubuntu.className} text-white hover:text-cyvexPurple transition`}
          >
            Demo
          </Link>
          <Link
            href="/token-distribution"
            className={`${ubuntu.className} text-white hover:text-cyvexPurple transition`}
          >
            Token Distribution
          </Link>
          <Link
            href="/whitepaper"
            className={`${ubuntu.className} text-white hover:text-cyvexPurple transition`}
          >
            Whitepaper
          </Link>
          <Link
            href="#how-it-works"
            className={`${ubuntu.className} text-white hover:text-cyvexPurple transition`}
          >
            How It Works
          </Link>
        </nav>

        {/* Connect Wallet Button */}
        <button onClick={connectWallet} className="btn-primary">
          {shortAddress ?? "Connect Wallet"}
        </button>
      </div>
    </header>
  );
}