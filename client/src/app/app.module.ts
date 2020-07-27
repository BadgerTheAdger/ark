import { BrowserModule } from '@angular/platform-browser';
import { NgModule, MissingTranslationStrategy } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { TranslateModule, TranslateLoader, MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core'
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginPageComponent } from './pages/home/login-page/login-page.component';
import { SignupPageComponent } from './pages/home/signup-page/signup-page.component';
import { ProfilePageComponent } from './pages/home/profile-page/profile-page.component';
import { WebReqInterceptor } from './interceptors/web-req.interceptor';
import { SelectLanguageComponent } from './pages/home/select-language/select-language.component';
import { HeaderComponent } from './pages/home/header/header.component';
import { CompaniesComponent } from './pages/home/companies/companies.component';
import { CreateCompanyComponent } from './pages/home/create-company/create-company.component';
import { CompanyPageComponent } from './pages/home/company-page/company-page.component';
import { WorkersComponent } from './pages/home/workers/workers.component';
import { CreateWorkerComponent } from './pages/home/create-worker/create-worker.component';
import { WorkPageComponent } from './pages/home/work-page/work-page.component';
import { HerdInfoComponent } from './pages/home/work-page/herd-info/herd-info.component';
import { CreateAnimalComponent } from './pages/home/work-page/create-animal/create-animal.component';
import { DryMatterComponent } from './pages/home/work-page/dry-matter/dry-matter.component';
import { AnimalPageComponent } from './pages/home/work-page/herd-info/animal-page/animal-page.component';
import { AnimalWeightStatsComponent } from './pages/home/work-page/herd-info/animal-page/animal-weight-stats/animal-weight-stats.component';
import { AboutComponent } from './pages/home/about/about.component';
import { AnimalEditComponent } from './pages/home/work-page/herd-info/animal-page/animal-edit/animal-edit.component';


export class MissingTranslationService implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    return `WARN: '${params.key}' is missing in '${params.translateService.currentLang}' locale`;
  }
}

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginPageComponent,
    SignupPageComponent,
    ProfilePageComponent,
    SelectLanguageComponent,
    HeaderComponent,
    CompaniesComponent,
    CreateCompanyComponent,
    CompanyPageComponent,
    WorkersComponent,
    CreateWorkerComponent,
    WorkPageComponent,
    HerdInfoComponent,
    CreateAnimalComponent,
    DryMatterComponent,
    AnimalPageComponent,
    AnimalWeightStatsComponent,
    AboutComponent,
    AnimalEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MissingTranslationService },
      useDefaultLang: false,
    }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: WebReqInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
