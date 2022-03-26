import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  adminData: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  constructor(
    private http:HttpClient,
    private router: Router
  ) { }
  
  get isLoggedIn():boolean {
    return this.adminData.value.token ? true : false;
  }

  getUsers(token:string):Observable<any> {
    return this.http.get(environment.apiUrl+'/admin/users',{
      headers: {
        'Authorization': `${token}`
      }
    })
  }
  updateUser(token:string, data:any):Observable<any> {
    return this.http.put(environment.apiUrl+'/admin/update-user', data,{
      headers: {
        'Authorization': `${token}`
      }
    })
  }
  blockUser(token:string, id:number):Observable<any> {
    return this.http.get(environment.apiUrl+'/admin/block-user/'+id,{
      headers: {
        'Authorization': `${token}`
      }
    })
  }

  login(data:any):Observable<any> {
    return this.http.post(environment.apiUrl+'/admin/login',data)
  }
  
  handleAuthentication(token:string | null){
    this.adminData.next({token})
    token && localStorage.setItem('atoken',token)
  }
  autoLogin(){
    let token = localStorage.getItem('atoken');
    this.handleAuthentication(token)
  }

  logout(){
    this.adminData.next(null);
    localStorage.removeItem('atoken');
    this.router.navigateByUrl('/admin/auth')
  }
}
