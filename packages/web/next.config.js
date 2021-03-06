require('dotenv').config();
const path = require('path');
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['@jaime-sandbox-2/components', '@last-rev/component-library']);

// Allow bundle analysis via ANALYZE_BUNDLE env variable
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: !!(process.env.ANALYZE_BUNDLE && process.env.ANALYZE_BUNDLE.toLowerCase() === 'true')
});

const nextConfig = {
  /**
   * @type {import('next').NextConfig}
   */
  // Disabled due to error https://github.com/vercel/next.js/issues/30429
  swcMinify: false,
  i18n: {
    // TODO: generate these and read from that
    locales: ['en-US'],
    defaultLocale: 'en-US'
  },
  trailingSlash: true,
  reactStrictMode: true,
  env: {
    CONTENTFUL_SETTINGS_ID: process.env.CONTENTFUL_SETTINGS_ID,
    GRAPHQL_SERVER_URL: process.env.GRAPHQL_SERVER_URL,
    CONTENTFUL_USE_PREVIEW: process.env.CONTENTFUL_USE_PREVIEW,
    SITE: process.env.SITE,
    SITE_SETTINGS: process.env.SITE_SETTINGS,
    DEFAULT_SITE_ID: process.env.DEFAULT_SITE_ID || process.env.SITE_ID,
    SITE_ID: process.env.DEFAULT_SITE_ID || process.env.SITE_ID,
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_DELIVERY_TOKEN: process.env.CONTENTFUL_DELIVERY_TOKEN,
    CONTENTFUL_PREVIEW_TOKEN: process.env.CONTENTFUL_PREVIEW_TOKEN,
    CONTENTFUL_ENV: process.env.CONTENTFUL_ENV,
    DEPLOY_URL: process.env.DEPLOY_URL
  },
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  webpack: (config) => {
    // Important: return the modified config
    config.resolve.alias = {
      ...config.resolve.alias,
      'react': path.resolve(__dirname, '../../node_modules', 'react'),
      '@mui': path.resolve(__dirname, '../../node_modules/@mui')
    };
    return config;
  }
};

module.exports = withPlugins([[withTM], withBundleAnalyzer], nextConfig);
