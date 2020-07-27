import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { CompanyService } from "./company.service";

@Injectable({ providedIn: "root" })
export class AnimalsResolver implements Resolve<{ pager; pageOfItems }> {
  constructor(private companyService: CompanyService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<{ pager; pageOfItems }>
    | Promise<{ pager; pageOfItems }>
    | { pager; pageOfItems } {
    console.log(route.parent.params['companyId']);
    return this.companyService.getAnimals(1, route.parent.params['companyId']);
  }
}
