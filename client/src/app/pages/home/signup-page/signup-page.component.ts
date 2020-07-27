import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/http/auth.service";
import { HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-signup-page",
  templateUrl: "./signup-page.component.html",
  styleUrls: ["./signup-page.component.scss"],
})
export class SignupPageComponent implements OnInit {
  usernamePlaceholder: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.usernamePlaceholder = this.translateService.get('SIGNUP.USERNAME')['value'];
    this.emailPlaceholder = this.translateService.get('SIGNUP.EMAIL')['value'];
    this.passwordPlaceholder = this.translateService.get('SIGNUP.PASSWORD')['value'];
  }

  onSubmit(username: string, email: string, password: string) {
    this.authService
      .signup(username, email, password)
      .subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.router.navigate(["/profile/me"]);
      });
  }
}
