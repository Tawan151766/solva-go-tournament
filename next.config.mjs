/** @type {import('next').NextConfig} */
const nextConfig = {
  // Suppress Ant Design React version compatibility warnings
  webpack: (config) => {
    // Suppress specific warnings
    config.ignoreWarnings = [
      /antd.*compatible/,
      /React.*compatible/,
      /colorBgBody.*deprecated/,
      /Component Token.*deprecated/,
    ];
    
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    return config;
  },
  
  // Experimental features for React 19 compatibility
  experimental: {
    reactCompiler: false,
  },
  
  // Suppress console warnings in development
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;
