export const environment = {
  production: true,
  apiBase: 'https://know-your-locality-back.vercel.app/api',
  wsBase: 'wss://know-your-locality-back.vercel.app/ws',
  googleClientId: '615157550427-m09oeg0g2na5s23gbr768hg98p5dass2.apps.googleusercontent.com',
  distanceCaps: { car: 80, bike: 40, walk: 20 } as const,
};
