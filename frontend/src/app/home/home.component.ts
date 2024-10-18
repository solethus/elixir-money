import { Component } from '@angular/core';
import {
  HlmH2Directive,
  HlmH4Directive,
  HlmPDirective,
} from '@spartan-ng/ui-typography-helm';
import { UserService } from '../state/user.service';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { RouterLink } from '@angular/router';
import { users } from '@client';
import { HeaderComponent } from '../header/header.component';

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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  user: users.User;

  constructor(private userService: UserService) {
    this.user = this.userService.user();
  }
}
