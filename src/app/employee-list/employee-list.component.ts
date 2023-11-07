import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { Employee } from '../Employee';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import * as $ from 'jquery'; 
import { AlertyfyService } from '../alertyfy.service';
import { Validators } from '@angular/forms';



@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit,  OnDestroy {
  
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;


  formValue!: FormGroup;
  employees: Employee[] = [];

  empObj: Employee = new Employee();
   loader:boolean = false;
   emp:Employee = new Employee();

   dtTrigger: Subject<any> = new Subject<any>();

  constructor(private dataServ: DataServiceService, private formBuilder: FormBuilder) {}

  
  dtOptions: DataTables.Settings = {};

  ngOnInit():void { 
     this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      paging:false,
    lengthMenu : [5, 10, 25],
      processing: true,
      columns: [ {
        title: "id",
        data: 'empId'
      },{
        title: "name",
        data: 'empName'
      },{
        title: "phno",
        data: 'empPhno'
      },{
        title: "salaray",
        data: 'empSal'
      },{
        title: "title",
        data: 'jobTitle'
      },{
        title: "action",
        data: 'action'
      }
       ]


     }
     
    this.formValue = this.formBuilder.group({
      empId: ['', Validators.required],
      empName: ['', Validators.required],
      empPhno: ['', Validators.required],
      empSal: ['', Validators.required],
      jobTitle: ['', Validators.required],
      action: ['', Validators.required]
      
    });
    // this.formValue = this.formBuilder.group({
    //   empId: new FormControl(['', Validators.required]),
    //   empName: new FormControl(['',, Validators.required]),
    //   empPhno: new FormControl(['', Validators.required]),
    //   empSal: new FormControl(['', Validators.required]),
    //   jobTitle: new FormControl(['', Validators.required]),
    //   action: new FormControl(['', Validators.required])
      
    // });
    this.getEmployeee();
    this.dtTrigger.next(null);
  }


  // getEmployeee() {
  //   this.loader = true;
  //   this.dataServ.getEmployee().subscribe(
  //     (data) => {
  //       this.employees = data;
  //       this.loader = false;
  //       this.dtTrigger.next(null); 
  //       if (this.dtElement.dtInstance) {
  //         this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //           dtInstance.destroy();
  //         });
  //       }
  //       this.dtTrigger.next(null);
        
  //     },
  //     (error) => {
  //       console.log(error);
  //       this.loader = false;
  //     }
  //   );
  // }

  getEmployeee() {
    this.loader = true;
    this.dataServ.getEmployee().subscribe(
      (data) => {
        console.log('Received data from server:', data); 
        this.employees = data;
        this.loader = false;
  
        if (this.dtElement.dtInstance) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.clear().draw();
            dtInstance.rows.add(data).draw();
          });
        }
      },
      (error) => {
        console.log(error);
        this.loader = false;
      }
    );
  }
  
  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  

  updateEmployee(employee: Employee) {
    if (employee) {
      this.empObj.empId = employee.empId;
      this.formValue.controls['empId'].setValue(employee.empId);
      this.formValue.controls['empName'].setValue(employee.empName);
      this.formValue.controls['empPhno'].setValue(employee.empPhno);
      this.formValue.controls['empSal'].setValue(employee.empSal);
      this.formValue.controls['jobTitle'].setValue(employee.jobTitle);

    }
  }

  // updateEmployee(employee: Employee) {
  //   if (employee) {
  //     this.formValue.setValue({
  //       empId: employee.empId,
  //       empName: employee.empName,
  //       empPhno: employee.empPhno,
  //       empSal: employee.empSal,
  //       jobTitle: employee.jobTitle

  //     });

  //   }
  // }


  updatEmp() {
    this.empObj.empId = this.formValue.value.empId;
    this.empObj.empName = this.formValue.value.empName;
    this.empObj.empPhno = this.formValue.value.empPhno;
    this.empObj.empSal = this.formValue.value.empSal;
    this.empObj.jobTitle = this.formValue.value.jobTitle;


    this.dataServ.updateEmployee(this.empObj, this.empObj.empId).subscribe(() => {
      alert('Updated');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getEmployeee(); 

    });
    // this.dtTrigger.next(null);

    if (this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.clear().draw();
        // this.getEmployeee(); 
      });
    }
  }
  delEmp(tempEmp : Employee){
    console.log(tempEmp);
    this.emp = tempEmp;
    //this.deleteEmployee(this.emp.empId);
  }

  deleteEmployee() {
    console.log(this.emp.empId);
    console.log('Deleting employee with empId: ', this.emp.empId);
    this.dataServ.deleteEmployeeDetails(this.emp.empId).subscribe(
      res => {
        console.log('Delete response: ', res);
        this.getEmployeee();

      },
      (err) => {
        console.log('Error deleting employee: ', err);
      }
    );

  }
  
  

  // deleteEmployee(empId: number) {
  //   if (empId) {
  //     if (confirm('Are you sure you want to delete this employee?')) {
  //       this.dataServ.deleteEmployeeDetails(empId).subscribe(
  //         () => {
  //           this.getEmployeee(); // Refresh the employee list after deletion
  //         },
  //         (error) => {
  //           console.error('Error deleting employee:', error);
  //         }
  //       );
  //     }
  //   } else {
  //     console.error('Invalid employee ID: ', empId);
  //   }
  // }
  
  // deleteEmployee(empId: number) {
  //   if (typeof empId === 'number' && !isNaN(empId) && empId > 0) {
  //     console.log('Valid empId:', empId);
  //   } else {
  //     console.error('Invalid employee ID: ', empId);
  //   }
  // }

  // deleteEmployee(empId: number) {
  //   console.log('Inside deleteEmployee');
  //   console.log('empId:', empId);
  
  //   if (typeof empId === 'number' && !isNaN(empId) && empId > 0) {
  //     console.log('Valid empId');
  //     // Rest of the deleteEmployee method
  //   } else {
  //     console.error('Invalid employee ID: ', empId);
  //   }
  // }
  
   hideloader() { 
  
    // Setting display of spinner 
    // element to none 
    //document.getElementById('loading')?.style.display = 'none';

  } 
  
}  
