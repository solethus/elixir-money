import { Component } from '@angular/core';
import {
  HlmH2Directive,
  HlmH4Directive,
  HlmPDirective,
} from '@spartan-ng/ui-typography-helm';
import { User, UserService } from '../state/user.service';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HlmButtonDirective,
    RouterLink,
    HlmH2Directive,
    HlmH4Directive,
    HlmPDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  user: User | null;

  constructor(private userService: UserService) {
    this.user = this.userService.user();
  }
}
