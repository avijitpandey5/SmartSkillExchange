import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from "../../../core/services/api.service";
import { AuthService } from "../../../core/services/auth.service";

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="animate-fade-in max-w-5xl mx-auto space-y-6">
      
      <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 class="text-2xl font-bold mb-2">Find a Skill Match</h2>
        <p class="text-gray-500 mb-6">Search for users who can teach the exact skill you want to learn.</p>
        
        <div class="flex flex-col md:flex-row gap-4 mb-8">
           <div class="flex-1">
             <label class="block text-sm text-gray-600 mb-1">Select Skill</label>
             <select [(ngModel)]="selectedSkillId" class="input-field py-2">
                <option value="">-- Choose a Skill --</option>
                <option *ngFor="let s of allSkills" [value]="s.id">{{s.name}} ({{s.category}})</option>
             </select>
           </div>
           
           <div class="md:self-end">
             <button (click)="findMentors()" class="btn-primary flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                Search Mentors
             </button>
           </div>
        </div>

        <div *ngIf="searched">
           <h3 class="font-semibold text-lg border-b pb-2 mb-4">Search Results</h3>
           
           <div *ngIf="matchedMentors.length === 0" class="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl">
              <span class="text-4xl mb-3">😕</span>
              <p class="text-gray-500">No mentors found for this skill yet. Be the first to add it!</p>
           </div>
           
           <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div *ngFor="let mentor of matchedMentors" class="border border-gray-200 p-5 rounded-xl hover:shadow-md transition bg-white flex justify-between items-center group">
                 <div>
                    <h4 class="font-bold text-lg text-gray-800">{{mentor.name}}</h4>
                    <span class="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded mt-1 inline-block">Role: {{mentor.role?.replace('ROLE_', '')}}</span>
                 </div>
                 
                 <button (click)="requestSession(mentor.id)" [disabled]="isRequesting" class="px-4 py-2 bg-primary text-white text-sm font-medium rounded shadow hover:bg-blue-600 transition disabled:opacity-50">
                    Request Session (2 ♦)
                 </button>
              </div>
           </div>
        </div>
      </div>
      
      <!-- Skill Management Addition -->
      <div class="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl shadow-sm border border-gray-200 mt-8">
        <h3 class="text-xl font-bold mb-4">Don't see a skill? Add it to the platform!</h3>
        <div class="flex gap-4 items-end">
           <div class="flex-1">
             <input type="text" [(ngModel)]="newSkillName" placeholder="Skill Name" class="input-field">
           </div>
           <div class="flex-1">
             <input type="text" [(ngModel)]="newSkillCategory" placeholder="Category (e.g., Tech, Art)" class="input-field">
           </div>
           <button (click)="addSkill()" class="btn-secondary whitespace-nowrap">Add Skill</button>
        </div>
      </div>

    </div>
  `
})
export class MatchComponent implements OnInit {
  allSkills: any[] = [];
  allUsers: any[] = []; // In a real app we'd have a specific backend query, mocking via filtering here for the demo limits.
  selectedSkillId: string = '';
  
  newSkillName = '';
  newSkillCategory = '';
  
  searched = false;
  matchedMentors: any[] = [];
  isRequesting = false;
  currentUser: any;

  constructor(private api: ApiService, private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.loadSkills();
    
    // For the sake of the demo and the DB schema we generated (which relies on users),
    // we fetch all users here to simulate search, though in reality a custom endpoint would be better.
    // For simplicity, any user that is NOT the current learner is considered a potential mentor for the selected skill.
    this.api.getProfile(1).subscribe({
      next: () => {},
      error: () => {}
    }); // just to verify api works
  }

  loadSkills() {
    this.api.getSkills().subscribe(res => this.allSkills = res);
  }

  addSkill() {
    if(!this.newSkillName) return;
    this.api.addSkill({name: this.newSkillName, category: this.newSkillCategory}).subscribe(() => {
      this.loadSkills();
      this.newSkillName = '';
      this.newSkillCategory = '';
      alert('Skill added globally!');
    });
  }

  findMentors() {
    if(!this.selectedSkillId) return;
    this.searched = true;
    
    // MOCK search behavior: 
    // Since user mapping is tricky without a large DB, let's just create a dummy list of mentors if we don't fetch users.
    // Normally: this.api.getMentorsBySkill(selectedSkillId).subscribe(...)
    this.matchedMentors = [
      { id: 2, name: 'Alice Expert', role: 'ROLE_MENTOR' },
      { id: 3, name: 'Bob Roberts', role: 'ROLE_MENTOR' }
    ].filter(m => m.id !== this.currentUser.id);
  }

  requestSession(mentorId: number) {
    if(!this.selectedSkillId) return;
    this.isRequesting = true;
    const skillId = parseInt(this.selectedSkillId);
    
    // We send request to backend
    this.api.createRequest(this.currentUser.id, mentorId, skillId).subscribe({
      next: () => {
        alert('Exchange request sent successfully! Waiting for mentor to accept.');
        this.isRequesting = false;
      },
      error: (err) => {
        alert(err.error?.message || 'Failed to send request. Do you have enough credits?');
        this.isRequesting = false;
      }
    });
  }
}
