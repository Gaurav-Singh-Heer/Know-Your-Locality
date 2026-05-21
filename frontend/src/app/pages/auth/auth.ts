import { Component, AfterViewInit, ElementRef, ViewChild, signal, NgZone, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

declare const google: any;

type Mode = 'signin' | 'signup';

@Component({
  selector: 'app-auth',
  imports: [FormsModule, NgClass],
  templateUrl: './auth.html',
})
export class AuthPage implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  loading = signal(false);
  error = signal('');
  configured = signal(true);
  mode = signal<Mode>('signin');

  name = signal('');
  email = signal('');
  password = signal('');

  @ViewChild('googleBtn', { static: false }) googleBtn?: ElementRef<HTMLDivElement>;

  constructor(private auth: AuthService, private router: Router, private zone: NgZone) {
    if (this.auth.isLoggedIn()) {
      this.router.navigate([this.auth.hasPreferences() ? '/dashboard' : '/preferences']);
    }
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    if (!environment.googleClientId || environment.googleClientId.startsWith('YOUR_')) {
      this.configured.set(false);
      return;
    }
    const tryInit = () => {
      if (typeof google === 'undefined' || !google?.accounts?.id) {
        setTimeout(tryInit, 200);
        return;
      }
      google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback: (resp: any) => this.zone.run(() => this.onCredential(resp.credential)),
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      if (this.googleBtn?.nativeElement) {
        google.accounts.id.renderButton(this.googleBtn.nativeElement, {
          theme: 'filled_black',
          size: 'large',
          shape: 'pill',
          text: 'continue_with',
          logo_alignment: 'left',
          width: 320,
        });
      }
      google.accounts.id.prompt();
    };
    tryInit();
  }

  setMode(m: Mode): void {
    this.mode.set(m);
    this.error.set('');
  }

  async onSubmit(): Promise<void> {
    if (this.loading()) return;
    this.error.set('');
    const email = this.email().trim();
    const password = this.password();
    const name = this.name().trim();

    if (!email || !password) {
      this.error.set('Email and password are required');
      return;
    }
    if (this.mode() === 'signup') {
      if (!name) {
        this.error.set('Name is required');
        return;
      }
      if (password.length < 8) {
        this.error.set('Password must be at least 8 characters');
        return;
      }
    }

    this.loading.set(true);
    try {
      const user = this.mode() === 'signup'
        ? await this.auth.signUpWithEmail(name, email, password)
        : await this.auth.signInWithEmail(email, password);
      this.router.navigate([user.preferencesSet ? '/dashboard' : '/preferences']);
    } catch (e: any) {
      this.error.set(e?.message || 'Authentication failed');
    } finally {
      this.loading.set(false);
    }
  }

  private async onCredential(credential: string): Promise<void> {
    this.loading.set(true);
    this.error.set('');
    try {
      const user = await this.auth.signInWithGoogle(credential);
      this.router.navigate([user.preferencesSet ? '/dashboard' : '/preferences']);
    } catch (e: any) {
      this.error.set(e?.message || 'Sign-in failed');
    } finally {
      this.loading.set(false);
    }
  }
}
