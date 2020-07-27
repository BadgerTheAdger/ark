import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user.model";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CompanyService } from "src/app/http/company.service";
import { ProfileService } from "src/app/http/profile.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-workers",
  templateUrl: "./workers.component.html",
  styleUrls: ["./workers.component.scss"],
})
export class WorkersComponent implements OnInit {
  workers: User[];
  pager: any;
  companyId: string;
  search: string;
  roleSelected: string;
  loggedUser: User;
  searchPlaceholder: string;

  constructor(
    private router: Router,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.searchPlaceholder = this.translateService.get('WORKERS.SEARCH')['value'];
    this.workers = this.route.snapshot.data.workers.pageOfItems;
    this.pager = this.route.snapshot.data.workers.pager;
    this.route.params.subscribe((params: Params) => {
      this.companyId = params["companyId"];
    });
    this.profileService.getOwnProfile().subscribe((res: User) => {
      this.loggedUser = res;
    });
    this.route.queryParams.subscribe((x) => this.loadPage(x.page || 1));
  }

  searchData(event) {
    if (event.type === "change") {
      switch (event.target.value.toLowerCase()) {
        case "all":
        case "все":
        case "усі":
          this.roleSelected = "all";
          break;
        case "basic":
        case "обычные":
        case "звичайні":
          this.roleSelected = "basic";
          break;
        case "admins":
        case "админы":
        case "адміни":
          this.roleSelected = "admin";
          break;
      }
    } else {
      this.search = event.target.value;
    }
    // console.log(this.search);
    // console.log(this.roleSelected);
    this.companyService
      .searchForWorkers(1, this.companyId, this.search, this.roleSelected)
      .subscribe((workers) => {
        this.pager = workers.pager;
        this.workers = workers.pageOfItems;
      });
  }

  onDeleteWorker(workerId) {
    this.companyService
      .deleteWorker(this.companyId, workerId)
      .subscribe((deletedWorker) => {
        this.loadPage(
          this.workers.length > 1
            ? this.pager.currentPage
            : this.pager.currentPage - 1
        );
      });
  }

  private loadPage(page) {
    // get page of items from api
    this.companyService
      .searchForWorkers(
        page,
        this.route.snapshot.params["companyId"],
        this.search,
        this.roleSelected
      )
      .subscribe((x: any) => {
        this.pager = x.pager;
        this.workers = x.pageOfItems;
      });
  }
}
