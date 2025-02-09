import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ETaskStatus, ITask } from '../interface/ITask';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/tasks'; // URL da sua API

  constructor(private http: HttpClient) {}

  // Listar todas as tarefas
  getAllTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.apiUrl);
  }

  // Criar uma nova tarefa
  createTask(task: ITask): Observable<any> {
    return this.http.post(this.apiUrl, task);
  }

  // Buscar uma tarefa específica
  getTaskById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Atualizar uma tarefa existente
  updateTask(id: number, task: ITask): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, task);
  }

  // Excluir uma tarefa
  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Filtrar tarefas por status
  filterTasksByStatus(status: ETaskStatus): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${this.apiUrl}/filter?status=${status}`);
  }
}
