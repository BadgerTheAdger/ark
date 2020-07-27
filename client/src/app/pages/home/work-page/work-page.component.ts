import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/http/profile.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-work-page',
  templateUrl: './work-page.component.html',
  styleUrls: ['./work-page.component.scss']
})
export class WorkPageComponent implements OnInit {
  loggedUser: User;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getOwnProfile().subscribe((res: User) => {
      this.loggedUser = res;
    })
  }

}
