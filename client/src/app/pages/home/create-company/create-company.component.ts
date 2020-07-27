import { Component, OnInit } from "@angular/core";
import { CompanyService } from "src/app/http/company.service";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-create-company",
  templateUrl: "./create-company.component.html",
  styleUrls: ["./create-company.component.scss"],
})
export class CreateCompanyComponent implements OnInit {
  namePlaceholder: string;
  constructor(
    private companyService: CompanyService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.namePlaceholder = this.translateService.get('CREATECOMPANY.NAME')['value'];
  }

  createCompany(title: string) {
    this.companyService.createCompany(title).subscribe((company) => {
      console.log(company);
      this.router.navigate(["/companies"]);
    });
  }
}
