import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddEmployeeDialogComponent } from './add-employee-dialog/add-employee-dialog.component'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  
  declarations: [
    AppComponent,
    EmployeeListComponent,
    AddEmployeeDialogComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    // MatDialogModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
