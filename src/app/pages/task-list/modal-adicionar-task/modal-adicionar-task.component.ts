import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ETaskStatus, ITask } from '../../../interface/ITask';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../../interface/IUser';

@Component({
  selector: 'app-modal-adicionar-task',
  templateUrl: './modal-adicionar-task.component.html',
  styleUrl: './modal-adicionar-task.component.scss',
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
  constructor(private fb: FormBuilder) {
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
    const task: ITask = {
      id: 0,
      title: this.formTask.get('title')?.value,
      description: this.formTask.get('description')?.value,
      status: this.formTask.get('status')?.value,
      deadline: this.formTask.get('deadline')?.value,
      createdAt: new Date(Date.now()),
      assignedTo: this.formTask.get('assignedTo')?.value
    };

    this.createTaskEvent.emit(task);
  }

  closeModal() {
    this.openModal = false;
    this.closeModalEvent.emit();
  }
}
