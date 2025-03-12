/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      // Bật hỗ trợ top-level await trong Webpack
      config.experiments = { topLevelAwait: true };
      return config;
    },
    reactStrictMode: true, // Bật React Strict Mode
  };
  
module.exports = nextConfig;
