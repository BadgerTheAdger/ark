import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/models/animal.model';
import { CompanyService } from 'src/app/http/company.service';

@Component({
  selector: "app-animal-edit",
  templateUrl: "./animal-edit.component.html",
  styleUrls: ["./animal-edit.component.scss"],
})
export class AnimalEditComponent implements OnInit {
  animal: Animal;

  constructor(private route: ActivatedRoute, private companyService: CompanyService, private router: Router) {}

  ngOnInit() {
    this.animal = this.route.snapshot.data.animal;
  }

  onSubmit(species: string, herdNumber: string, age: string, weight: string) {
    this.companyService.updateAnimal(this.route.snapshot.params['companyId'], this.route.snapshot.params['animalId'], {
      herdNumber,
      species,
      age,
      weight
    }).subscribe(() => {
      console.log('updated')
      this.router.navigate(['..'], { relativeTo: this.route })
    })
  }
}
