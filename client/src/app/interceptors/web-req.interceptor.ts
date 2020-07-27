import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../http/auth.service";
import { catchError, tap, switchMap } from "rxjs/operators";
import { Subject, Observable, empty, throwError } from "rxjs";

@Injectable({ providedIn: "root" })
export class WebReqInterceptor implements HttpInterceptor {
  refreshingAccessToken: boolean;
  accessTokenRefreshed: Subject<any> = new Subject();

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    request = this.addAuthHeader(request);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.refreshAccessToken().pipe(
            switchMap(() => {
              request = this.addAuthHeader(request);
              return next.handle(request);
            }),
            catchError((err: any) => {
              console.log(err);
              this.authService.logout();
              return empty;
            })
          );
        }
        return throwError(error);
      })
    );
  }

  refreshAccessToken() {
    if (this.refreshingAccessToken) {
      return new Observable((observer) => {
        this.accessTokenRefreshed.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshingAccessToken = true;

      return this.authService.getNewAccessToken().pipe(
        tap(() => {
          this.refreshingAccessToken = false;
          console.log("Token refreshed");
          this.accessTokenRefreshed.next();
        })
      );
    }
  }

  private addAuthHeader(request: HttpRequest<any>) {
    const token = this.authService.getAccessToken();

    if (token) {
      return request.clone({
        setHeaders: {
          "x-access-token": token,
        },
      });
    }
    return request;
  }
}
