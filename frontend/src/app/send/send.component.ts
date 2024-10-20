import { Component, computed, Signal, signal } from '@angular/core';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmH2Directive } from '@spartan-ng/ui-typography-helm';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { Router } from '@angular/router';
import {
  NgxCurrencyConfig,
  NgxCurrencyDirective,
  NgxCurrencyInputMode,
} from 'ngx-currency';
import { HeaderComponent } from '../header/header.component';
import { SubmitButtonComponent } from '../submit-button/submit-button.component';
import { SendService } from '../state/send.service';
import { users } from '@client';
import { UserService } from '../state/user.service';
import { getCurrencySymbol } from '../utils/get-currency-symbol';
import { FocusDirective } from '../utils/focus.directive';

@Component({
  selector: 'app-send',
  standalone: true,
  imports: [
    HlmFormFieldModule,
    HlmInputDirective,
    HlmH2Directive,
    ReactiveFormsModule,
    HlmIconComponent,
    HlmButtonDirective,
    NgxCurrencyDirective,
    HeaderComponent,
    SubmitButtonComponent,
    FocusDirective,
  ],
  templateUrl: './send.component.html',
  styleUrl: './send.component.scss',
})
export class SendComponent {
  loading = signal(false);

  amountForm = new FormGroup({
    amount: new FormControl(0, [Validators.required]),
  });

  currencyCode: Signal<string>;
  currencyMaskConfig: Signal<Partial<NgxCurrencyConfig>>;

  targetUser: Signal<users.User>;
  user: Signal<users.User>;

  constructor(
    private sendService: SendService,
    private userService: UserService,
    private router: Router,
  ) {
    const targetUser = this.sendService.getTargetUser()();
    this.user = this.userService.user;

    if (!targetUser) {
      this.router.navigate(['/lookup']);
      this.targetUser = signal(null!);
      this.currencyCode = signal(null!);
      this.currencyMaskConfig = signal(null!);
      return;
    }

    this.targetUser = signal(targetUser);

    this.currencyCode = computed<string>(() => {
      return this.targetUser().fiat_wallet_currency;
    });

    this.currencyMaskConfig = computed<Partial<NgxCurrencyConfig>>(() => {
      const currency = this.currencyCode();
      const symbol = getCurrencySymbol(currency);

      return {
        allowNegative: false,
        allowZero: false,
        decimal: '.',
        precision: 2,
        prefix: `${symbol} `,
        thousands: ',',
        nullable: false,
        inputMode: NgxCurrencyInputMode.Financial,
      };
    });
  }

  async next() {
    const amount = this.amountForm.controls.amount.value;

    if (!this.amountForm.valid || !amount) {
      this.amountForm.controls.amount.markAsTouched();
      return;
    }

    this.loading.set(true);

    let baseCurrency: 'mine' | 'theirs' | 'other';
    let base: string;
    let counter: string;

    if (this.user().fiat_wallet_currency !== this.currencyCode()) {
      baseCurrency = 'theirs';
      base = this.user().fiat_wallet_currency;
      counter = this.targetUser().fiat_wallet_currency;
    } else if (this.user().fiat_wallet_currency === this.currencyCode()) {
      baseCurrency = 'mine';
      base = this.targetUser().fiat_wallet_currency;
      counter = this.user().fiat_wallet_currency;
    } else {
      baseCurrency = 'other';
      base = this.currencyCode();
      counter = this.user().fiat_wallet_currency;
    }

    try {
      const quote = await this.sendService.generateQuote(
        amount,
        // Make this configurable, based on the user currency selection.
        base,
        counter,
      );
      this.sendService.setQuote({
        ...quote,
        amount,
        amountCurrency: base,
      });
      this.router.navigate(['/confirm']);
    } catch (error) {
    } finally {
      this.loading.set(false);
    }
  }
}
