import { Component, OnInit } from '@angular/core';
import { ETaskStatus, ITask } from '../../interface/ITask';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: ITask[] = [];
  newTask: ITask = { id: 0, title: '', description: '', status: ETaskStatus.PENDING, deadline: new Date(Date.now() + 1), createdAt: new Date(Date.now()), assignedTo: '' };
  taskSelected: ITask = {} as ITask;
  openModal: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  createTask(): void {
    this.taskService.createTask(this.newTask).subscribe(() => {
      this.loadTasks();
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

  filterTasksByStatus(status: ETaskStatus): void {
    this.taskService.filterTasksByStatus(status).subscribe((data) => {
      this.tasks = data;
    });
  }
}
