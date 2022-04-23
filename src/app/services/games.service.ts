import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(
    private http: HttpClient
  ) { }

  getGames(token: string): Observable<any> {
    return this.http.get<Game>(environment.apiUrl + '/games', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  createGame(token: string): Observable<any> {
    return this.http.get<Game>(environment.apiUrl + '/createGame/SumitAkhil@122812', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  playGame(token: string, data: any): Observable<any> {
    return this.http.post<Game>(environment.apiUrl + '/playGame', data , {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  gameHistory(token: string): Observable<any> {
    return this.http.get(environment.apiUrl + '/bid-game-history', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  resultHistory(token: string): Observable<any> {
    return this.http.get(environment.apiUrl + '/result-history', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  createComplaint(token: string,body: any): Observable<any> {
    return this.http.post(environment.apiUrl + '/addComplaint', body, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }


}
