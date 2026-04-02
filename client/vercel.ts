const backendUrl = process.env.VITE_BACKEND_URL;

export const config = {
    rewrites: [
    {
      source: '/api/:path*',
      destination: `${backendUrl}/api/:path*`,
    },
    {
      source: '/r/:path*',
      destination: `${backendUrl}/r/:path*`,
    },
  ],
};