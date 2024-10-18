import { Injectable, signal } from '@angular/core';
import Client, { Local, Environment, users } from '@client';

@Injectable({
  providedIn: 'root',
})
export class SendService {
  private client = new Client(Local);

  private targetUser = signal<users.User | null>(null);

  getTargetUser() {
    return this.targetUser.asReadonly();
  }

  setTargetUser(user: users.User) {
    this.targetUser.set(user);
  }

  clearTargetUser() {
    this.targetUser.set(null);
  }

  async lookupPhoneNo(phoneNo: string) {
    try {
      const response = await this.client.users.LookupByPhoneNo({
        UserPhoneNo: phoneNo,
      });
      return response.user;
    } catch (error) {
      return null;
    }
  }

  async getQuote() {
    // this.client.payments.Quote({
    //   amount: ,
    //   currency_code: ,
    //   target_currency_code: ,
    // });
  }

  async approveQuote(
    sourcePhoneNumber: string,
    targetPhoneNumber: string,
    amount: number,
  ) {
    try {
      await this.client.payments.Send({
        sender_phone_no: sourcePhoneNumber,
        target_phone_no: targetPhoneNumber,
        amount_usdc: amount,
      });
    } catch (error) {}
  }
}
