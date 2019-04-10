import {Injectable} from '@angular/core';
import {HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {delay, mergeMap, materialize, dematerialize} from 'rxjs/operators';
import {AuthenticationService} from './aunthetication.service';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // wrap in delayed observable to simulate server api call
    /*  return of(null).pipe(mergeMap(() => {
        if (request.url.endsWith('/items') && request.method === 'POST') {
          localStorage.setItem('list', JSON.stringify(request.body));
          console.log('request', request);
          return ok(request.body);
        }
        // get all users
        if (request.url.endsWith('/items') && request.method === 'GET') {
          const list = localStorage.getItem('list');
          console.log('request', request);
          console.log('response body', list ? JSON.parse(list) : {items: []});
          return ok(list ? JSON.parse(list) : {items: []});
        }
        // pass through any requests not handled above
        return next.handle(request);
      }))
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());*/

    request = request.clone({
      withCredentials: true,
      headers: request.headers.set('Authorization', `Bearer ${this.authService.getToken()}`)
    });
    console.log(request);

    return next.handle(request);

    // private helper functions

    function ok(body) {
      return of(new HttpResponse({status: 200, body}));
    }

    function unauthorised() {
      return throwError({status: 401, error: {message: 'Unauthorised'}});
    }

    function error(message) {
      return throwError({status: 400, error: {message}});
    }
  }
}

