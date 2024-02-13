import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink
  ],
  template: `
    <p i18n>
      home works!
    </p>
    
  `,
  styles: ``
})
export class HomeComponent {

}
