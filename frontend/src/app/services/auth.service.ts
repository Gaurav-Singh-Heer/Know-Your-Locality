import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

const TOKEN_KEY = 'kyk_token';
const USER_KEY = 'kyk_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _platformId = inject(PLATFORM_ID);
  private _isBrowser = isPlatformBrowser(this._platformId);

  private _user = signal<User | null>(null);
  private _token = signal<string | null>(null);

  readonly currentUser = this._user.asReadonly();
  readonly token = this._token.asReadonly();
  readonly isLoggedIn = computed(() => this._user() !== null && this._token() !== null);
  readonly hasPreferences = computed(() => this._user()?.preferencesSet === true);

  constructor() {
    if (this._isBrowser) {
      const t = localStorage.getItem(TOKEN_KEY);
      const u = localStorage.getItem(USER_KEY);
      if (t) this._token.set(t);
      if (u) { try { this._user.set(JSON.parse(u)); } catch { /* ignore */ } }
      if (t) this.fetchMe().catch(() => this.logout());
    }
  }

  /** Sign in / sign up via Google ID token (credential string from GIS). */
  async signInWithGoogle(credential: string): Promise<User> {
    const res = await fetch(`${environment.apiBase}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential }),
    });
    if (!res.ok) throw new Error('Google sign-in failed');
    const data = await res.json();
    this._save(data.token, data.user);
    return data.user;
  }

  /** Create a new account with email and password. */
  async signUpWithEmail(name: string, email: string, password: string): Promise<User> {
    const res = await fetch(`${environment.apiBase}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error || 'Sign-up failed');
    this._save(data.token, data.user);
    return data.user;
  }

  /** Sign in with email and password. */
  async signInWithEmail(email: string, password: string): Promise<User> {
    const res = await fetch(`${environment.apiBase}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error || 'Sign-in failed');
    this._save(data.token, data.user);
    return data.user;
  }

  async fetchMe(): Promise<User | null> {
    const t = this._token();
    if (!t) return null;
    const res = await fetch(`${environment.apiBase}/auth/me`, {
      headers: { Authorization: `Bearer ${t}` },
    });
    if (!res.ok) return null;
    const { user } = await res.json();
    this._setUser(user);
    return user;
  }

  async updatePreferences(prefs: Partial<User>): Promise<User | null> {
    const t = this._token();
    if (!t) return null;
    const res = await fetch(`${environment.apiBase}/users/me`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${t}` },
      body: JSON.stringify(prefs),
    });
    if (!res.ok) return null;
    const { user } = await res.json();
    this._setUser(user);
    return user;
  }

  logout(): void {
    this._user.set(null);
    this._token.set(null);
    if (this._isBrowser) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }

  private _save(token: string, user: User): void {
    this._token.set(token);
    this._setUser(user);
    if (this._isBrowser) localStorage.setItem(TOKEN_KEY, token);
  }

  private _setUser(user: User): void {
    this._user.set(user);
    if (this._isBrowser) localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}
