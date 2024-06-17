/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['jsx', 'tsx', 'mdx', 'ts', 'js'],
  transpilePackages: ['three'],
}

module.exports = nextConfig
