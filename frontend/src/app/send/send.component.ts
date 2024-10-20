import { Component, computed, model, Signal, signal } from '@angular/core';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmH2Directive } from '@spartan-ng/ui-typography-helm';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { Router } from '@angular/router';
import { NgxCurrencyConfig, NgxCurrencyDirective } from 'ngx-currency';
import { HeaderComponent } from '../header/header.component';
import { SubmitButtonComponent } from '../submit-button/submit-button.component';
import { SendService } from '../state/send.service';
import { users } from '@client';
import { UserService } from '../state/user.service';
import { getCurrencySymbol } from '../utils/get-currency-symbol';

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
  ],
  providers: [],
  templateUrl: './send.component.html',
  styleUrl: './send.component.scss',
})
export class SendComponent {
  loading = signal(false);

  amountControl = new FormControl(0, [Validators.required]);

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
      };
    });
  }

  async next() {
    if (!this.amountControl.valid || !this.amountControl.value) {
      this.amountControl.markAsTouched();
      return;
    }

    this.loading.set(true);

    try {
      const quote = await this.sendService.generateQuote(
        this.amountControl.value,
        this.user().fiat_wallet_currency,
        this.targetUser().fiat_wallet_currency,
      );
      this.sendService.setQuote(quote);
      this.router.navigate(['/confirm']);
    } catch (error) {
    } finally {
      this.loading.set(false);
    }
  }
}
