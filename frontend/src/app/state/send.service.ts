import { Injectable, signal } from '@angular/core';
import Client, { Local, Environment, users, payments } from '@client';

@Injectable({
  providedIn: 'root',
})
export class SendService {
  private client = new Client(Local);

  private targetUser = signal<users.User | null>(null);
  private quote = signal<payments.QuoteResponse | null>(null);

  getTargetUser() {
    return this.targetUser.asReadonly();
  }

  setTargetUser(user: users.User) {
    this.targetUser.set(user);
  }

  clearTargetUser() {
    this.targetUser.set(null);
  }

  getQuote() {
    return this.quote.asReadonly();
  }

  setQuote(quote: payments.QuoteResponse) {
    this.quote.set(quote);
  }

  clearQuote() {
    this.quote.set(null);
  }

  async lookupPhoneNo(phoneNo: string) {
    const response = await this.client.users.LookupByPhoneNo({
      UserPhoneNo: phoneNo,
    });
    return response.user;
  }

  async generateQuote(
    amount: number,
    currencyCode: string,
    targetCurrencyCode: string,
  ) {
    const response = await this.client.payments.Quote({
      amount,
      currency_code: currencyCode,
      target_currency_code: targetCurrencyCode,
    });
    return response;
  }

  async approveQuote(
    sourcePhoneNumber: string,
    targetPhoneNumber: string,
    amount: number,
  ) {
    const response = await this.client.payments.Send({
      sender_phone_no: sourcePhoneNumber,
      target_phone_no: targetPhoneNumber,
      amount_usdc: amount,
    });
    return response;
  }
}
