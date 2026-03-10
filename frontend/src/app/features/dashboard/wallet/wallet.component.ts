import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from "../../../core/services/api.service";
import { AuthService } from "../../../core/services/auth.service";

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-fade-in max-w-4xl mx-auto space-y-6">
      
      <!-- Wallet Header -->
      <div class="glass-panel p-8 rounded-3xl bg-gradient-to-r from-blue-900 to-indigo-800 text-white shadow-2xl relative overflow-hidden">
         <!-- Abstract circles for premium look -->
         <div class="absolute -top-24 -right-24 w-64 h-64 bg-white opacity-10 rounded-full"></div>
         <div class="absolute -bottom-12 origin-bottom-left w-32 h-32 bg-primary opacity-30 rounded-full"></div>
         
         <div class="relative z-10 flex flex-col md:flex-row justify-between items-center">
            <div>
               <p class="text-indigo-200 uppercase tracking-widest text-sm font-semibold mb-1">Available Balance</p>
               <h2 class="text-6xl font-bold flex items-center gap-2">
                 {{user?.credits}} <span class="text-3xl text-yellow-400">♦</span>
               </h2>
               <p class="mt-4 text-indigo-100 max-w-sm text-sm border-l-2 border-indigo-400 pl-3">
                  Use credits to learn new skills from experts. You earn 2 credits for every session you mentor.
               </p>
            </div>
            
            <div class="mt-8 md:mt-0 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
               <h3 class="font-semibold text-lg text-white mb-4">Quick Actions</h3>
               <button (click)="buyCredits()" class="w-full bg-white text-indigo-900 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300">
                  Buy More Credits
               </button>
            </div>
         </div>
      </div>

      <!-- Transaction History -->
      <div class="bg-white rounded-2xl shadow p-6 mt-8">
         <h3 class="text-xl font-bold mb-6 border-b pb-4 flex items-center gap-2 text-gray-800">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Transaction History
         </h3>
         
         <div *ngIf="transactions.length === 0" class="text-center py-10 text-gray-400">
            <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <p>No transactions yet. Start exchanging skills to see history!</p>
         </div>
         
         <div class="space-y-4">
            <div *ngFor="let t of transactions" class="flex justify-between items-center p-4 rounded-xl border border-gray-100 hover:shadow-md transition bg-gray-50">
               <div class="flex items-start gap-4">
                  <div [ngClass]="isIncoming(t) ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'" 
                       class="p-3 rounded-full mt-1">
                     <!-- Up or down arrow -->
                     <svg *ngIf="isIncoming(t)" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                     <svg *ngIf="!isIncoming(t)" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                  </div>
                  <div>
                     <p class="font-bold text-gray-800 text-lg">{{t.reason || 'Skill Session Settlement'}}</p>
                     <p class="text-sm text-gray-500 mt-1">
                        {{isIncoming(t) ? 'From: ' + t.senderName : 'To: ' + t.receiverName}}
                     </p>
                     <p class="text-xs text-gray-400 mt-1">{{t.transactionDate | date:'medium'}}</p>
                  </div>
               </div>
               
               <div [ngClass]="isIncoming(t) ? 'text-green-600' : 'text-gray-800'" class="font-bold text-xl">
                  {{isIncoming(t) ? '+' : '-'}}{{t.amount}} ♦
               </div>
            </div>
         </div>
      </div>
    </div>
  `
})
export class WalletComponent implements OnInit {
  user: any;
  transactions: any[] = [];

  constructor(private api: ApiService, private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    if(this.user) {
      this.loadTransactions();
    }
  }

  loadTransactions() {
    this.api.getWalletTransactions(this.user.id).subscribe(res => {
      this.transactions = res;
    });
  }

  isIncoming(t: any): boolean {
    return t.receiverId === this.user.id;
  }

  buyCredits() {
    alert('Payment Gateway Integration Pending. This is a mockup for the HR/Management demonstration phase.');
  }
}
