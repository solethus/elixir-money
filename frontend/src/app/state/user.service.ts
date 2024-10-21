import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import Client, { users } from '@client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private client = new Client(environment.environment);

  private currentUser: WritableSignal<users.User>;

  user: Signal<users.User>;

  constructor() {
    this.currentUser = signal({
      id: 1,
      first_name: 'Daniel',
      surname: 'Santiago',
      phone_number: '+6805556789',
      country_code: 'PT',
      fiat_wallet_currency: 'EUR',
      usdc_wallet_address: '0xB4eF21f6eD7b4832F8270De44dB7EeA234cd5678',
      created_at: new Date('2024-10-20 11:35:14.955098').toISOString(),
      updated_at: new Date('2024-10-20 11:35:14.955098').toISOString(),
      image_url:
        'https://gitlab.com/uploads/-/system/user/avatar/11505958/avatar.png',
    });
    this.user = this.currentUser.asReadonly();
  }

  setUser(user: users.User) {
    this.currentUser.set(user);
  }

  async getUserBalance() {
    const balance = await this.client.payments.GetWallet(
      this.currentUser().phone_number,
    );

    return balance;
  }

  async getUsers() {
    const users = await this.client.users.ListUsers();

    return users.user;
  }
}
