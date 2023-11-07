import { Component } from '@angular/core';
import { Employee } from '../Employee';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, FormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
    user:Employee;
    showForm=true;
    login !: UntypedFormGroup;

    constructor( 
     private route:ActivatedRoute,
     private router:Router,
     private dataSer:DataServiceService,
     private formBuilder:UntypedFormBuilder
    ){ 
      this.user=new Employee();
    }

   
    
    saveEmployee(){
      this.dataSer.postEmployee(this.user).subscribe(data=>{
        alert('Updated');

        this.employeeList();
      });
     }
     

     employeeList(){
      this.router.navigate(['/add-employees']);
     }
     onSubmit(){
      console.log(this.user);
      this.saveEmployee();
     }
}
