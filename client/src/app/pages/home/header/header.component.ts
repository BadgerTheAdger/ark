import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/http/profile.service';
import { User } from 'src/app/models/user.model';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/http/company.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  loggedUser: User;
  // hostCompany: Company;

  constructor(private profileService: ProfileService, private companyService: CompanyService) { }

  ngOnInit() {
    if(localStorage.getItem('x-access-token')) {
      this.isLoggedIn = true;
    }
    this.profileService.getOwnProfile().subscribe((res: User) => {
      this.loggedUser = res;
      // this.companyService.getCompany(this.loggedUser._hostCompanyId).subscribe((res: Company) => {
      //   this.hostCompany = res;
      // })
    })
  }
  

}
