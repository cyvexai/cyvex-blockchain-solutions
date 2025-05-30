"use client";

import Link from "next/link";
import { Twitter, Github, Mail, ChevronRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {[
              ["/", "Home"],
              ["/demo", "Demo"],
              ["/token-distribution", "Token Distribution"],
              ["/whitepaper", "Whitepaper"],
            ].map(([href, label]) => (
              <li key={href} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-cyvexPurple" />
                <Link href={href} className="hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-white font-semibold mb-4">Resources</h4>
          <ul className="space-y-2">
            {[
              ["https://cyvex-ai.gitbook.io/cyvex-documentation/", "Documentation"],
              ["https://cyvex-ai.gitbook.io/cyvex-documentation/api-reference", "API Reference"],
              ["https://dexscreener.com", "Dexscreener"],
            ].map(([href, label]) => (
              <li key={href} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-cyvexPurple" />
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="text-white font-semibold mb-4">Connect</h4>
          <div className="flex items-center space-x-6">
            <a
              href="https://x.com/CyvexAI"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="hover:text-white"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="https://cyvex-ai.gitbook.io/cyvex-documentation/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-white"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="mailto:cyvex.ai@mail.com"
              aria-label="Email"
              className="hover:text-white"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Cyvex AI. All rights reserved.
      </div>
    </footer>
  );
}