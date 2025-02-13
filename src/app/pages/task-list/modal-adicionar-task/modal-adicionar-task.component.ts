import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ETaskStatus, ITask } from '../../../interface/ITask';
import { IUser } from '../../../interface/IUser';
import { TaskService } from '../../../services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-modal-adicionar-task',
  templateUrl: './modal-adicionar-task.component.html',
  styleUrls: ['./modal-adicionar-task.component.scss'],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ModalAdicionarTaskComponent implements OnInit {
  formTask: FormGroup;
  usersList: IUser[] = [];
  statusFilter: string = '';
  taskStatus: string[] = Object.values(ETaskStatus).map(value => value.toString());
  _taskSelected: ITask | null = null;

  @Input() openModal: boolean = false;
  @Input() set taskSelected(task: ITask | null) {
    if (task !== null) {
      this._taskSelected = task;
      if (this._taskSelected !== null) {
        this.formTask = this.fb.group({
          title: [this._taskSelected.title, Validators.nullValidator],
          description: [this._taskSelected.description,Validators.nullValidator],
          status: [this._taskSelected.status, Validators.nullValidator],
          deadline: [this._taskSelected.deadline, Validators.nullValidator],
          assignedTo: [this._taskSelected.assignedTo, Validators.nullValidator],
        });
      }
    }
  }

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() createTaskEvent = new EventEmitter<ITask>();

  OnInit() {
    this.initFormTask();
  }
  constructor(private fb: FormBuilder,
    private taskService: TaskService
  ) {
    this.formTask = this.fb.group({
      title: ["", Validators.nullValidator],
      description: ["", Validators.nullValidator],
      status: [ETaskStatus.PENDING, Validators.nullValidator],
      deadline: ["", Validators.nullValidator],
      assignedTo: ["", Validators.nullValidator],
    });
  }
  ngOnInit(): void {
    this.initFormTask();
  }

  initFormTask() {
    this.formTask = this.fb.group({
      title: ["", Validators.nullValidator],
      description: ["", Validators.nullValidator],
      status: ["", Validators.nullValidator],
      deadline: ["", Validators.nullValidator],
      assignedTo: ["", Validators.nullValidator],
    });
  }

  saveTask() {
    if (this.formTask.valid && this.pastDateValidator()) {
      const task: ITask = this.formTask.value;
      task.assignedTo = window.sessionStorage.getItem("user") ?? "";
      task.status = task.status == ETaskStatus.IN_PROGRESS ? ETaskStatus.IN_PROGRESS : task.status;
      this.taskService.createTask(task).subscribe(
        () => {
          alert('Tarefa criada com sucesso!');
        },
        (error) => {
          alert(error.error);
        }
      );
    }
  }

  closeModal() {
    this.openModal = false;
    this.initFormTask();
    this.closeModalEvent.emit();
  }

  pastDateValidator(): boolean {
    const deadlineValue = this.formTask.get('deadline')?.value;
  
    if (!deadlineValue) {
      return false; // Se não houver data, não faz sentido validar
    }
  
    // Converter a string do formulário para um objeto Date
    const [year, month, day] = deadlineValue.split('-').map(Number);
    const deadlineDate = new Date(year, month - 1, day); // `month - 1` porque os meses no JS começam do 0
  
    // Criar a data atual sem horário para comparar apenas ano, mês e dia
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    var resultado = deadlineDate > today;
    
    if (!resultado) {
      alert('A data informada deve ser maior que a data atual!');
    }
    return resultado;
  }
  
}
