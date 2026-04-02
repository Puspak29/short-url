const BACKEND_URL = process.env.VITE_BACKEND_URL;

if (!BACKEND_URL) {
  throw new Error(
    'VITE_BACKEND_URL environment variable is not defined. ' +
    'Set it in Vercel project settings.'
  );
}

const config = {
  rewrites: [
    {
      source: '/api/:path*',
      destination: `${BACKEND_URL}/api/:path*`,
    },
    {
      source: '/r/:path*',
      destination: `${BACKEND_URL}/r/:path*`,
    },
  ],
};

export default config;