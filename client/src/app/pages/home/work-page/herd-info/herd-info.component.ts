import { Component, OnInit } from "@angular/core";
import { Animal } from "src/app/models/animal.model";
import { CompanyService } from "src/app/http/company.service";
import { ActivatedRoute, Params } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-herd-info",
  templateUrl: "./herd-info.component.html",
  styleUrls: ["./herd-info.component.scss"],
})
export class HerdInfoComponent implements OnInit {
  animals: Animal[];
  companyId: string;
  pager: any;
  search: string;
  searchPlaceholder: string;

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.animals = this.route.snapshot.data.animals.pageOfItems;
    this.pager = this.route.snapshot.data.animals.pager;
    this.route.parent.params.subscribe((params: Params) => {
      this.companyId = params['companyId'];
    })
    this.route.queryParams.subscribe((x) => this.loadPage(x.page || 1));
    this.searchPlaceholder = this.translateService.get('HERDINFO.SEARCH')['value'];
  }

  onDeleteAnimal(animalId) {
    this.companyService.deleteAnimal(this.companyId, animalId).subscribe(() => {
      console.log('animal deleted');
      this.loadPage(
        this.animals.length > 1
          ? this.pager.currentPage
          : this.pager.currentPage - 1
      );
    })
  }

  private loadPage(page) {
    // get page of items from api
    this.companyService
      .getAnimals(page, this.companyId)
      .subscribe((x: any) => {
        this.pager = x.pager;
        this.animals = x.pageOfItems;
      });
  }

  searchData(event) {
    console.log('test')
    this.search = event.target.value;
    this.companyService
      .searchForAnimals(1, this.companyId, this.search)
      .subscribe((animals) => {
        this.pager = animals.pager;
        this.animals = animals.pageOfItems;
      });
  }
}
