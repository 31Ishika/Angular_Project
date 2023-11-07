import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './Employee';
import { Login_SignUp } from './Login_SignUp';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
 
 private url:string="";
 isSignedIn: boolean = false;

 private isUserLoggedIn: boolean = false;

 isUserSignedIn(): boolean {
  return this.isSignedIn; 
}

 setUserSignedIn(status: boolean) {
   this.isUserLoggedIn = status;
 }  

  constructor(private http:HttpClient) {
    this.url='http://localhost:8080/api/getDets';
   }

  public getEmployee():Observable<Employee[]>{
    return this.http.get<Employee[]>('http://localhost:8080/api/getDets');
  }

  public postEmployee(emp:Employee){
    return this.http.post<Employee>('http://localhost:8080/api/postDets',emp);
  }

  public postLSDetails(ls : Login_SignUp){
    return this.http.post<Login_SignUp>('http://localhost:8080/postDets', ls);
  }

  public postLSSignIn(ls : Login_SignUp):Observable<any>{
    return this.http.post<Login_SignUp>('http://localhost:8080/signin',ls);
  }

  public postMultiDetails(multipledets : Employee[]){
    return this.http.post<Employee[]>('http://localhost:8080/postMultiDets',multipledets);
  }

  public getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>('http://localhost:8080/api/getDetsById/'+id);
  }
  
  public updateEmployee(data: any,id: any): Observable<Employee> {
    return this.http.put<Employee>('http://localhost:8080/api/updateDets/'+id,data);
  }
  
  public deleteEmployeeDetails(id: number):Observable<Employee>{
    return this.http.delete<Employee>('http://localhost:8080/deleteDets/' + id);
  }

}
