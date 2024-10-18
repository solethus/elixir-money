import { Component, input } from '@angular/core';
import { HlmH2Directive } from '@spartan-ng/ui-typography-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HlmH2Directive, HlmIconComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  showBackButton = input(true);
  title = input.required<string>();
}
