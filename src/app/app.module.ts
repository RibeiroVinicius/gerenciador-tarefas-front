import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Para usar ngModel

import { AppComponent } from './app.component';
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from './app-routing.module'; // Add this line
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [AppComponent, AppRoutingModule, RouterModule],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule
  ]
})
export class AppModule { }