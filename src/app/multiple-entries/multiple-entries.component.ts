import { Component } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { Employee } from '../Employee';
import { error } from 'jquery';
import { AlertyfyService } from '../alertyfy.service';

@Component({
  selector: 'app-multiple-entries',
  templateUrl: './multiple-entries.component.html',
  styleUrls: ['./multiple-entries.component.css']
})
export class MultipleEntriesComponent {
  dataEntries: any[] = [{}]; 

  constructor(private dataServ:DataServiceService, private alertyfy:AlertyfyService){}

  addRow(){
    this.dataEntries.push({});

  }

  remove(index:number){
      this.dataEntries.splice(index,1);
  }

  saveData(){
    this.dataServ.postMultiDetails(this.dataEntries).subscribe(
      data=>{
        console.log("Data saved"+data);
        this.alertyfy.success('Data added succcessful');

      },
      error=>{
        console.log("Data failed to save"+error);
      }
      
    );
  }
}
