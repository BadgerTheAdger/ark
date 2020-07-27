import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { ProfileService } from "./profile.service";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class UserResolver implements Resolve<User> {
  constructor(private profileService: ProfileService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User> | Promise<User> | User {
    return this.profileService.getOwnProfile();
  }
}
