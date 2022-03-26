import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(
    private http:HttpClient
  ) { }

  getWithdrwalAccounts(type: string,token: string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/withdrawlAccounts/'+type, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
  addBank(token: string, data: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/addWithdrawlAccount', data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
  withdraw(token: string, data: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/withdraw', data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
  withdrawRequests(token: string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/admin/withdraw', {
      headers: {
        'Authorization': `${token}`
      }
    })
  }
  withdrawSuccess(token: string, id: number): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/admin/payment-done/'+id, {
      headers: {
        'Authorization': `${token}`
      }
    })
  }
  paymentData(token: string, data: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/getPaymentData', data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
  transactionHistory(token: string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/transaction-history', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
  referHistory(token: string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/refer-history', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

}
