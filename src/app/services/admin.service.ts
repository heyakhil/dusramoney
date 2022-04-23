import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http:HttpClient
  ) { }
  
  dashboard(token:string):Observable<any> {
    return this.http.get(environment.apiUrl+'/admin/dashboard', {
      headers: {
        'Authorization': `${token}`
      }
    })
  }

  getFeedback(token:string,index:number):Observable<any> {
    return this.http.get(environment.apiUrl+'/admin/showComplaints?page='+index,{
      headers: {
        'Authorization': `${token}`
      }
    })
  }
  
  searchTable(token:string,searchString:string):Observable<any> {
    return this.http.get(environment.apiUrl+'/admin/users?search='+searchString,{
      headers: {
        'Authorization': `${token}`
      }
    })
  }
}
