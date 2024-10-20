import { Routes } from '@angular/router';
import {
  trigger,
  transition,
  style,
  animate,
  animateChild,
  group,
  query,
} from '@angular/animations';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
    data: { animation: 'HomePage' },
  },
  {
    path: 'lookup',
    loadComponent: () =>
      import('./lookup/lookup.component').then((c) => c.LookupComponent),
    data: { animation: 'LookupPage' },
  },
  {
    path: 'send',
    loadComponent: () =>
      import('./send/send.component').then((c) => c.SendComponent),
    data: { animation: 'SendPage' },
  },
  {
    path: 'confirm',
    loadComponent: () =>
      import('./confirm/confirm.component').then((c) => c.ConfirmComponent),
    data: { animation: 'ConfirmPage' },
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export const slideInAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ],
      { optional: true },
    ),
    query(':enter', [style({ left: '100%' })], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(
        ':leave',
        [animate('200ms ease-out', style({ left: '-100%', opacity: 0 }))],
        { optional: true },
      ),
      query(':enter', [animate('300ms ease-out', style({ left: '0%' }))], {
        optional: true,
      }),
      query('@*', animateChild(), { optional: true }),
    ]),
  ]),
]);
