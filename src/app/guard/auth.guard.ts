import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PersistanceService } from '../shared/persistance.service';

export const authGuard: CanActivateFn = (route,
  state,
  persistance = inject(PersistanceService),
  router = inject(Router)) => {
  const isLogged = persistance.get('ngrxToken')
  if(isLogged) {
    router.navigateByUrl('')
    return true;
  }
  router.navigateByUrl('login')
  return false
};
