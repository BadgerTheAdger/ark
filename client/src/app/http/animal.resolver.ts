import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    ActivatedRoute,
    Params,
  } from "@angular/router";
  import { Observable } from "rxjs";
  import { Injectable } from "@angular/core";
import { Company } from '../models/company.model';
import { CompanyService } from './company.service';
import { Animal } from '../models/animal.model';
  
  @Injectable({ providedIn: "root" })
  export class AnimalResolver implements Resolve<Animal> {
    constructor(private companyService: CompanyService, private route: ActivatedRoute) {}
  
    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<Animal> | Promise<Animal> | Animal {
        // return this.companyService.getCompany(route.params['companyId']);
        return this.companyService.getAnimal(route.params['companyId'], route.params['animalId']);
    }
  }