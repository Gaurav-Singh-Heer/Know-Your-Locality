import { Component, computed, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { GeolocationService } from '../../services/geolocation.service';
import { TravelMode } from '../../models/user.model';

const ALL_INTERESTS = [
  { id: 'travel', label: '✈️ Travel' }, { id: 'food', label: '🍔 Food' },
  { id: 'music', label: '🎵 Music' }, { id: 'fitness', label: '💪 Fitness' },
  { id: 'tech', label: '💻 Tech' }, { id: 'art', label: '🎨 Art' },
  { id: 'gaming', label: '🎮 Gaming' }, { id: 'reading', label: '📚 Reading' },
  { id: 'photography', label: '📸 Photography' }, { id: 'yoga', label: '🧘 Yoga' },
  { id: 'coffee', label: '☕ Coffee' }, { id: 'movies', label: '🎬 Movies' },
  { id: 'sports', label: '⚽ Sports' }, { id: 'dance', label: '💃 Dance' },
  { id: 'nature', label: '🌿 Nature' }, { id: 'shopping', label: '🛍️ Shopping' },
];

@Component({
  selector: 'app-preferences',
  imports: [FormsModule],
  templateUrl: './preferences.html',
})
export class PreferencesPage {
  geo = inject(GeolocationService);

  step = signal(1);
  interests = ALL_INTERESTS;
  selected = new Set<string>();
  travelMode = signal<TravelMode>('bike');
  maxDistance = signal(10);
  bio = '';
  age = '';
  location = '';
  saving = signal(false);
  saveError = signal('');

  /** The cap for the currently-selected mode. */
  cap = computed(() => this.geo.capFor(this.travelMode()));

  constructor(private auth: AuthService, private router: Router) {
    // Try to grab location automatically when the user reaches step 1
    this.geo.request().then((c) => {
      if (c) this.location = `${c.lat.toFixed(4)}, ${c.lng.toFixed(4)}`;
    });
  }

  toggleInterest(id: string) {
    if (this.selected.has(id)) this.selected.delete(id);
    else this.selected.add(id);
  }

  isSelected(id: string) { return this.selected.has(id); }

  setTravel(mode: TravelMode) {
    this.travelMode.set(mode);
    // Re-clamp distance to the new cap
    this.maxDistance.set(this.geo.clamp(mode, this.maxDistance()));
  }

  setDistance(v: number) {
    this.maxDistance.set(this.geo.clamp(this.travelMode(), v));
  }

  async useMyLocation() {
    const c = await this.geo.request();
    if (c) this.location = `${c.lat.toFixed(4)}, ${c.lng.toFixed(4)}`;
  }

  nextStep() { this.step.update(s => Math.min(s + 1, 3)); }
  prevStep() { this.step.update(s => Math.max(s - 1, 1)); }

  async finish() {
    this.saving.set(true);
    this.saveError.set('');
    const coords = this.geo.coords();
    const user = await this.auth.updatePreferences({
      interests: [...this.selected],
      travelMode: this.travelMode(),
      maxDistance: this.maxDistance(),
      bio: this.bio,
      age: this.age ? parseInt(this.age) : undefined,
      location: this.location || undefined,
      ...(coords ? { coords: { lat: coords.lat, lng: coords.lng } as any } : {}),
    });
    this.saving.set(false);
    if (user) this.router.navigate(['/dashboard']);
    else this.saveError.set('Could not save preferences. Are you signed in?');
  }

  travelModes: { mode: TravelMode; icon: string; label: string; desc: string }[] = [
    { mode: 'car', icon: '🚗', label: 'Car', desc: 'Up to 80 km' },
    { mode: 'bike', icon: '🚲', label: 'Bike', desc: 'Up to 40 km' },
    { mode: 'walk', icon: '🚶', label: 'Walk', desc: 'Up to 20 km' },
  ];
}
