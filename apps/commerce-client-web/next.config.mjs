/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shopping-phinf.pstatic.net',
        port: '',
        pathname: '/main_*/**',
      },
      {
        protocol: 'https',
        hostname: 'shopping-phinf.pstatic.net',
        port: '',
        pathname: '/noimage/**',
      },
    ],
  },
  experimental: {
    instrumentationHook: true,
  },
  webpack: (config, { isServer }) => {
    const name = isServer ? 'msw/browser' : 'msw/node';

    if (Array.isArray(config.resolve.alias)) {
      config.resolve.alias.push({ name, alias: false });
    } else {
      config.resolve.alias[name] = false;
    }

    return config;
  },
};

export default nextConfig;
