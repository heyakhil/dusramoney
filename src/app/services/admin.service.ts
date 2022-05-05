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
  getTransaction(token:string,index:number):Observable<any> {
    return this.http.get(environment.apiUrl+'/admin/transactions?page='+index,{
      headers: {
        'Authorization': `${token}`
      }
    })
  }

  transactionStatusFilter(token:string,val:string):Observable<any> {
    let payload = val ? `?status=${val}` : ''
    return this.http.get(environment.apiUrl+'/admin/transactions'+payload,{
      headers: {
        'Authorization': `${token}`
      }
    })
  }

  acceptTransaction(token:string, id:number):Observable<any> {
    return this.http.get(environment.apiUrl+'/admin/acceptTransaction/'+id,{
      headers: {
        'Authorization': `${token}`
      }
    })
  }

  declineTransaction(token:string, id:number):Observable<any> {
    return this.http.get(environment.apiUrl+'/admin/declineTransaction/'+id,{
      headers: {
        'Authorization': `${token}`
      }
    })
  }

  blockTransaction(token:string, id:number):Observable<any> {
    return this.http.get(environment.apiUrl+'/admin/declineAndBlock/'+id,{
      headers: {
        'Authorization': `${token}`
      }
    })
  }
}
