export type TravelMode = 'car' | 'bike' | 'walk';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  age?: number;
  location?: string;
  coords?: { lat: number; lng: number };
  interests: string[];
  travelMode: TravelMode;
  maxDistance: number;
  bio?: string;
  preferencesSet?: boolean;
}

export interface MatchedUser extends User {
  compatibility: number;
  mutualInterests: string[];
}
