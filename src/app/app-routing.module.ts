import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { LoginSignUpComponent } from './login-sign-up/login-sign-up.component'; 
import { HeaderComponent } from './header/header.component';
import { MultipleEntriesComponent } from './multiple-entries/multiple-entries.component';

const routes: Routes = [
  { path: '', redirectTo: '/LoginSignUpComponent', pathMatch: 'full'},
  { path: 'header', component: HeaderComponent },
  { path: 'add-employees', component: AddEmployeeComponent },
  { path: 'view-employees', component: EmployeeListComponent },
  { path: 'multiple-entries', component:MultipleEntriesComponent}
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
