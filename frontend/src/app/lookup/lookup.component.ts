import { Component, computed, Signal, signal, viewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
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
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import { HeaderComponent } from '../header/header.component';
import { FocusDirective } from '../utils/focus.directive';
import { getEmojiFromCountryCode } from '../utils';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { UserService } from '../state/user.service';
import { from, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

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
    NgxMaskDirective,
    NgxMaskPipe,
    HlmBadgeDirective,
  ],
  providers: [provideNgxMask()],
  templateUrl: './lookup.component.html',
  styleUrl: './lookup.component.scss',
  animations: [fadeIn],
})
export class LookupComponent {
  loading = signal(false);

  userPhoneNumberValidator: ValidatorFn;

  phoneNumberGroup: FormGroup<{
    phoneNumber: FormControl<string | null>;
  }>;

  targetUser: Signal<users.User | null>;

  recentUsers: Signal<users.User[] | undefined>;

  submitButton = viewChild.required(SubmitButtonComponent);

  mask = '00 (00) 000-000||00 (00) 000-0000||00 (000) 000-0000';
  prefix = '+';

  constructor(
    private sendService: SendService,
    private router: Router,
    private userService: UserService,
  ) {
    this.sendService.clearTargetUser();
    this.targetUser = this.sendService.getTargetUser();

    this.recentUsers = toSignal(
      from(this.userService.getUsers()).pipe(
        map((users) =>
          users.filter(
            (user) =>
              user.phone_number !== this.userService.user().phone_number,
          ),
        ),
      ),
    );

    this.userPhoneNumberValidator = (control) => {
      const currentUserPhoneNumber = this.userService
        .user()
        .phone_number.replace('+', '');
      return control.value === currentUserPhoneNumber
        ? { userPhoneNumber: 'Cannot use your own phone number' }
        : null;
    };

    this.phoneNumberGroup = new FormGroup({
      phoneNumber: new FormControl('', [
        Validators.required,
        this.userPhoneNumberValidator,
      ]),
    });

    const sendParams = this.sendService.getSendParams()();

    if (sendParams?.targetPhoneNo) {
      this.phoneNumberGroup.controls.phoneNumber.setValue(
        sendParams.targetPhoneNo,
      );
      this.lookupPhoneNo();
    }
  }

  flagEmoji = computed(() => {
    const user = this.targetUser();
    if (!user?.country_code) {
      return null;
    }
    return getEmojiFromCountryCode(user.country_code);
  });

  selectRecentUser(user: users.User) {
    this.phoneNumberGroup.controls.phoneNumber.setValue(
      user.phone_number.replace('+', ''),
    );
    this.lookupPhoneNo();
  }

  async lookupPhoneNo() {
    const phoneNumberControl = this.phoneNumberGroup.controls.phoneNumber;
    let phoneNumber = phoneNumberControl.value;

    if (this.targetUser()?.phone_number === phoneNumber) {
      return;
    }

    if (!this.phoneNumberGroup.valid || !phoneNumber) {
      this.sendService.clearTargetUser();
      return;
    }

    phoneNumber = `${this.prefix}${phoneNumber}`;

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
    if (
      !this.phoneNumberGroup.valid ||
      !targetUser ||
      !this.phoneNumberGroup.controls.phoneNumber.value
    ) {
      this.phoneNumberGroup.markAsTouched();
      return;
    }

    this.sendService.setSendParams({
      targetPhoneNo: this.phoneNumberGroup.controls.phoneNumber.value,
    });
    this.router.navigate(['/send']);
  }
}
