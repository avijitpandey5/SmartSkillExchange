import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Authentication Routes
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  
  // Dashboard & Protected Routes
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    children: [
        { path: 'home', loadComponent: () => import('./features/dashboard/home/home.component').then(c => c.HomeComponent) },
        { path: 'find-match', loadComponent: () => import('./features/dashboard/match/match.component').then(c => c.MatchComponent) },
        { path: 'wallet', loadComponent: () => import('./features/dashboard/wallet/wallet.component').then(c => c.WalletComponent) },
        { path: 'chat', loadComponent: () => import('./features/dashboard/chat/chat.component').then(c => c.ChatComponent) },
        { path: 'admin', loadComponent: () => import('./features/dashboard/admin/admin.component').then(c => c.AdminComponent) },
        { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login' }
];
