import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  template: `
    <form [formGroup]="loginForm" (submit)="submit()">
      <div class="container">
        <h1>Login</h1>
        <p>Please fill in this form</p>
        <hr>
        <label for="email"><b>Email</b></label>
        <input type="text" placeholder="Enter Email" formControlName="email" id="email" >

        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password"formControlName="password" id="psw">

        <button type="submit" class="registerbtn">Login</button>
      </div>
    
      <div class="container signin">
        <p>Do not have account? <a routerLink="/register">Register</a>.</p>
      </div>
    </form>
  `,
    styles: `
    * {
      box-sizing: border-box;
      font-family: Arial
    }
    .container {
      padding: 16px;
      background-color: white;
      width: 50%;
      margin: 0 auto;
    }
    input[type=text], input[type=password] {
      width: 100%;
      padding: 15px;
      margin: 5px 0 10px 0;
      display: inline-block;
      border: none;
      background: #f1f1f1;
    }
    input[type=text]:focus, input[type=password]:focus {
      background-color: #ddd;
      outline: none;
    }
    hr {
      border: 1px solid #f1f1f1;
      margin-bottom: 25px;
    }
    .registerbtn {
      background-color: #04AA6D;
      color: white;
      padding: 16px 20px;
      margin: 8px 0;
      border: none;
      cursor: pointer;
      width: 100%;
      opacity: 0.9;
    }
    .registerbtn:hover {
      opacity: 1;
    }
    a {
      color: dodgerblue;
    }
    .signin {
      background-color: #f1f1f1;
      text-align: center;
    }`
})
export class LoginComponent {

  loginForm = this._formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private _formBuilder: FormBuilder){}

  submit() {

  }

}
