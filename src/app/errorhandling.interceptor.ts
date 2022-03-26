import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { SnackbarService } from './services/snackbar.service';
import { AuthService } from './services/auth.service';
import { AdminAuthService } from './services/admin-auth.service';


@Injectable()
export class ErrorhandlingInterceptor implements HttpInterceptor {

  constructor(
    private snackbarService:SnackbarService,
    private authService:AuthService,
    private adminAuthService:AdminAuthService
  ) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if(error.error.message === 'Unauthenticated.'){
            this.authService.logout();
          }else if(error.status === 401 && error.error === 'Unauthenticated'){
            this.adminAuthService.logout();
          }else if (error.error instanceof ErrorEvent) {
            console.log('This is client side error');
            errorMsg = `Error: ${error.error.message}`;
          } else {
            // console.log('This is server side error');
            this.snackbarService.error('Server connection was not established !')
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          
          console.log(errorMsg);
          return throwError(errorMsg);
        })
      )
  }
}
