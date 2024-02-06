import { Component, Input, OnInit } from '@angular/core';
import { BackendErrorInterface } from '../types/backend-error.interface';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-backend-errors',
  standalone: true,
  imports: [
    NgFor
  ],
  template: `
    <ul>
      <li style="color: red;" *ngFor="let er of errorMessage">{{ er }}</li>
    </ul>
  `,
  styles: ``
})
export class BackendErrorsComponent implements OnInit {
  @Input() backendErrors: BackendErrorInterface = {}
  errorMessage: string[] = []

  ngOnInit(): void {
    this.errorMessage = Object.keys(this.backendErrors).map((name) => {
      const messages = this.backendErrors[name].join(' ')
      return `${name} ${messages}`
    })
  }

}
