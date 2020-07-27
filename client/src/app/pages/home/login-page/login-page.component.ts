import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/http/auth.service";
import { HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent implements OnInit {
  emailPlaceholder: string;
  passwordPlaceholder: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.emailPlaceholder = this.translateService.get('LOGIN.EMAIL')['value'];
    this.passwordPlaceholder = this.translateService.get('LOGIN.PASSWORD')['value'];
  }

  onSubmit(email: string, password: string) {
    this.authService
      .login(email, password)
      .subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.router.navigate(["/home"]);
      });
  }
}
