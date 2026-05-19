import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError, of } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const token = localStorage.getItem('token');

  // Clone request to add the Bearer token if it exists
  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(authReq).pipe(
    catchError((error) => {
      // 1. If it's a 401 on the 'me' call during initialization and we have no token, 
      // just clear state and don't try to refresh.
      if (error instanceof HttpErrorResponse && error.status === 401) {

        // 2. Prevent refresh loop: If the failed request WAS the refresh or login call, stop here.
        if (req.url.includes('auth/refresh') || req.url.includes('auth/login')) {
          authService.logout();
          return throwError(() => error);
        }

        // 3. If we have no token at all, don't even try to refresh
        if (!token) {
          return throwError(() => error);
        }

        // 4. Otherwise, attempt to refresh the token
        return authService.refreshToken().pipe(
          //SwitchMap is used when we to use flattening of higher order Observable.
          //Switchmap will only subscribe to the most recent inner observable and cancel any previous ones. 
          //flattening observables are used when 
            // Should old requests cancel ?
            // Should all run together ?
            // Should requests queue ?
            // Should new requests be ignored ?
          
          switchMap((res: any) => {
            authService.handleAuth(res.token);
            return next(req.clone({
              setHeaders: { Authorization: `Bearer ${res.token}` }
            }));
          }),
          catchError((refreshErr) => {
            authService.logout();
            return throwError(() => refreshErr);
          })
        );
      }
      return throwError(() => error);
    })
  );
};