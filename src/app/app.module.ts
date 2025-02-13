import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./pages/auth/login/login.component";
import { TaskListComponent } from "./pages/task-list/task-list.component";
import { ModalAdicionarTaskComponent } from "./pages/task-list/modal-adicionar-task/modal-adicionar-task.component";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { NgxPaginationModule } from 'ngx-pagination';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [AppComponent, LoginComponent, TaskListComponent, ModalAdicionarTaskComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [AppComponent],
  imports: [
    FormsModule,
    NgxPaginationModule,
    BrowserModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
