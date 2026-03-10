import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from "../../../core/services/auth.service";
import { ApiService } from "../../../core/services/api.service"

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-fade-in space-y-6 max-w-6xl mx-auto">
      <div class="flex justify-between items-end">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Welcome, {{user?.name}}! 🚀</h1>
          <p class="text-gray-500 mt-1">Here is the active overview of your skill exchange journey.</p>
        </div>
      </div>

      <!-- Stat Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="glass-panel p-6 rounded-2xl border-l-4 border-l-primary flex items-center justify-between group hover:shadow-lg transition">
          <div>
            <p class="text-sm font-medium text-gray-500 uppercase">Available Credits</p>
            <p class="text-3xl font-bold text-gray-800 mt-2">{{user?.credits}}</p>
          </div>
          <div class="bg-blue-100 p-4 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
        </div>

        <div class="glass-panel p-6 rounded-2xl border-l-4 border-l-secondary flex items-center justify-between group hover:shadow-lg transition">
          <div>
            <p class="text-sm font-medium text-gray-500 uppercase">Active Requests</p>
            <p class="text-3xl font-bold text-gray-800 mt-2">{{activeRequestsCount}}</p>
          </div>
          <div class="bg-green-100 p-4 rounded-full group-hover:bg-secondary group-hover:text-white transition-colors">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
        </div>

        <div class="glass-panel p-6 rounded-2xl border-l-4 border-l-purple-500 flex items-center justify-between group hover:shadow-lg transition">
          <div>
            <p class="text-sm font-medium text-gray-500 uppercase">Account Role</p>
            <p class="text-xl font-bold text-gray-800 mt-2">{{user?.role?.replace('ROLE_', '')}}</p>
          </div>
          <div class="bg-purple-100 p-4 rounded-full group-hover:bg-purple-500 group-hover:text-white transition-colors">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          </div>
        </div>
      </div>

      <!-- Tables Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div class="bg-white rounded-2xl shadow p-6">
          <h2 class="text-xl font-bold mb-4 border-b pb-2">My Learning Requests</h2>
          <div *ngIf="learnerRequests.length === 0" class="text-gray-400 py-4 text-center">No learning requests made yet.</div>
          <ul class="space-y-3">
             <li *ngFor="let req of learnerRequests" class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p class="font-medium text-gray-800">Skill: {{req.skillName}}</p>
                  <p class="text-xs text-gray-500">Mentor: {{req.mentorName}}</p>
                </div>
                <span [class]="getStatusClass(req.status)" class="px-3 py-1 text-xs font-bold rounded-full uppercase">
                  {{req.status}}
                </span>
             </li>
          </ul>
        </div>
        
        <div class="bg-white rounded-2xl shadow p-6">
          <h2 class="text-xl font-bold mb-4 border-b pb-2">Mentoring Requests</h2>
          <div *ngIf="mentorRequests.length === 0" class="text-gray-400 py-4 text-center">No requests to mentor others yet.</div>
          <ul class="space-y-3">
             <li *ngFor="let req of mentorRequests" class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p class="font-medium text-gray-800">Skill: {{req.skillName}}</p>
                  <p class="text-xs text-gray-500">Learner: {{req.learnerName}}</p>
                </div>
                <div class="flex items-center gap-2">
                  <span [class]="getStatusClass(req.status)" class="px-3 py-1 text-xs font-bold rounded-full uppercase relative">
                    {{req.status}}
                  </span>
                  <button *ngIf="req.status === 'PENDING'" (click)="updateStatus(req.id, 'ACCEPTED')" class="text-xs bg-green-500 text-white rounded px-2 py-1">Accept</button>
                  <button *ngIf="req.status === 'PENDING'" (click)="updateStatus(req.id, 'REJECTED')" class="text-xs bg-red-500 text-white rounded px-2 py-1">Reject</button>
                  <button *ngIf="req.status === 'ACCEPTED'" (click)="completeSession(req.id)" class="text-xs bg-blue-500 text-white rounded px-2 py-1">Complete</button>
                </div>
             </li>
          </ul>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  user: any;
  learnerRequests: any[] = [];
  mentorRequests: any[] = [];
  activeRequestsCount = 0;

  constructor(private authService: AuthService, private api: ApiService) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(u => {
      this.user = u;
      if (this.user?.id) {
        this.loadRequests();
      }
    });
  }

  loadRequests() {
    this.api.getLearnerRequests(this.user.id).subscribe(res => {
      this.learnerRequests = res;
      this.calculateActive();
    });
    this.api.getMentorRequests(this.user.id).subscribe(res => {
      this.mentorRequests = res;
      this.calculateActive();
    });
  }

  calculateActive() {
    this.activeRequestsCount = this.learnerRequests.filter(r => r.status === 'PENDING' || r.status === 'ACCEPTED').length + 
                               this.mentorRequests.filter(r => r.status === 'PENDING' || r.status === 'ACCEPTED').length;
  }

  updateStatus(id: number, status: string) {
    this.api.updateRequestStatus(id, status).subscribe(() => this.loadRequests());
  }

  completeSession(id: number) {
     this.api.completeSession(id).subscribe(() => this.loadRequests());
  }

  getStatusClass(status: string) {
    switch(status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'ACCEPTED': return 'bg-blue-100 text-blue-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}
