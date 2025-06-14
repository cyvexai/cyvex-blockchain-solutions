"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Header from "../../components/Header";
import Card from "../../components/Card";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["400", "700"] });

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "No cost",
      features: [
        "Demo mode access",
        "Read-only analytics preview",
        "Community AI insights feed",
      ],
    },
    {
      name: "Basic",
      price: "$18.99/month",
      features: [
        "Live wallet & token tracking (up to 5 wallets)",
        "Portfolio snapshots",
        "Standard AI alerts",
        "Email & on-page notifications",
      ],
    },
    {
      name: "Pro",
      price: "$59.99/month",
      features: [
        "Unlimited wallet & token tracking",
        "Advanced AI-powered alerts",
        "Custom alert builder",
        "API access & priority support",
      ],
    },
  ];

  const [selectedPlan, setSelectedPlan] =
    useState<typeof plans[0] | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"crypto" | "stripe">(
    "crypto"
  );

  // NEW: modal state for Free sign-up
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSelect = (plan: typeof plans[0]) => {
    setSelectedPlan(plan);
  };

  const handleCheckout = () => {
    if (!selectedPlan) return;
    if (selectedPlan.name === "Free") {
      setShowSignUp(true);
    } else {
      alert("Currently Unavailable");
    }
  };

  return (
    <>
      <Header />
      <main className="pt-[200px] pb-20 bg-cyvexBg text-white min-h-screen px-6 space-y-12">
        {/* Page Header */}
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1
            className={`${ubuntu.className} 
            text-4xl md:text-6xl font-bold 
            leading-[1.1] md:leading-[1.1]
            bg-gradient-to-r from-cyvexPurple to-cyvexBlue
            text-transparent bg-clip-text`}
          >
            Pricing Plans
          </h1>
          <p className="text-gray-300">
            Choose the license that best fits your needs.
          </p>
        </div>

        {/* Plans Grid */}
        <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className="flex flex-col p-6 bg-gray-900 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-lg hover:border-cyvexPurple transition"
            >
              <h2 className="text-2xl font-semibold text-white mb-2">
                {plan.name}
              </h2>
              <p className="text-xl font-bold text-white mb-4">{plan.price}</p>
              <ul className="flex-1 list-disc list-inside text-gray-300 space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <button
                onClick={() => handleSelect(plan)}
                className={`mt-auto px-4 py-2 rounded-full font-medium transition transform hover:scale-105 ${
                  selectedPlan?.name === plan.name
                    ? "bg-gray-700 text-gray-300 cursor-default"
                    : "bg-cyvexPurple hover:bg-cyvexBlue text-white"
                }`}
                disabled={selectedPlan?.name === plan.name}
              >
                {selectedPlan?.name === plan.name
                  ? "Selected"
                  : `Select ${plan.name}`}
              </button>
            </Card>
          ))}
        </section>

        {/* Cart & Checkout */}
        {selectedPlan && (
          <section className="max-w-7xl mx-auto space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-2">
                Your Cart
              </h2>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-lg text-white">{selectedPlan.name} Plan</p>
                  <p className="text-xl font-bold text-white">
                    {selectedPlan.price}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  Remove
                </button>
              </div>

              <div className="space-y-3">
                <p className="font-medium">Payment Method</p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value="crypto"
                      checked={paymentMethod === "crypto"}
                      onChange={() => setPaymentMethod("crypto")}
                    />
                    <span className="text-gray-300">Crypto</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value="stripe"
                      checked={paymentMethod === "stripe"}
                      onChange={() => setPaymentMethod("stripe")}
                    />
                    <span className="text-gray-300">
                      Credit Card (Stripe)
                    </span>
                  </label>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-6 w-full py-3 rounded-full font-semibold bg-cyvexPurple hover:bg-cyvexBlue text-white"
              >
                Proceed to Checkout
              </button>
            </Card>
          </section>
        )}

        {/* Payment Methods */}
        <section className="max-w-7xl mx-auto space-y-6 px-6">
          <h2
            className={`
              ${ubuntu.className}
              text-3xl font-bold text-white text-center
            `}
          >
            Payment Methods
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 hover:border-cyvexPurple transition">
              <h3 className="text-xl font-semibold text-white mb-2">
                Crypto Payments
              </h3>
              <p className="text-gray-300">
                We accept major cryptocurrencies directly on-chain.  
                Supported tokens include <strong>SOL, USDC, USDT, ETH</strong>.  
                Simply connect your wallet at checkout and authorize the transaction.
              </p>
            </Card>
            <Card className="p-6 hover:border-cyvexPurple transition">
              <h3 className="text-xl font-semibold text-white mb-2">
                Credit Card (Stripe)
              </h3>
              <p className="text-gray-300">
                Pay securely by credit or debit card via our Stripe integration.  
                We accept <em>Visa, Mastercard, American Express</em>, and more—no wallet required.
              </p>
            </Card>
          </div>
        </section>
      </main>

      {/* ---- Sign-Up Modal for Free Plan ---- */}
      {showSignUp && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gray-900 bg-opacity-80 backdrop-blur-xl rounded-2xl p-8 w-full max-w-sm mx-4 space-y-6 shadow-2xl">
            <h3 className="text-2xl font-bold text-white text-center">
              Activate Your Free Plan
            </h3>
            <p className="text-gray-300 text-center">
              Sign up with one of the following to continue:
            </p>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => signIn("google")}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-200 transition shadow"
              >
                {/* You can swap in an SVG or Image icon here */}
                Sign in with Google
              </button>
              <button
                onClick={() => signIn("linkedin")}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-full font-medium hover:bg-blue-600 transition shadow"
              >
                Sign in with LinkedIn
              </button>
            </div>
            <button
              onClick={() => setShowSignUp(false)}
              className="block mx-auto text-gray-400 hover:text-gray-200 mt-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}