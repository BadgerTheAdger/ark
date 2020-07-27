import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { HttpService } from "./http.service";
import { Router } from "@angular/router";
import { tap, shareReplay } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private router: Router
  ) {}

  login(email: string, password: string) {
    return this.httpService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
      })
    );
  }

  signup(username: string, email: string, password: string) {
    return this.httpService.signup(username, email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
      })
    );
  }

  getAccessToken() {
    return localStorage.getItem("x-access-token");
  }

  getRefreshToken() {
    return localStorage.getItem("x-refresh-token");
  }

  getUserId() {
    return localStorage.getItem("user-id");
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem("x-access-token", accessToken);
  }

  private setSession(
    userId: string,
    accessToken: string,
    refreshToken: string
  ) {
    localStorage.setItem("user-id", userId);
    localStorage.setItem("x-access-token", accessToken);
    localStorage.setItem("x-refresh-token", refreshToken);
  }

  private removeSession() {
    localStorage.removeItem("user-id");
    localStorage.removeItem("x-access-token");
    localStorage.removeItem("x-refresh-token");
  }

  getNewAccessToken() {
    return this.http
      .get(`${this.httpService.ROOT_URL}/access-token`, {
        headers: {
          "x-refresh-token": this.getRefreshToken(),
          _id: this.getUserId(),
        },
        observe: "response",
      })
      .pipe(
        tap((res: HttpResponse<any>) => {
          this.setAccessToken(res.headers.get("x-access-token"));
        })
      );
  }

  logout() {
    this.removeSession();
    // navigate
  }
}
