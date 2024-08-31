/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.yes24.com',
        port: '',
        pathname: '/goods/**',
      },
    ],
  },
};

export default nextConfig;
