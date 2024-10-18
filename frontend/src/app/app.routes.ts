import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
    data: { animation: 'HomePage' },
  },
  {
    path: 'send',
    loadComponent: () =>
      import('./send/send.component').then((c) => c.SendComponent),
    data: { animation: 'SendPage' },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
