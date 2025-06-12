"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // ---- NEW state for popup ----
  const [showModal, setShowModal]   = useState(false);
  const [betaMode, setBetaMode]     = useState(false);
  const [authKey, setAuthKey]       = useState("");
  const [authError, setAuthError]   = useState<string | null>(null);

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

    // when some other part of the app wants to open the Dashboard modal:
  useEffect(() => {
    const handler = () => setShowModal(true);
    window.addEventListener("openDashboard", handler);
    return () => window.removeEventListener("openDashboard", handler);
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

  // ---- NEW handlers for popup ----
  const handleDemo = () => {
    setShowModal(false);
    router.push("/demo");
  };

  const handleBetaSubmit = () => {
    // for now, always fail:
    setAuthError("Invalid Auth Key");
  };

  return (
    <>
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

            {/* Dashboard now triggers our modal */}
            <button
              onClick={() => setShowModal(true)}
              className={`${ubuntu.className} text-white hover:text-cyvexPurple transition`}
            >
              Dashboard
            </button>

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

      {/* ---- DASHBOARD SELECTION MODAL ---- */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 bg-opacity-90 backdrop-blur-lg rounded-lg p-8 w-full max-w-md space-y-6">
            {!betaMode ? (
              <>
                <h3 className="text-xl font-semibold text-white text-center">
                  Choose Mode
                </h3>
                <div className="flex justify-around">
                  <button
                    onClick={handleDemo}
                    className="px-6 py-2 bg-cyvexPurple rounded-full text-white hover:bg-cyvexBlue transition"
                  >
                    Demo
                  </button>
                  <button
                    onClick={() => {
                      setBetaMode(true);
                      setAuthError(null);
                    }}
                    className="px-6 py-2 bg-gray-800 rounded-full text-gray-300 hover:bg-gray-700 transition"
                  >
                    Beta Access
                  </button>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="block mx-auto mt-4 text-gray-400 hover:text-gray-200"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-white text-center">
                  Enter Beta Auth Key
                </h3>
                <input
                  type="text"
                  value={authKey}
                  onChange={(e) => {
                    setAuthKey(e.target.value);
                    setAuthError(null);
                  }}
                  placeholder="xxxx-xxxx-xxxx"
                  className="w-full p-2 bg-gray-800 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyvexPurple"
                />
                {/* ← show our new error message */}
                {authError && (
                  <p className="text-red-400 text-sm text-center">
                    {authError}
                  </p>
                )}
                <div className="flex justify-between">
                  <button
                    onClick={() => {
                      setBetaMode(false);
                      setAuthKey("");
                      setAuthError(null);
                    }}
                    className="px-4 py-2 bg-gray-700 rounded-full text-gray-200 hover:bg-gray-600 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleBetaSubmit}
                    className="px-4 py-2 bg-cyvexPurple rounded-full text-white hover:bg-cyvexBlue transition"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}