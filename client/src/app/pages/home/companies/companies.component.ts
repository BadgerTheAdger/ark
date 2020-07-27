import { Component, OnInit } from "@angular/core";
import { CompanyService } from "src/app/http/company.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Company } from "src/app/models/company.model";
import { Subject } from "rxjs";

@Component({
  selector: "app-companies",
  templateUrl: "./companies.component.html",
  styleUrls: ["./companies.component.scss"],
})
export class CompaniesComponent implements OnInit {
  companies: Company[];
  pager: any;

  constructor(
    private router: Router,
    private companyService: CompanyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.companies = this.route.snapshot.data.companies.companies;
    this.pager = this.route.snapshot.data.companies.pager;
    this.route.queryParams.subscribe((x) => this.loadPage(x.page || 1));
  }

  onCreateCompany() {
    this.router.navigate(["/companies/create-company"]);
  }

  onDeleteCompany(companyId: string) {
    this.companyService.deleteCompany(companyId).subscribe((company: Company) => {
      console.log(company);
      this.loadPage(this.companies.length > 1 ? this.pager.currentPage : this.pager.currentPage - 1);
    })
  }

  private loadPage(page) {
    // get page of items from api
    this.companyService.getCompanies(page).subscribe((x: any) => {
      this.pager = x.pager;
      this.companies = x.pageOfItems;
    });
  }
}
