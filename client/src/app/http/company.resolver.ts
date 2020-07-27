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
  
  @Injectable({ providedIn: "root" })
  export class CompanyResolver implements Resolve<Company> {
    constructor(private companyService: CompanyService, private route: ActivatedRoute) {}
  
    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<Company> | Promise<Company> | Company {
        return this.companyService.getCompany(route.params['companyId']);
    }
  }
  