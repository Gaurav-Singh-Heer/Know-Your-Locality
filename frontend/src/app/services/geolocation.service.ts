import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TravelMode } from '../models/user.model';
import { environment } from '../../environments/environment';

export interface Coords { lat: number; lng: number; accuracy?: number; }

@Injectable({ providedIn: 'root' })
export class GeolocationService {
  private _platformId = inject(PLATFORM_ID);
  private _isBrowser = isPlatformBrowser(this._platformId);

  readonly coords = signal<Coords | null>(null);
  readonly error = signal<string | null>(null);
  readonly status = signal<'idle' | 'requesting' | 'granted' | 'denied' | 'unavailable'>('idle');

  /** Per-mode caps. Source of truth = environment.distanceCaps. */
  readonly caps = environment.distanceCaps;

  capFor(mode: TravelMode): number {
    return this.caps[mode];
  }

  /** Clamp a desired distance to the cap for the given mode. */
  clamp(mode: TravelMode, km: number): number {
    const cap = this.capFor(mode);
    if (Number.isNaN(km)) return cap;
    return Math.min(Math.max(1, Math.round(km)), cap);
  }

  /** Ask the browser for location. Resolves to coords or null. */
  async request(): Promise<Coords | null> {
    if (!this._isBrowser || !('geolocation' in navigator)) {
      this.status.set('unavailable');
      this.error.set('Geolocation is not available.');
      return null;
    }
    this.status.set('requesting');
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const c: Coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
          };
          this.coords.set(c);
          this.status.set('granted');
          this.error.set(null);
          resolve(c);
        },
        (err) => {
          this.status.set(err.code === err.PERMISSION_DENIED ? 'denied' : 'unavailable');
          this.error.set(err.message);
          resolve(null);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    });
  }
}
