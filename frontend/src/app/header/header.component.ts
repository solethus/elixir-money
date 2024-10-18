import { Component, input } from '@angular/core';
import { HlmH2Directive } from '@spartan-ng/ui-typography-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { RouterLink } from '@angular/router';
import { lucideChevronLeft } from '@ng-icons/lucide';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HlmH2Directive, HlmIconComponent, RouterLink],
  providers: [provideIcons({ lucideChevronLeft })],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  backButtonUrl = input<string[]>();
  title = input.required<string>();
}
