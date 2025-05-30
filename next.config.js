/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ← this tells Next.js: run ESLint in `next dev` but IGNORE errors in `next build`
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig