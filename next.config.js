const path = require('path');

const nextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  async redirects() {
    return [
      // Old page redirects
      {
        source: '/features',
        destination: '/services/ai',
        permanent: true,
      },
      {
        source: '/features/',
        destination: '/services/ai',
        permanent: true,
      },
      {
        source: '/home-2',
        destination: '/',
        permanent: true,
      },
      {
        source: '/home-2/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/our-story',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/our-story/',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/#contact',
        permanent: true,
      },
      {
        source: '/contact-us/',
        destination: '/#contact',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/about-us/',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/careers',
        destination: '/#contact',
        permanent: true,
      },
      // 旧LINE bot版の公開レポート /research/* は廃止。既存リンク（リードマグネット等）を
      // 404にせず、実際に試せる新ツール /tools/research へ恒久リダイレクトして生かす。
      {
        source: '/research',
        destination: '/tools/research',
        permanent: true,
      },
      {
        source: '/research/:slug*',
        destination: '/tools/research',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          // クリックジャッキング防止（自ドメイン埋め込みのみ許可）
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // MIMEスニッフィング防止
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // リファラのURL情報漏洩を抑制
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // 使わない強権限を既定で無効化
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          // CSP: Next(inline)・reCAPTCHA(google/gstatic)・GA(googletagmanager/google-analytics)
          // ・WebGL(blob worker)・粒子/グレイン(data:)を許可した実用的ポリシー。
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "base-uri 'self'",
              "object-src 'none'",
              "frame-ancestors 'self'",
              "form-action 'self'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              "style-src 'self' 'unsafe-inline'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://www.googletagmanager.com https://www.google-analytics.com",
              "connect-src 'self' https://www.google.com https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com https://*.google-analytics.com",
              "frame-src https://www.google.com",
              "worker-src 'self' blob:",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig