import { Injectable, signal } from '@angular/core';
import Client, { users, payments } from '@client';
import { environment } from '../../environments/environment';

export type QuoteDetails = payments.QuoteResponse & {
  amount: number;
  base: string;
  counter: string;
};

export interface SendParams {
  targetPhoneNo?: string;
  amount?: number;
  currency?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SendService {
  private client = new Client(environment.environment);

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

  private quote = signal<QuoteDetails | null>(null);

  getQuote() {
    return this.quote.asReadonly();
  }

  setQuote(quote: QuoteDetails) {
    this.quote.set(quote);
  }

  clearQuote() {
    this.quote.set(null);
  }

  private sendParams = signal<SendParams | null>(null);

  getSendParams() {
    return this.sendParams.asReadonly();
  }

  setSendParams(quote: SendParams) {
    this.sendParams.set(quote);
  }

  clearSendParams() {
    this.sendParams.set(null);
  }

  async lookupPhoneNo(phoneNo: string) {
    const response = await this.client.users.LookupByPhoneNo({
      UserPhoneNo: phoneNo,
    });
    return response.user;
  }

  async generateQuote(amount: number, base: string, counter: string) {
    const response = await this.client.payments.Quote({
      amount,
      currency_code: base,
      secondary_currency_code: counter,
    });
    return response;
  }

  async acceptQuote(
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
