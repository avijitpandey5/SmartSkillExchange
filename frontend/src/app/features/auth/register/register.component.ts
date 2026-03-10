import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-emerald-50 p-4">
      <div class="w-full max-w-md animate-fade-in glass-panel rounded-2xl p-8 shadow-xl">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-dark">Join the Platform</h1>
          <p class="text-gray-500 mt-2">Start exchanging skills today</p>
        </div>
        
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" formControlName="name" class="input-field" placeholder="John Doe">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" formControlName="email" class="input-field" placeholder="you@example.com">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" formControlName="password" class="input-field" placeholder="••••••••">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">I want to join as</label>
            <select formControlName="role" class="input-field">
              <option value="ROLE_LEARNER">Learner</option>
              <option value="ROLE_MENTOR">Mentor</option>
              <option value="ROLE_HR">HR / Manager</option>
            </select>
          </div>

          <div *ngIf="errorMessage" class="text-red-500 text-sm text-center mt-2">
             {{ errorMessage }}
          </div>
          
          <button type="submit" [disabled]="registerForm.invalid || isLoading" 
            class="btn-primary w-full flex justify-center py-3 text-lg mt-6 disabled:opacity-70 disabled:cursor-not-allowed">
            <span *ngIf="!isLoading">Create Account</span>
            <span *ngIf="isLoading" class="animate-pulse">Registering...</span>
          </button>
        </form>
        
        <div class="mt-8 text-center">
          <p class="text-sm text-gray-600">Already have an account? 
            <a routerLink="/auth/login" class="font-medium text-primary hover:text-blue-700 transition">Sign inn</a>
          </p>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['ROLE_LEARNER', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/home']);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Registration failed. Try again.';
          this.isLoading = false;
        }
      });
    }
  }
}
