/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // Ensure Three.js and related packages are transpiled correctly
  transpilePackages: ['three'],
  webpack: (config) => {
    // Support for GLSL shader files
    config.module.rules.push({
      test: /\.(glsl|vert|frag)$/,
      use: 'raw-loader',
      exclude: /node_modules/,
    });
    return config;
  },
};

module.exports = nextConfig;
