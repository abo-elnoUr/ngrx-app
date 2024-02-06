import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthStateInterface } from '../types/auth-state.interface';
import { selectIsSubmitting, selectValidatorError } from '../store/reducers';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { RegisterRequestInterface } from '../types/register-request.interface';
import { authActions } from '../store/actions';
import { combineLatest } from 'rxjs';
import { BackendErrorsComponent } from '../../shared/backend-errors/backend-errors.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    AsyncPipe,
    BackendErrorsComponent
  ],
  template: `
  @if (data$ | async; as data) {
    <form [formGroup]="registerForm" (submit)="submit()">
      <div class="container">
        
        <h1 i18n>Register</h1>
        <p i18n>Please fill in this form to create an account.</p>
        <hr>

        @if (data.errors) {
          <app-backend-errors [backendErrors]="data.errors" ></app-backend-errors>
        }
        
        <label i18n style="margin-top: 10px;" for="username"><b>User Name</b></label>
        <input type="text" i18n-placeholder placeholder="User Name" formControlName="username" id="username">
        @if (registerForm.controls.username.errors && registerForm.controls.username.touched) {
          @if (registerForm.controls.username.errors['required']) {
            <small i18n style="color: red !important;">this field is required</small>
          }
          @if (registerForm.controls.username.errors['minlength']) {
            <small i18n style="color: red !important;">min length is 3 chars</small>
          }
        }
        <br>

        <label i18n style="margin-top: 10px;" for="email"><b>Email</b></label>
        <input type="text" i18n-placeholder placeholder="Enter Email" formControlName="email" id="email" >
        @if (registerForm.controls.email.errors && registerForm.controls.email.touched) {
          @if (registerForm.controls.email.errors['required']) {
            <small i18n style="color: red !important;">this field is required</small>
          }
          @if (registerForm.controls.email.errors['email']) {
            <small i18n style="color: red !important;">this field must be valid email format</small>
          }
        }
        <br>

        <label i18n for="psw"><b>Password</b></label>
        <input i18n-placeholder type="password" placeholder="Enter Password"formControlName="password" id="psw">
        @if (registerForm.controls.password.errors && registerForm.controls.password.touched) {
          @if (registerForm.controls.password.errors['required']) {
            <small i18n style="color: red !important;">this field is required</small>
          }
          @if (registerForm.controls.password.errors['minlength']) {
            <small i18n style="color: red !important;">min length is 6 chars</small>
          }
        }
        <br>

        <p i18n>By creating an account you agree to our <a>Terms & Privacy</a>.</p>

        <button i18n type="submit" class="registerbtn">Register</button>
      </div>
    
      <div class="container signin">
        <p i18n>Already have an account? <a routerLink="/login">Sign in</a>.</p>
      </div>
    </form>
  }
    
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
export class RegisterComponent {

  registerForm = this._formBuilder.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(
    private store: Store<{ auth: AuthStateInterface }>,
    private _formBuilder: FormBuilder
  ) { }



  data$ = combineLatest({
    isSubmitting : this.store.select(selectIsSubmitting),
    errors : this.store.select(selectValidatorError)
  })

  submit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched()
    } else {
      const request: RegisterRequestInterface = {
        user: this.registerForm.getRawValue()
      }
      this.store.dispatch(authActions.register({request}))
      // ___________________________________
      this.registerForm.reset()
    }
  }

}
