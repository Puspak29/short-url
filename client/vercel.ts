const config = {
  rewrites: [
    {
      source: '/api/:path*',
      destination: 'https://@env:VITE_BACKEND_URL/api/:path*',
    },
    {
      source: '/r/:path*',
      destination: 'https://@env:VITE_BACKEND_URL/r/:path*',
    },
  ],
};

export default config;