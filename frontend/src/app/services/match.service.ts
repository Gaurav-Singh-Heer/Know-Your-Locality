import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { MatchedUser } from '../models/user.model';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class MatchService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);

  readonly matches = signal<MatchedUser[]>([]);
  readonly loading = signal(false);

  async fetchMatches() {
    const token = this.auth.token();
    if (!token) return;
    this.loading.set(true);
    try {
      const results = await firstValueFrom(
        this.http.get<MatchedUser[]>(`${environment.apiBase}/users/matches`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      );
      this.matches.set(results ?? []);
    } catch {
      // keep empty
    } finally {
      this.loading.set(false);
    }
  }
}
