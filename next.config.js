/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['jsx', 'tsx', 'mdx', 'ts', 'js'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rkryihhsdyaowolehcyd.supabase.co',
        pathname: '/storage/v1/object/public/bookshelf/**',
      },
    ],
  },
}

module.exports = nextConfig
