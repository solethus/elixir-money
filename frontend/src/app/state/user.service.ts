import { Injectable, signal } from '@angular/core';

export interface User {
  name: string;
  phoneNumber: string;
  country: string;
  balance: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser = signal<User | null>(null);

  user = this.currentUser.asReadonly();

  constructor() {
    this.currentUser.set({
      name: 'Daniel',
      phoneNumber: '123456789',
      country: 'Portugal',
      balance: '$100',
    });
  }

  setUser(user: User) {
    this.currentUser.set(user);
  }

  clearUser() {
    this.currentUser.set(null);
  }
}
