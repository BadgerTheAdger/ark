import { Component, OnInit } from "@angular/core";
import { CompanyService } from "src/app/http/company.service";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-create-animal",
  templateUrl: "./create-animal.component.html",
  styleUrls: ["./create-animal.component.scss"],
})
export class CreateAnimalComponent implements OnInit {
  companyId: string;
  numberPlaceholder: string;
  speciesPlaceholder: string;
  agePlaceholder: string;
  weightPlaceholder: string;

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.numberPlaceholder = this.translateService.get('CREATEANIMAL.HERDNUMBER')['value'];
    this.speciesPlaceholder = this.translateService.get('CREATEANIMAL.SPECIES')['value'];
    this.agePlaceholder = this.translateService.get('CREATEANIMAL.AGE')['value'];
    this.weightPlaceholder = this.translateService.get('CREATEANIMAL.WEIGHT')['value'];

    this.route.params.subscribe((params: Params) => {
      this.companyId = params["companyId"];
    });
  }

  onSubmit(herdNumber, species, age, weight) {
    this.companyService
      .createAnimal(
        this.companyId,
        herdNumber,
        species.toLowerCase(),
        age,
        weight
      )
      .subscribe(() => {
        this.router.navigate(["..", "herd-info"], { relativeTo: this.route });
      });
  }
}
