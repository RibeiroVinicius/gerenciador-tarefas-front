import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ETaskStatus, ITask } from '../../../interface/ITask';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { IUser } from '../../../interface/IUser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-modal-adicionar-task',
  templateUrl: './modal-adicionar-task.component.html',
  styleUrls: ['./modal-adicionar-task.component.scss'],
  standalone: false
})
export class ModalAdicionarTaskComponent implements OnInit {
  formTask: FormGroup;
  taskStatusList = Object.values(ETaskStatus);
  usersList: IUser[] = [];

  @Input() openModal: boolean = false;
  @Input() taskSelected: ITask = {} as ITask;

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() createTaskEvent = new EventEmitter<ITask>();

  OnInit() {
    this.initFormTask();
  }
  constructor(private fb: FormBuilder,
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {
    this.formTask = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      deadline: ['', Validators.required],
      assignedTo: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.initFormTask();
  }

  initFormTask() {
    this.formTask = this.fb.group({
      title: new FormGroup(''),
      description: new FormGroup(''),
      status: new FormGroup(''),
      deadline: new FormGroup(''),
      assignedTo: new FormGroup('')
    });
  }

  saveTask() {
    if (this.formTask.valid) {
      const task: ITask = this.formTask.value;
      this.taskService.createTask(task).subscribe(
        () => {
          this.snackBar.open('Tarefa criada com sucesso!', 'Fechar', { duration: 3000 });
        },
        (error) => {
          this.snackBar.open('Erro ao criar tarefa.', 'Fechar', { duration: 3000 });
        }
      );
    }
  }

  closeModal() {
    this.openModal = false;
    this.closeModalEvent.emit();
  }

  futureDateValidator(control: FormControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    if (selectedDate < new Date()) {
      return { pastDate: true };
    }
    return null;
  }
}
