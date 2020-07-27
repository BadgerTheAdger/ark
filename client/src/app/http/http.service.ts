import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class HttpService {
  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = environment.apiHerokuBaseUrl;
  }

  get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  post(uri: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  patch(uri: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }

  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }

  login(email: string, password: string) {
    return this.http.post(
      `${this.ROOT_URL}/login`,
      { email, password },
      { observe: "response" }
    );
  }

  signup(username: string, email: string, password: string) {
    console.log(environment.apiHerokuBaseUrl);
    return this.http.post(
      `${this.ROOT_URL}/signup`,
      { username, email, password },
      { observe: "response" }
    );
  }

  getOwnProfile() {
    return this.http.get<User>(`${this.ROOT_URL}/users/me`);
  }

  uploadProfileImage(formData: FormData) {
    return this.http.post(`${this.ROOT_URL}/users/me/avatar`, formData, { 
      headers: {
        _id: localStorage.getItem('user-id')
      }
    })
  }

  getProfileImage() {
    return this.http.get(`${this.ROOT_URL}/users/${localStorage.getItem('user-id')}/avatar`);
  }
}
