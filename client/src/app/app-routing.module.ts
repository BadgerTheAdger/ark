import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupPageComponent } from './pages/home/signup-page/signup-page.component';
import { LoginPageComponent } from './pages/home/login-page/login-page.component';
import { ProfilePageComponent } from './pages/home/profile-page/profile-page.component';
import { UserResolver } from './http/user.resolver';
import { SelectLanguageComponent } from './pages/home/select-language/select-language.component';
import { CompaniesComponent } from './pages/home/companies/companies.component';
import { CreateCompanyComponent } from './pages/home/create-company/create-company.component';
import { CompaniesResolver } from './http/companies.resolver';
import { CompanyPageComponent } from './pages/home/company-page/company-page.component';
import { CompanyResolver } from './http/company.resolver';
import { WorkersResolver } from './http/workers.resolver';
import { AnimalsResolver } from './http/animals.resolver';
import { WorkersComponent } from './pages/home/workers/workers.component';
import { CreateWorkerComponent } from './pages/home/create-worker/create-worker.component';
import { WorkPageComponent } from './pages/home/work-page/work-page.component';
import { HerdInfoComponent } from './pages/home/work-page/herd-info/herd-info.component';
import { CreateAnimalComponent } from './pages/home/work-page/create-animal/create-animal.component';
import { DryMatterComponent } from './pages/home/work-page/dry-matter/dry-matter.component';
import { AnimalPageComponent } from './pages/home/work-page/herd-info/animal-page/animal-page.component';
import { AnimalResolver } from './http/animal.resolver';
import { AnimalWeightStatsComponent } from './pages/home/work-page/herd-info/animal-page/animal-weight-stats/animal-weight-stats.component';
import { AboutComponent } from './pages/home/about/about.component';
import { AnimalEditComponent } from './pages/home/work-page/herd-info/animal-page/animal-edit/animal-edit.component';


const routes: Routes = [
  { path: '', redirectTo: "home", pathMatch: "full" },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent},
  { path: 'companies', component: CompaniesComponent, resolve: { companies: CompaniesResolver } },
  { path: 'companies/create-company', component: CreateCompanyComponent },
  { path: 'companies/:companyId', component: CompanyPageComponent, resolve: { company: CompanyResolver } },
  { path: 'companies/:companyId/work-page', component: WorkPageComponent, children: [
    { path: 'herd-info', component: HerdInfoComponent, resolve: { animals: AnimalsResolver } },
    { path: 'herd-info/:animalId', component: AnimalPageComponent, resolve: { animal: AnimalResolver } },
    { path: 'herd-info/:animalId/weight-stats', component: AnimalWeightStatsComponent },
    { path: 'herd-info/:animalId/edit', component: AnimalEditComponent, resolve: { animal: AnimalResolver }},
    { path: 'dry-matter', component: DryMatterComponent }
  ] },
  { path: 'companies/:companyId/work-page/create-animal', component: CreateAnimalComponent },
  { path: 'companies/:companyId/workers', component: WorkersComponent, resolve: { workers: WorkersResolver } },
  { path: 'companies/:companyId/create-worker', component: CreateWorkerComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'profile/me', component: ProfilePageComponent, resolve: { user: UserResolver } },
  { path: 'settings/language', component: SelectLanguageComponent }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
