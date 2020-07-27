import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/http/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;

  constructor() { }

  ngOnInit() {
    if(localStorage.getItem('x-access-token')) {
      this.isLoggedIn = true;
    }
  }

}
