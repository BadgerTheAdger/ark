import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company.model';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { ProfileService } from 'src/app/http/profile.service';

@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.scss']
})
export class CompanyPageComponent implements OnInit {
  loadedCompany: Company;
  loggedUser: User;

  constructor(private route: ActivatedRoute, private profileService: ProfileService) { }

  ngOnInit() {
    this.loadedCompany = this.route.snapshot.data.company;
    this.profileService.getOwnProfile().subscribe((res: User) => {
      this.loggedUser = res;
    })
  }

}
