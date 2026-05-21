import { Routes } from '@angular/router';
import { authGuard, preferencesGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/landing/landing').then(m => m.LandingPage) },
  { path: 'auth', loadComponent: () => import('./pages/auth/auth').then(m => m.AuthPage) },
  { path: 'preferences', loadComponent: () => import('./pages/preferences/preferences').then(m => m.PreferencesPage), canActivate: [authGuard] },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.DashboardPage), canActivate: [preferencesGuard] },
  { path: '**', redirectTo: '' }
];
