/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 3600,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    quality: 80,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    optimizePackageImports: ['@headlessui/react', '@heroicons/react', 'date-fns', 'lucide-react'],
    serverActions: true,
    typedRoutes: true,
    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'TTFB', 'INP'],
  },
  poweredByHeader: false,
  compress: true,
  output: 'standalone',
  generateEtags: true,
  httpAgentOptions: {
    keepAlive: true,
  },
  onDemandEntries: {
    maxInactiveAge: 24 * 60 * 60 * 1000,
    pagesBufferLength: 5,
  },
  productionBrowserSourceMaps: false,
  staticPageGenerationTimeout: 120,
  crossOrigin: 'anonymous',
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  optimizeFonts: true,
  distDir: '.next',
  cleanDistDir: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    },
  ],
};


module.exports = nextConfig;