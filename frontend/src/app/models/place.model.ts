export type PlaceCategory = 'park' | 'restaurant' | 'club' | 'cafe' | 'museum' | 'gym' | 'shopping';

export interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  description: string;
  distance: number;
  rating: number;
  emoji: string;
  address: string;
  openNow: boolean;
  tags: string[];
  travelTime: { car: number; bike: number; walk: number };
}
