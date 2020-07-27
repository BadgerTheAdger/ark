import { Component, OnInit } from "@angular/core";
import { CompanyService } from "src/app/http/company.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ProfileService } from "src/app/http/profile.service";
import { User } from "src/app/models/user.model";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-create-worker",
  templateUrl: "./create-worker.component.html",
  styleUrls: ["./create-worker.component.scss"],
})
export class CreateWorkerComponent implements OnInit {
  selectedCompanyId: string;
  loggedUser: User;
  usernamePlaceholder: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.usernamePlaceholder = this.translateService.get('CREATEWORKER.USERNAME')['value'];
    this.emailPlaceholder = this.translateService.get('CREATEWORKER.EMAIL')['value'];
    this.passwordPlaceholder = this.translateService.get('CREATEWORKER.PASSWORD')['value'];
    this.route.params.subscribe((params: Params) => {
      this.selectedCompanyId = params["companyId"];
    });
    this.profileService.getOwnProfile().subscribe((res: User) => {
      this.loggedUser = res;
    });
  }

  onSubmit(username: string, email: string, password: string, role: string) {
    switch (role) {
      case "Admin":
      case "Админ":
      case "Адмін":
        role = "Admin";
        break;
      case "Basic":
      case "Обычный":
      case "Звичайний":
        role = "Basic";
        break;
    }
    this.companyService
      .createWorker(
        this.selectedCompanyId,
        username,
        email,
        password,
        role.toLowerCase()
      )
      .subscribe(() => {
        console.log("worker created");
      });
    this.router.navigate(["..", "workers"], { relativeTo: this.route });
  }
}
