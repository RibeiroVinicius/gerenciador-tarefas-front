import { Injectable } from '@angular/core';
import { IUser } from '../interface/IUser';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/user'; // URL da API


  constructor(private http: HttpClient) { }

  createUser(user: IUser): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}`, user);
  }
}
