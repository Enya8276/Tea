const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['szukwpthlofuyegmhppx.supabase.co'],
  },
  i18n: {
    locales: ['zh', 'en'],
    defaultLocale: 'zh',
  },
  webpack: (config) => {
    // Fallback alias so CI (Linux) resolves `@/` the same as local
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname),
    }
    return config
  },
}

module.exports = nextConfig 