import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { AuthService } from "../../core/services/auth.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
    <div class="flex h-screen bg-light overflow-hidden">
      <!-- Sidebar -->
      <aside class="w-64 bg-dark text-white flex flex-col shadow-xl flex-shrink-0 animate-fade-in">
        <div class="p-6 text-center border-b border-gray-700">
          <h2 class="text-2xl font-bold tracking-wider text-primary">Skill<span class="text-white">Exchange</span></h2>
        </div>
        
        <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <a routerLink="/dashboard/home" routerLinkActive="bg-primary text-white" 
             class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <span class="font-medium">Home</span>
          </a>
          
          <a routerLink="/dashboard/find-match" routerLinkActive="bg-primary text-white" 
             class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <span class="font-medium">Find Match</span>
          </a>
          
          <a routerLink="/dashboard/wallet" routerLinkActive="bg-primary text-white" 
             class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <span class="font-medium">Credit Wallet</span>
          </a>
          
          <a routerLink="/dashboard/chat" routerLinkActive="bg-primary text-white" 
             class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <span class="font-medium">Messages</span>
          </a>
          
          <a *ngIf="user?.role === 'ROLE_ADMIN' || user?.role === 'ROLE_HR'" routerLink="/dashboard/admin" routerLinkActive="bg-primary text-white" 
             class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors mt-8">
            <span class="font-medium text-amber-400">Admin Panel</span>
          </a>
        </nav>
        
        <div class="p-4 border-t border-gray-700">
          <div class="flex items-center justify-between px-4 py-2 bg-gray-800 rounded-lg mb-4">
            <div class="flex flex-col">
              <span class="text-sm font-semibold text-white truncate max-w-[120px]">{{user?.name}}</span>
              <span class="text-xs text-gray-400">{{user?.role?.replace('ROLE_', '')}}</span>
            </div>
            <div class="bg-primary text-white text-xs px-2 py-1 rounded-full font-bold">
              {{user?.credits}} ♦
            </div>
          </div>
          <button (click)="logout()" class="w-full flex justify-center items-center px-4 py-2 border border-gray-600 text-gray-300 rounded hover:bg-gray-700 transition">
            Log Out
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8 relative">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  user: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.user = Object.assign({}, user);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
