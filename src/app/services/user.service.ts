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

  /**
   * Cria um novo usuario na base de dados
   * @param user dados do usuario a ser criado
   * @returns um Observable que emite um booleano indicando se o usuario foi criado com sucesso
   */
  createUser(user: IUser): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}`, user);
  }
}
