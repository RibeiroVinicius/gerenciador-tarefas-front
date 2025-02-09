import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserLogin } from '../interface/IUserLogin';
import { IUser } from '../interface/IUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8080/login'; // URL da API

  constructor(private http: HttpClient) { }

  login(user: IUserLogin): Observable<IUser> {
    return this.http.post<IUser>(this.apiUrl, user);
  }

  createUser(user: IUser): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/createUser`, user);
  }
}
