import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PostServiceService } from './post-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  decryptedToken:any
  storedUser:any
    constructor(
      private postServive:PostServiceService
    ){
      this.storedUser = localStorage.getItem('user');
    if (this.storedUser) {
      const user = JSON.parse(this.storedUser);
      this.decryptedToken =this.postServive.decryptData(user.token, 'token');

    }
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new headers.
    if (this.storedUser) {
      const authReq = req.clone({
        headers:req.headers.set('Authorization', `Token ${this.decryptedToken}`)
      })
      // console.log(req)
      return next.handle(authReq)
    } else {
      return next.handle(req)
    }
   
    // const authReq = req.clone({
    //   headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('authToken'))
    // });

    // Pass on the cloned request instead of the original request.
    
  }
}
