import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpService } from "./http.service";
import { AuthService } from "./auth.service";
import { Company } from "../models/company.model";
import { Animal } from '../models/animal.model';

@Injectable({
  providedIn: "root",
})
export class CompanyService {
  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private authService: AuthService
  ) {}

  createCompany(title: string) {
    return this.http.post(
      `${this.httpService.ROOT_URL}/companies`,
      {
        companyName: title,
      },
      {
        headers: {
          "x-access-token": this.authService.getAccessToken(),
        },
      }
    );
  }

  getCompany(companyId: string) {
    return this.http.get<Company>(
      `${this.httpService.ROOT_URL}/companies/${companyId}`,
      {
        headers: {
          "x-access-token": this.authService.getAccessToken(),
        },
      }
    );
  }

  deleteCompany(companyId: string) {
    return this.http.delete(
      `${this.httpService.ROOT_URL}/companies/${companyId}`,
      {
        headers: {
          "x-access-token": this.authService.getAccessToken(),
        },
      }
    );
  }

  getCompanies(page) {
    return this.http.get<any>(
      `${this.httpService.ROOT_URL}/companies?page=${page}`,
      {
        headers: {
          "x-access-token": this.authService.getAccessToken(),
        },
      }
    );
  }

  createWorker(
    companyId: string,
    username: string,
    email: string,
    password: string,
    role: string
  ) {
    return this.http.post(`${this.httpService.ROOT_URL}/companies/${companyId}/workers`, {
      username,
      email,
      password,
      role
    })
  }

  getWorkers(page, companyId) {
    return this.http.get<any>(
      `${this.httpService.ROOT_URL}/companies/${companyId}/workers?page=${page}`
    );
  }

  searchForWorkers(page, companyId, data = "", role = "all") {
    return this.http.get<any>(
      `${this.httpService.ROOT_URL}/companies/${companyId}/workers?page=${page}&search=${data}&role=${role}`,
      {
        headers: {
          "x-access-token": this.authService.getAccessToken(),
        },
      }
    );
  }

  deleteWorker(companyId, workerId) {
    return this.http.delete(
      `${this.httpService.ROOT_URL}/companies/${companyId}/workers/${workerId}`,
      {
        headers: {
          "x-access-token": this.authService.getAccessToken(),
        },
      }
    );
  }

  createAnimal(companyId, herdNumber, species, age, weight) {
    return this.http.post(`${this.httpService.ROOT_URL}/companies/${companyId}/animals`, {
      herdNumber,
      species,
      age,
      weight
    })
  }

  getAnimal(companyId, animalId) {
    return this.http.get<Animal>(`${this.httpService.ROOT_URL}/companies/${companyId}/animals/${animalId}`)
  }

  getAnimals(page, companyId) {
    return this.http.get<any>(`${this.httpService.ROOT_URL}/companies/${companyId}/animals?page=${page}`)
  }

  updateAnimal(companyId, animalId, payload) {
    return this.http.patch(`${this.httpService.ROOT_URL}/companies/${companyId}/animals/${animalId}`, payload);
  }

  deleteAnimal(companyId, animalId) {
    return this.http.delete(`${this.httpService.ROOT_URL}/companies/${companyId}/animals/${animalId}`)
  }

  searchForAnimals(page, companyId, data = "") {
    return this.http.get<any>(
      `${this.httpService.ROOT_URL}/companies/${companyId}/animals?page=${page}&search=${data}`,
      {
        headers: {
          "x-access-token": this.authService.getAccessToken(),
        },
      }
    );
  }

  getDryMatter(cowWeight, milkPerDayKg) {
    return this.http.post(`${this.httpService.ROOT_URL}/dry-matter`, {
      cowWeight,
      milkPerDayKg
    })
  }
}
