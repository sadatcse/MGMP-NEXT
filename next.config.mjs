/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  allowedDevOrigins: ['192.168.0.167', '192.168.0.167:3000'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ibb.co' },
      { protocol: 'https', hostname: 'img.daisyui.com' },
    ],
  },
};

export default nextConfig;
