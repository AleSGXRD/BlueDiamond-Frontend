import { HttpInterceptorFn } from '@angular/common/http';
import { AuthManagerService } from '../services/managers/auth/auth-manager.service';
import { inject } from '@angular/core';

export const apiRequestInterceptor: HttpInterceptorFn = (req, next) => {
  var authManagerService = inject(AuthManagerService)

  const tokenizeReq = req.clone({
    headers : req.headers.append("Authorization", `Bearer ${authManagerService.logged}`)
  })

  return next(tokenizeReq);
};
