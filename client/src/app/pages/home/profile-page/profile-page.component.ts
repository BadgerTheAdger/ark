import { Component, OnInit } from "@angular/core";
import { ProfileService } from "src/app/http/profile.service";
import { HttpResponse } from "@angular/common/http";
import { User } from "src/app/models/user.model";
import { ActivatedRoute, Router } from "@angular/router";
import { Image } from "src/app/models/image.model";
import { toBase64String } from "@angular/compiler/src/output/source_map";
import { AuthService } from 'src/app/http/auth.service';
declare const Buffer;

@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-page.component.html",
  styleUrls: ["./profile-page.component.scss"],
})
export class ProfilePageComponent implements OnInit {
  selectedFile: File;
  loadedUser: User;
  avatarImageSource: string;

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadedUser = this.route.snapshot.data.user;
    console.log(this.loadedUser);
    this.avatarImageSource = "data:image/png;base64," + this.loadedUser.avatar;
    // this.profileService.getProfileImage().subscribe((avatar: Image) => {
    //   this.avatarImageSource = "data:image/png;base64," + this._arrayBufferToBase64(avatar.avatar.data);
    // })
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    const fd = new FormData();
    fd.append("avatar", this.selectedFile, this.selectedFile.name);
    this.profileService.uploadProfileImage(fd).subscribe((avatar: Image) => {
      this.avatarImageSource =
        "data:image/png;base64," +
        this._arrayBufferToBase64(avatar.avatar.data);
    });
    console.log(event);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private _arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  
}
