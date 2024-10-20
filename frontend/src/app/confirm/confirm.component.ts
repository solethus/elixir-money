import { Component, computed, Signal, signal } from '@angular/core';
import { SubmitButtonComponent } from '../submit-button/submit-button.component';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
import { QuoteDetails, SendService } from '../state/send.service';
import { payments, users } from '@client';
import { UserService } from '../state/user.service';
import {
  HlmH2Directive,
  HlmH3Directive,
  HlmMutedDirective,
  HlmPDirective,
} from '@spartan-ng/ui-typography-helm';
import { getCurrencySymbol } from '../utils/get-currency-symbol';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [
    SubmitButtonComponent,
    HeaderComponent,
    HlmPDirective,
    HlmH2Directive,
    HlmH3Directive,
    HlmMutedDirective,
    CurrencyPipe,
  ],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss',
})
export class ConfirmComponent {
  loading = signal(false);

  quote: Signal<QuoteDetails | null>;
  targetUser: Signal<users.User | null>;
  currentUser: Signal<users.User>;

  symbol = computed(() => {
    const quote = this.quote();
    if (!quote) {
      return '';
    }
    return getCurrencySymbol(quote.amountCurrency);
  });

  amount = computed(() => {
    const quote = this.quote();
    if (!quote) {
      return 0;
    }
    return quote.amount;
  });

  constructor(
    private router: Router,
    private sendService: SendService,
    private userService: UserService,
  ) {
    this.quote = this.sendService.getQuote();
    this.targetUser = this.sendService.getTargetUser();
    this.currentUser = this.userService.user;

    if (!this.targetUser() || !this.quote()) {
      this.router.navigate(['/lookup']);
      return;
    }
  }

  async next() {
    const quote = this.quote();
    const targetUser = this.targetUser();
    const amount = Number(quote?.usdc_amount);

    if (!quote || !targetUser || isNaN(amount)) {
      return;
    }

    this.loading.set(true);

    try {
      const send = await this.sendService.acceptQuote(
        this.currentUser().phone_number,
        targetUser.phone_number,
        amount,
      );
      // Play some kinda animation here before routing? Rive animations?
      // Update the user balance with the new balance here?
      // send.sender_balance
      this.router.navigate(['/']);
    } catch (error) {
    } finally {
      this.loading.set(false);
    }
  }
}
