import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkToken();
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response);
        }
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private setToken(response: any): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify({
      id: response.id,
      name: response.name,
      email: response.email,
      role: response.role,
      credits: response.credits
    }));
    this.currentUserSubject.next(response);
  }

  private checkToken(): void {
    const token = this.getToken();
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          this.logout();
        } else {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
             this.currentUserSubject.next(JSON.parse(storedUser));
          }
        }
      } catch (e) {
        this.logout();
      }
    }
  }
}
