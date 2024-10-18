import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { users } from '@client';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser: WritableSignal<users.User>;

  user: Signal<users.User>;

  constructor() {
    this.currentUser = signal({
      id: 1,
      first_name: 'Daniel',
      surname: 'Santiago',
      phone_number: '123456789',
      country_code: 'Portugal',
      fiat_wallet_currency: 'EUR',
      usdc_wallet_address: '0x123456789',
      created_at: new Date().getTime().toString(),
      updated_at: new Date().getTime().toString(),
      image_url: 'https://randomuser.me/api/portraits',
    });
    this.user = this.currentUser.asReadonly();
  }

  setUser(user: users.User) {
    this.currentUser.set(user);
  }
}
