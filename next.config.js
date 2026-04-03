/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/meta/:path*',
          destination: 'https://graph.instagram.com/v18.0/:path*',
        },
      ],
    };
  },
}

module.exports = nextConfig
