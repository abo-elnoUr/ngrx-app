import { Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';
import { isLoggingGuard } from './guard/is-logging.guard';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '' },
    { 
        path: '',
        loadComponent: () => import ('./pages/home/home.component').then( m => m.HomeComponent),
        // canActivate: [authGuard]
    },
    {
        path: 'register',
        loadComponent: () => import ('./auth/register/register.component').then( m => m.RegisterComponent),
    },
    {
        path: 'login',
        loadComponent: () => import ('./auth/login/login.component').then( m => m.LoginComponent),
        // canActivate: [isLoggingGuard]
    },
    {
        path: 'reactive-form',
        loadComponent: () => import ('./pages/forms/reactive-forms/reactive-forms.component').then( c => c.ReactiveFormsComponent )
    }
];
