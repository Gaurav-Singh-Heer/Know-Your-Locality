export const environment = {
  production: false,
  apiBase: 'http://localhost:3000/api',
  wsBase: 'ws://localhost:3000/ws',
  // Replace with your Google OAuth client id (Web). Authorized JS origin: http://localhost:4200
  googleClientId: '615157550427-m09oeg0g2na5s23gbr768hg98p5dass2.apps.googleusercontent.com',
  // Per-mode caps (km). Server enforces too.
  distanceCaps: { car: 80, bike: 40, walk: 20 } as const,
};
