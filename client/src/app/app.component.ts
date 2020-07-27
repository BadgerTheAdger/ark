import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.translateService.addLangs(['en', 'ua', 'ru'])
    this.translateService.setDefaultLang('ru');
    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use('en');
  }
}
