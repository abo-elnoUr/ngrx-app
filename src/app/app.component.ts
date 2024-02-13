import { Component } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { slideInAnimation } from '../../animation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'ngrx-app';

  constructor(
    private titleService: Title,
    private contexts: ChildrenOutletContexts
    ) {
    this.titleService.setTitle($localize`${this.title}`)
  }

  getRouteAnimationData() {
    return this.contexts.getContext('reactive-form')?.route?.snapshot?.data?.['animation']
  }

  getAnimationState(outlet: any) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
