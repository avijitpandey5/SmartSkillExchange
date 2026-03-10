import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div class="w-full max-w-md animate-fade-in glass-panel rounded-2xl p-8 shadow-xl">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-dark">Welcome Back</h1>
          <p class="text-gray-500 mt-2">Sign in to your Skill Exchange account</p>
        </div>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" formControlName="email" class="input-field" placeholder="you@example.com">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" formControlName="password" class="input-field" placeholder="••••••••">
          </div>

          <div *ngIf="errorMessage" class="text-red-500 text-sm text-center">
             {{ errorMessage }}
          </div>
          
          <button type="submit" [disabled]="loginForm.invalid || isLoading" 
            class="btn-primary w-full flex justify-center py-3 text-lg mt-4 disabled:opacity-70 disabled:cursor-not-allowed">
            <span *ngIf="!isLoading">Sign In</span>
            <span *ngIf="isLoading" class="animate-pulse">Signing in...</span>
          </button>
        </form>
        
        <div class="mt-8 text-center">
          <p class="text-sm text-gray-600">Don't have an account? 
            <a routerLink="/auth/register" class="font-medium text-primary hover:text-blue-700 transition">Create account</a>
          </p>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/home']);
        },
        error: (err) => {
          this.errorMessage = 'Invalid email or password';
          this.isLoading = false;
        }
      });
    }
  }
}
