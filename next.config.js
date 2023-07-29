// const withPlugins = require('next-compose-plugins')
// const optimizedImages = require('next-optimized-images')

// const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['jsx', 'tsx', 'mdx'],
}

module.exports = nextConfig

// module.exports = withPlugins([
//   [
//     optimizedImages,
//     {
//       optimizeImages: true,
//       optimizeImagesInDev: true,
//       svgo: {},
//       runtimeGenerator: require.resolve(
//         path.resolve(
//           'node_modules',
//           'next-optimized-images',
//           'lib',
//           'loaders',
//           'svg-sprite-loader',
//           'svg-runtime-generator.js'
//         )
//       ),
//     },
//   ],
// ])
