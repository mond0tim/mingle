import type { NextConfig } from 'next';
import withPWAInit from 'next-pwa';

const pwaWrapper = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: true,
  importScripts: ['/workbox/index.js'],
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|mp3)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-assets',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
      },
    },
    {
      urlPattern: /^\/api\/.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 24 * 60 * 60,
        },
        networkTimeoutSeconds: 10,
      },
    },
  ],
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',


  // New Next.js 15/16 Turbopack location
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    return config;
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

// Use 'any' to bridge the gap between Next 16 types and next-pwa's Next 13 types
export default pwaWrapper(nextConfig as any);
