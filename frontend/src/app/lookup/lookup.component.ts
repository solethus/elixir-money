import { Component, computed, Signal, signal, viewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SendService } from '../state/send.service';
import { users } from '@client';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';

import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { SubmitButtonComponent } from '../submit-button/submit-button.component';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HeaderComponent } from '../header/header.component';
import { FocusDirective } from '../utils/focus.directive';

export const fadeIn = trigger('fadeIn', [
  state('void', style({ opacity: 0 })),
  transition(':enter', [animate('500ms ease-in', style({ opacity: 1 }))]),
]);

@Component({
  selector: 'app-lookup',
  standalone: true,
  imports: [
    HlmFormFieldModule,
    HlmIconComponent,
    HlmInputDirective,
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmButtonDirective,
    ReactiveFormsModule,
    SubmitButtonComponent,
    HeaderComponent,
    FocusDirective,
  ],
  templateUrl: './lookup.component.html',
  styleUrl: './lookup.component.scss',
  animations: [fadeIn],
})
export class LookupComponent {
  loading = signal(false);

  phoneNumberGroup = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required]),
  });

  targetUser: Signal<users.User | null>;

  submitButton = viewChild.required(SubmitButtonComponent);

  constructor(
    private sendService: SendService,
    private router: Router,
  ) {
    this.sendService.clearTargetUser();
    this.targetUser = this.sendService.getTargetUser();
  }

  flagEmoji = computed(() => {
    const user = this.targetUser();
    if (!user?.country_code) {
      return null;
    }
    const codePoints = user.country_code
      .toUpperCase()
      .split('')
      .map((char) => 127462 + char.charCodeAt(0) - 65);
    return String.fromCodePoint(...codePoints);
  });

  async lookupPhoneNo() {
    const phoneNumberControl = this.phoneNumberGroup.controls.phoneNumber;
    const phoneNumber = phoneNumberControl.value;

    if (this.targetUser()?.phone_number === phoneNumber) {
      return;
    }

    if (!this.phoneNumberGroup.valid || !phoneNumber) {
      this.sendService.clearTargetUser();
      return;
    }

    this.loading.set(true);

    try {
      const user = await this.sendService.lookupPhoneNo(phoneNumber);
      if (!user) {
        phoneNumberControl.setErrors({
          invalid: 'User not found',
        });
        return;
      }

      this.sendService.setTargetUser(user);
      this.submitButton().focus();
    } catch (error) {
      this.sendService.clearTargetUser();
      console.error('error', error);
      phoneNumberControl.setErrors({
        invalid: 'User not found',
      });
    } finally {
      this.loading.set(false);
    }
  }

  next() {
    const targetUser = this.targetUser();
    if (!this.phoneNumberGroup.valid || !targetUser) {
      this.phoneNumberGroup.markAsTouched();
      return;
    }

    this.router.navigate(['/send']);
  }
}
