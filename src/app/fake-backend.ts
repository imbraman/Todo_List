import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import {ListItem, Status} from './model/list-item';



@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const todoItems: ListItem[] = [
      {id: '200ed4cb-2773-42af-8a60-3177c1a06fe4', description: 'create better list', status: Status.TODO}
    ];

    const authHeader = request.headers.get('Authorization');
    const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');

    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {

      // get all users
      if (request.url.endsWith('/items') && request.method === 'GET') {
        return ok(todoItems);
      }

      // pass through any requests not handled above
      return next.handle(request);
    }))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    // private helper functions

    function ok(body) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function unauthorised() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function error(message) {
      return throwError({ status: 400, error: { message } });
    }
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
