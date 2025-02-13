import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ETaskStatus, ITask } from '../interface/ITask';
import { IUser } from '../interface/IUser';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/tasks'; // URL da sua API
  public _headers: any = {};

  constructor(private http: HttpClient) {
    if (window.sessionStorage.getItem("authToken")) {
      this._headers = {
        Authorization: "Bearer " + window.sessionStorage.getItem("authToken")
      };
    }
  }


  // Listar todas as tarefas
  getAllTasks(user: string): Observable<ITask[]> {
    const params = new HttpParams().set('user', user);
    return this.http.get<ITask[]>(this.apiUrl, { params, headers: this._headers });
  }

  // Criar uma nova tarefa
  createTask(task: ITask): Observable<any> {
    return this.http.post(this.apiUrl, task, { headers: this._headers });
  }

  // Buscar uma tarefa específica
  getTaskById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this._headers });
  }

  // Atualizar uma tarefa existente
  updateTask(id: number, task: ITask): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, task, { headers: this._headers });
  }

  // Excluir uma tarefa
  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this._headers });
  }

  // Filtrar tarefas por status
  filterTasksByStatus(status: ETaskStatus, user: string): Observable<ITask[]> {
    const params = new HttpParams().set('user', user);
    return this.http.get<ITask[]>(`${this.apiUrl}/filter?status=${status}`, { params, headers: this._headers });
  }
}
