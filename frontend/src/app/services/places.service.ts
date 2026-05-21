import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Place, PlaceCategory } from '../models/place.model';
import { TravelMode } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PlacesService {
  private http = inject(HttpClient);

  private _places = signal<Place[]>([]);
  private _category = signal<PlaceCategory | 'all'>('all');
  private _travelMode = signal<TravelMode>('car');
  private _maxDistance = signal<number>(10);
  private _lat: number | null = null;
  private _lng: number | null = null;

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly locationName = signal<string>('Current Location');

  readonly selectedCategory = this._category.asReadonly();
  readonly selectedTravelMode = this._travelMode.asReadonly();
  readonly maxDistance = this._maxDistance.asReadonly();

  readonly filteredPlaces = computed(() =>
    this._places().filter(p => {
      const catMatch = this._category() === 'all' || p.category === this._category();
      const distMatch = p.distance <= this._maxDistance();
      return catMatch && distMatch;
    })
  );

  async fetchNearby(lat: number, lng: number, name?: string) {
    this._lat = lat;
    this._lng = lng;
    if (name) this.locationName.set(name);
    this.loading.set(true);
    this.error.set(null);
    try {
      const places = await firstValueFrom(
        this.http.get<Place[]>(`${environment.apiBase}/places`, {
          params: { lat, lng, radius: this._maxDistance() },
        })
      );
      this._places.set(places ?? []);
    } catch {
      this.error.set('Could not load nearby places.');
    } finally {
      this.loading.set(false);
    }
  }

  async searchLocation(query: string): Promise<{ lat: number; lng: number; name: string } | null> {
    try {
      return await firstValueFrom(
        this.http.get<{ lat: number; lng: number; name: string }>(
          `${environment.apiBase}/places/geocode`,
          { params: { q: query } }
        )
      );
    } catch {
      return null;
    }
  }

  refresh() {
    if (this._lat !== null && this._lng !== null) {
      this.fetchNearby(this._lat, this._lng);
    }
  }

  setCategory(cat: PlaceCategory | 'all') { this._category.set(cat); }
  setTravelMode(mode: TravelMode) { this._travelMode.set(mode); }
  setMaxDistance(d: number) { this._maxDistance.set(d); }
  getTravelTime(place: Place): number { return place.travelTime[this._travelMode()]; }
}
