import { Injectable, OnInit } from "@angular/core";
import { HttpService } from "./http.service";
import { HttpResponse } from "@angular/common/http";
import { User } from '../models/user.model';

@Injectable({
  providedIn: "root",
})
export class ProfileService implements OnInit {
  loadedUser: User;

  constructor(private httpService: HttpService) {}

  ngOnInit() {}

  getOwnProfile() {
    return this.httpService.getOwnProfile();
  }

  uploadProfileImage(formData: FormData) {
    return this.httpService.uploadProfileImage(formData);
  }

  getProfileImage() {
    return this.httpService.getProfileImage();
  }
}
