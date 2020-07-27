import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { CompanyService } from "./company.service";

@Injectable({ providedIn: "root" })
export class WorkersResolver implements Resolve<{ pager; pageOfItems }> {
  constructor(private companyService: CompanyService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<{ pager; pageOfItems }>
    | Promise<{ pager; pageOfItems }>
    | { pager; pageOfItems } {
        console.log(route.queryParams['search']);
    return this.companyService.searchForWorkers(1, route.params["companyId"], route.queryParams['search'], route.queryParams['role']);
  }
}
