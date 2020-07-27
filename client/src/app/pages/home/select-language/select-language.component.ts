import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss']
})
export class SelectLanguageComponent implements OnInit {
  selectedLanguage: string;

  constructor(private translateService: TranslateService) { }

  ngOnInit() {
    this.selectedLanguage = this.translateService.currentLang;
  }

  selectLanguage(locale: string) {
    this.translateService.use(locale)
    this.selectedLanguage = this.translateService.currentLang;
  }
}
