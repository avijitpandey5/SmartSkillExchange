import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { ApiService } from '../../../../core/services/api.service';
import { ApiService } from "../../../core/services/api.service";
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="animate-fade-in flex h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      
      <!-- Contacts List Mockup -->
      <div class="w-1/3 border-r border-gray-200 bg-gray-50 flex flex-col">
         <div class="p-4 border-b border-gray-200 bg-white">
            <h3 class="font-bold text-lg text-gray-800">Messages</h3>
            <input type="text" placeholder="Search contacts..." class="w-full mt-3 px-3 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary">
         </div>
         
         <div class="flex-1 overflow-y-auto">
            <div *ngFor="let contact of contacts" 
                 (click)="selectContact(contact)"
                 [class.bg-blue-50]="selectedContact?.id === contact.id"
                 class="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-100 transition flex items-center gap-3">
               <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-indigo-500 text-white flex items-center justify-center font-bold">
                  {{contact.name.charAt(0)}}
               </div>
               <div>
                  <p class="font-semibold text-gray-800">{{contact.name}}</p>
                  <p class="text-xs text-gray-500 truncate">Tap to view conversation</p>
               </div>
            </div>
            
            <div *ngIf="contacts.length === 0" class="p-8 text-center text-gray-400 text-sm">
               No recent contacts. Start a learning session to chat with mentors!
            </div>
         </div>
      </div>

      <!-- Chat Window -->
      <div class="flex-1 flex flex-col bg-white">
         <div *ngIf="!selectedContact" class="flex-1 flex flex-col items-center justify-center text-gray-400">
            <svg class="w-16 h-16 mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            <p>Select a conversation to start messaging</p>
         </div>
         
         <ng-container *ngIf="selectedContact">
            <!-- Header -->
            <div class="p-4 border-b border-gray-200 flex items-center gap-3 bg-white shadow-sm z-10">
               <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-indigo-500 text-white flex items-center justify-center font-bold">
                  {{selectedContact?.name.charAt(0)}}
               </div>
               <h3 class="font-bold text-gray-800">{{selectedContact?.name}}</h3>
            </div>
            
            <!-- Messages -->
            <div class="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
               <div *ngFor="let msg of messages" 
                    class="flex flex-col max-w-[75%]"
                    [ngClass]="msg.senderId === user.id ? 'self-end items-end' : 'self-start items-start'">
                  
                  <div class="px-4 py-2 rounded-2xl shadow-sm text-sm"
                       [ngClass]="msg.senderId === user.id ? 'bg-primary text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'">
                     {{msg.message}}
                  </div>
                  <span class="text-[10px] text-gray-400 mt-1 px-1">{{msg.sentAt | date:'shortTime'}}</span>
               </div>
               
               <div *ngIf="messages.length === 0" class="text-center text-gray-400 text-sm mt-10">
                  Say hello to {{selectedContact?.name}}!
               </div>
            </div>
            
            <!-- Input -->
            <div class="p-4 bg-white border-t border-gray-200">
               <form (ngSubmit)="sendMessage()" class="flex gap-2 relative">
                  <input type="text" [(ngModel)]="newMessage" name="msg" placeholder="Type a message..." class="flex-1 py-3 px-4 bg-gray-100 border-transparent rounded-full focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary outline-none transition">
                  <button type="submit" [disabled]="!newMessage.trim()" class="bg-primary text-white rounded-full p-3 hover:bg-blue-600 transition disabled:opacity-50 flex items-center justify-center">
                     <svg class="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                  </button>
               </form>
            </div>
         </ng-container>
      </div>
    </div>
  `
})
export class ChatComponent implements OnInit {
  user: any;
  contacts: any[] = [
    { id: 2, name: 'Alice Expert' }, // Mocking contacts for demo
    { id: 3, name: 'Bob Roberts' }
  ];
  selectedContact: any = null;
  messages: any[] = [];
  newMessage = '';

  constructor(private api: ApiService, private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    // Normally we'd dynamically fetch contacts based on accepted ExchangeRequests.
    this.contacts = this.contacts.filter(c => c.id !== this.user.id);
  }

  selectContact(c: any) {
    this.selectedContact = c;
    this.loadMessages();
  }

  loadMessages() {
    if(!this.selectedContact) return;
    this.api.getConversation(this.user.id, this.selectedContact.id).subscribe(res => {
      this.messages = res;
    });
  }

  sendMessage() {
    if(!this.newMessage.trim() || !this.selectedContact) return;
    
    this.api.sendMessage(this.user.id, this.selectedContact.id, this.newMessage).subscribe(res => {
      this.messages.push(res);
      this.newMessage = '';
    });
  }
}
