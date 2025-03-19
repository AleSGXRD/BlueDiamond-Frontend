import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthManagerService } from '../services/managers/auth/auth-manager.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authManagerService = inject(AuthManagerService)

  if(authManagerService.logged)
  {
    return true;
  }
  else{
    const router = inject(Router)
    router.navigate(['login'])
    return false;
  }
};
