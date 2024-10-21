import {
  Component,
  computed,
  DestroyRef,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
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
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
// import {
// ComboBoxOption,
// HlmComboboxComponent,
// from '@spartan-ng/ui-combobox-helm';
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
import { getCurrencySymbol } from '../utils';
import { FocusDirective } from '../utils/focus.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
// @ts-ignore
import { getEmojiByCurrencyCode } from 'country-currency-emoji-flags';

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
    BrnSelectImports,
    HlmSelectImports,
  ],
  templateUrl: './send.component.html',
  styleUrl: './send.component.scss',
})
export class SendComponent {
  loading = signal(false);

  amountForm: FormGroup<{
    currency: FormControl<string | null>;
    amount: FormControl<number | null>;
  }>;

  currencyCode: WritableSignal<string>;
  currencyMaskConfig: Signal<Partial<NgxCurrencyConfig>>;
  currencyOptions: Signal<{ label: string; value: string; flag: string }[]>;

  targetUser: Signal<users.User>;
  user: Signal<users.User>;
  destroyRef = inject(DestroyRef);

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
      this.currencyOptions = signal([]);
      this.amountForm = new FormGroup({
        currency: new FormControl(''),
        amount: new FormControl(0),
      });
      return;
    }

    this.targetUser = signal(targetUser);

    const displayNames = new Intl.DisplayNames(['en'], { type: 'currency' });

    const userCurrency = this.user().fiat_wallet_currency;
    const targetUserCurrency = targetUser.fiat_wallet_currency;

    const currencyOptions = [
      {
        label: displayNames.of(userCurrency)!,
        value: userCurrency,
        flag: getEmojiByCurrencyCode(userCurrency),
      },
      {
        label: displayNames.of(targetUserCurrency)!,
        value: targetUserCurrency,
        flag: getEmojiByCurrencyCode(targetUserCurrency),
      },
    ];

    this.currencyOptions = signal(currencyOptions);

    this.currencyCode = signal(userCurrency);

    this.amountForm = new FormGroup({
      currency: new FormControl(this.currencyCode(), [Validators.required]),
      amount: new FormControl(0, [Validators.required]),
    });

    this.amountForm.controls.currency.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((currency) => {
        if (!currency) {
          return;
        }
        this.currencyCode.set(currency);
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

    let counter: string;
    let base: string;
    const userCurrency = this.user().fiat_wallet_currency;
    const targetUserCurrency = this.targetUser().fiat_wallet_currency;

    if (userCurrency !== this.currencyCode()) {
      base = targetUserCurrency;
      counter = userCurrency;
    } else if (userCurrency === this.currencyCode()) {
      base = userCurrency;
      counter = targetUserCurrency;
    } else {
      base = userCurrency;
      counter = this.currencyCode();
    }

    try {
      const quote = await this.sendService.generateQuote(amount, base, counter);
      this.sendService.setQuote({
        ...quote,
        amount,
        base,
        counter,
      });
      this.router.navigate(['/confirm']);
    } catch (error) {
    } finally {
      this.loading.set(false);
    }
  }
}
