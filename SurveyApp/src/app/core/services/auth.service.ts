import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { LOCAL_STORAGE_KEYS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageKey = LOCAL_STORAGE_KEYS.CURRENT_USER;

  login(user: User): void {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(this.storageKey);
    return userJson ? JSON.parse(userJson) : null;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}
