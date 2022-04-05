import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Game } from 'src/app/interfaces/game';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { GamesService } from 'src/app/services/games.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { BidingComponent } from 'src/app/shared/modal/biding/biding.component';

export interface GameHistory {
  period: string;
  amount: string;
  bid: string;
  status: string;
  time: string;
  created_at: string;
}
export interface ResultHistory {
  period: string;
  price: string;
  number: string;
  result: string;
}

@Component({
  selector: 'app-win',
  templateUrl: './win.component.html',
  styleUrls: ['./win.component.css']
})
export class WinComponent implements OnInit {

  user: User;
  game: Game;
  time: number;
  minutes: number = 0;
  seconds: number = 0;
  resultDisplayedColumns: string[] = ['period', 'price', 'number', 'result','animal'];
  gameDisplayedColumns: string[] = ['period', 'amount', 'bid', 'status', 'time'];
  resultHistoryDataSource: MatTableDataSource<ResultHistory[]> = new MatTableDataSource<ResultHistory[]>([]);
  gameHistoryDataSource: MatTableDataSource<GameHistory[]> = new MatTableDataSource<GameHistory[]>([]);
  @ViewChild(MatPaginator) gamePaginator: MatPaginator;
  @ViewChild(MatPaginator) resultPaginator: MatPaginator;
  numberList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  colorList = [
    { color: 'red', value: 'red' },
    { color: 'purple', value: 'violet' },
    { color: 'green', value: 'green' }
  ]
  disableFlow: boolean = false;
  isLoading: boolean = true;

  constructor(
    private dialog: MatDialog,
    private gameService: GamesService,
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.authService.userData.subscribe(res => {
      if (res) {
        this.user = res;
        this.initializePage(res.token)
        setInterval(() => {
          if (this.time >= 150) {
            this.disableFlow = true;
          }
          if (this.time >= 180) {
            this.createGame()
            return;
          }
          this.time += 1
          let total = 180 - this.time
          this.minutes = Number(Math.floor((total) / 60))
          this.seconds = total - (60 * this.minutes)
        }, 1000)
      }
    })
  }
  
  initializePage(token:string){
    this.getUser(token);
    this.getGameList(token)
    this.getGameHistory(token)
    this.getResultHistory(token)
  }

  getUser(token:string){
    this.authService.getUser(token).subscribe(resp=>{
      this.user = {...this.user,...resp.data}
    })
  }

  getGameList(token: string) {
    this.gameService.getGames(token).subscribe(res => {
      if (res?.status) {
        this.isLoading = false;
        this.game = res;
        this.time = (res.currentTime - res.startTime);
      } else {
        this.snackbarService.error(res.msg)
      }
    })
  }

  getResultHistory(token: string){
    this.gameService.resultHistory(token).subscribe(res => {
      if(res?.status){
        this.resultHistoryDataSource = new MatTableDataSource<ResultHistory[]>(res?.data);
        this.resultHistoryDataSource.paginator = this.resultPaginator;
      }else{
        
      }
    })
  }

  getGameHistory(token: string){
    this.gameService.gameHistory(token).subscribe(res => {
      if(res?.status){
        this.gameHistoryDataSource = new MatTableDataSource<GameHistory[]>(res?.data);
        this.gameHistoryDataSource.paginator = this.gamePaginator;
      }else{

      }
    })
  }

  createGame(){
    this.isLoading = true;
    this.gameService.createGame(this.user.token).subscribe(res=>{
      // this.router.navigateByUrl('win')
      // window.location.reload();
      this.initializePage(this.user.token)
    })
  }
  openDialog(x: string): void {
    const dialogRef = this.dialog.open(BidingComponent, {
      width: '700px',
      data: { selectedBid: x },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return
      if (this.time >= 150) {
        this.snackbarService.error('You cannot play before 30s')
        return
      }else{
        let payloads = {
          ...result,
          period: this.game.period
        }
        this.gameService.playGame(this.user.token,payloads).subscribe(res=>{
          if(res.status){
            this.snackbarService.success(res.msg)
            this.getGameHistory(this.user.token)
            this.getUser(this.user.token)
          }else{
            this.snackbarService.error(res.msg)
          }
        })
      }
    });
  }
}
