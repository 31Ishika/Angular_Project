import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { DataServiceService } from './data-service.service';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateDataComponent } from './update-data/update-data.component';
import { DataTablesModule } from 'angular-datatables';
import { LoginSignUpComponent } from './login-sign-up/login-sign-up.component';
import { AlertyfyService } from './alertyfy.service';
import { MultipleEntriesComponent } from './multiple-entries/multiple-entries.component';



@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    AddEmployeeComponent,
    HeaderComponent,
    UpdateDataComponent,
    LoginSignUpComponent,
    MultipleEntriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DataServiceService,
              AlertyfyService],
  bootstrap: [AppComponent],
})
export class AppModule {}
