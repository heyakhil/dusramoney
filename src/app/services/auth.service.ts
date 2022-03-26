import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private http:HttpClient,
    private router:Router
  ) { 
    this.userData.value
  }

  get isLoggedIn():boolean {
    return this.userData.value.token ? true : false;
  }

  sendOTP(phone:number):Observable<any>{
    return this.http.post(environment.apiUrl+'/register',{mobile_no:phone})
  }

  register(data:any):Observable<any>{
    return this.http.put(environment.apiUrl+'/verifyOtpAndRegister',data)
  }

  login(data:any):Observable<any> {
    return this.http.post(environment.apiUrl+'/login',data)
  }

  getUser(token: string): Observable<any> {
    return this.http.get(environment.apiUrl + '/user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  handleAuthentication(token:string | null){
    this.userData.next({token})
    token && localStorage.setItem('token',token)
  }

  autoLogin(){
    let token = localStorage.getItem('token');
    this.handleAuthentication(token)
  }

  logout(){
    this.userData.next(null);
    localStorage.removeItem('token');
    this.router.navigateByUrl('/')
  }

}
