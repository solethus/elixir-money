import { Component, input, output } from '@angular/core';
import {} from '@ng-icons/core';
import { lucideLoader2, lucideArrowRight, lucideSend } from '@ng-icons/lucide';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'app-submit-button',
  standalone: true,
  imports: [HlmButtonDirective, HlmIconComponent],
  providers: [
    provideIcons({
      lucideLoader2,
      lucideArrowRight,
      lucideSend,
    }),
  ],
  templateUrl: './submit-button.component.html',
  styleUrl: './submit-button.component.scss',
})
export class SubmitButtonComponent {
  loading = input(false);

  submitIcon = input<'lucideSend' | 'lucideArrowRight'>('lucideArrowRight');
  submitText = input<'Next' | 'Send'>('Next');

  clicked = output();
}
