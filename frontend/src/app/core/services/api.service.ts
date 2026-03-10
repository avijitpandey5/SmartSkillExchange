import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // User
  getProfile(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${id}`);
  }

  // Skills
  getSkills(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/skills`);
  }
  
  addSkill(skill: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/skills`, skill);
  }

  // Exchange
  createRequest(learnerId: number, mentorId: number, skillId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/requests?learnerId=${learnerId}&mentorId=${mentorId}&skillId=${skillId}`, {});
  }
  
  updateRequestStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/requests/${id}/status?status=${status}`, {});
  }
  
  completeSession(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/requests/${id}/complete`, {});
  }
  
  getLearnerRequests(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/requests/learner/${id}`);
  }
  
  getMentorRequests(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/requests/mentor/${id}`);
  }

  // Wallet
  getWalletTransactions(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/wallet/user/${userId}`);
  }

  // Chat
  sendMessage(senderId: number, receiverId: number, message: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/chat/send?senderId=${senderId}&receiverId=${receiverId}&message=${message}`, {});
  }

  getConversation(user1: number, user2: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/chat/conversation?user1=${user1}&user2=${user2}`);
  }
}
