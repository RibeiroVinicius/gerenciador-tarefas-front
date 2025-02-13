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


@NgModule({
  declarations: [AppComponent, LoginComponent, TaskListComponent, ModalAdicionarTaskComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [AppComponent],
  imports: [
    FormsModule,
    NgxPaginationModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
