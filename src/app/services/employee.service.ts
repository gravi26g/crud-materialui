import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  addEmployee(obj:any):Observable<any>{
    return this.http.post('http://localhost:3000/employess',obj)
  }
  updateEmployee(id:number,obj:any){
    return this.http.put(`http://localhost:3000/employess/${id}`,obj)
  }
  getEmployee():Observable<any>{
    return this.http.get('http://localhost:3000/employess')
  }
  deleteEmployee(id:any):Observable<any>{
  return this.http.delete(`http://localhost:3000/employess/${id}`)
  }

}
