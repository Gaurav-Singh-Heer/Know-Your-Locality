export const environment = {
  production: false,
  apiBase: 'https://know-your-locality.onrender.com/api',
  wsBase: 'wss://know-your-locality.onrender.com/ws',
  // Replace with your Google OAuth client id (Web). Authorized JS origin: https://know-your-locality.onrender.com
  googleClientId: '615157550427-m09oeg0g2na5s23gbr768hg98p5dass2.apps.googleusercontent.com',
  // Per-mode caps (km). Server enforces too.
  distanceCaps: { car: 80, bike: 40, walk: 20 } as const,
};
