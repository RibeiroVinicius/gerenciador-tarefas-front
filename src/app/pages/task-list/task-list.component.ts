import { Component, OnInit } from '@angular/core';
import { ETaskStatus, ITask } from '../../interface/ITask';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: false
})
export class TaskListComponent implements OnInit {
  tasks: ITask[] = [];
  filteredTasks: ITask[] = [];
  taskSelected: ITask | null = null;
  openModal: boolean = false;

  // Filtros e paginação
  searchText: string = '';
  statusFilter: string = '';
  taskStatuses: string[] = Object.values(ETaskStatus).map(value => value.toString());
  currentPage: number = 1;
  sortColumn: keyof ITask = 'deadline'; // Padrão: ordenar por deadline
  sortDirection: 'asc' | 'desc' = 'asc';
  itemsPerPage: number = 3;

  constructor(private taskService: TaskService,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    const user = sessionStorage.getItem('user') ?? "";
    this.taskService.getAllTasks(user).subscribe((data) => {
      this.tasks = data;
      this.applyFilters();
    });
  }

  editarTask(task: ITask): void {
    this.openModal = true;
    this.taskSelected = task;
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  openTaskModal(): void {
    this.openModal = true;
  }

  // Aplicação de filtros e ordenação
  applyFilters(): void {
    let filtered = [...this.tasks];
  
    // Filtrando por título (busca)
    if (this.searchText) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  
    // Filtrando por status
    if (this.statusFilter) {
      filtered = filtered.filter(task => task.status === ETaskStatus[this.statusFilter as keyof typeof ETaskStatus]);
    }
  
    // Ordenação
    filtered.sort((a, b) => {
      let valueA = a[this.sortColumn];
      let valueB = b[this.sortColumn];
  
      if (this.sortColumn === 'deadline') {
        valueA = new Date(valueA).getTime();
        valueB = new Date(valueB).getTime();
      }
  
      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.filteredTasks = filtered;
  }  

  changePage(event: any): void {
    this.currentPage = event;
    const startIndex = (this.currentPage - 1) * 3;
    this.filteredTasks = this.filteredTasks.slice(startIndex);
  }

  // Alternar ordenação ao clicar no botão de ordenar
  sortBy(column: keyof ITask): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }
  
  closeModal(){
    this.loadTasks();
    this.openModal = false;
    this.taskSelected = null;
  }

  logout() {
    this.tasks = [];
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
