const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
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
        destination: '/services',
        permanent: true,
      },
      {
        source: '/features/',
        destination: '/services',
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
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/contact-us/',
        destination: '/contact',
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
        destination: '/contact',
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
        ],
      },
    ]
  },
}

module.exports = nextConfig