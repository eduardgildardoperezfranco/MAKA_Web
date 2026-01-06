/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Enable trailing slash for consistent URLs (SEO best practice)
  trailingSlash: true,
  
  // Static export configuration
  output: 'export',
  
  // Redirect root path to Spanish locale
  async redirects() {
    return [
      {
        source: '/',
        destination: '/es/',
        permanent: true, // Returns 308 Permanent Redirect status
      },
    ];
  },
};

module.exports = nextConfig;
