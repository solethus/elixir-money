import { Component, inject } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { slideInAnimation } from './app.routes';
import { DOCUMENT } from '@angular/common';
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HlmToasterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [slideInAnimation],
})
export class AppComponent {
  title = 'elixir';

  constructor(private contexts: ChildrenOutletContexts) {
    const document = inject(DOCUMENT);
    const documentClassList = document.documentElement.classList;

    const prefersDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    documentClassList.toggle('dark', prefersDarkQuery.matches);
    prefersDarkQuery.addEventListener('change', (e) =>
      documentClassList.toggle('dark', e.matches),
    );
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
