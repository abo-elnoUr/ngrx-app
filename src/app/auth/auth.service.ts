import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequestInterface } from './types/register-request.interface';
import { AuthResponseInterface } from './types/auth-response.interface';
import { Observable, map } from 'rxjs';
import { CurrentUserInterface } from '../shared/types/current-user.interface';
import { environment } from '../../environments/environment';

const apiUrl = `${environment.apiUrl + 'users'}`

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    return this.http.post<AuthResponseInterface>(apiUrl, data).pipe(map( res => res.user ))
  }
}
