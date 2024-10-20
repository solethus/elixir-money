import { Component, computed, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  HlmH2Directive,
  HlmH4Directive,
  HlmPDirective,
} from '@spartan-ng/ui-typography-helm';
import { UserService } from '../state/user.service';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { RouterLink } from '@angular/router';
import { payments, users } from '@client';
import { HeaderComponent } from '../header/header.component';
import { from } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HlmButtonDirective,
    RouterLink,
    HlmH2Directive,
    HlmH4Directive,
    HlmPDirective,
    HeaderComponent,
    CurrencyPipe,
    HlmSpinnerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  user: users.User;

  balance: Signal<payments.WalletResponse | undefined>;

  constructor(private userService: UserService) {
    this.user = this.userService.user();

    this.balance = toSignal(from(this.userService.getUserBalance()));
  }
}
