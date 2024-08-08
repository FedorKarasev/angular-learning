import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, throwError } from 'rxjs';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.token;

  if (!token) return next(req);

  req = req.clone({
    setHeaders: {
      Authorization: 'Bearer ' + token,
    },
  });

  return next(req).pipe(
    catchError((error) => {
      if (error.status == 405) {
        return refreshAndProceed(AuthService, req, next);
      }

      return throwError(() => new Error('error'));
    })
  );
};

const refreshAndProceed = (
  service: AuthService,
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {};
