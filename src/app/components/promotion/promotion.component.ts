import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { WalletService } from 'src/app/services/wallet.service';
import { NoticeComponent } from 'src/app/shared/modal/notice/notice.component'

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {

  user: User;
  data: any;
  baseUrl: string;
  promotionLink: string;
  
  displayedColumns: string[] = ['userId', 'phoneNo','reward', 'amountAdded'];
  dataSource1:any = [];
  dataSource2:any = [];
  dataSource3:any = [];
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private dialog:MatDialog,
    private authService:AuthService,
    private walletService: WalletService
  ) {
    this.baseUrl = window.location.origin;
  }

  ngOnInit(): void {
    this.openDialog()
    this.authService.userData.subscribe(res=>{
      if(res){
        this.user = res;
        this.authService.getUser(res.token).subscribe(resp=>{
          this.user = {...this.user,...resp.data}
          this.promotionLink = this.baseUrl + '/auth/register?code=' + this.user?.referal_code
          
        })
        this.getPromotionHistory()
      }
    })
  }

  getPromotionHistory(){
    this.walletService.referHistory(this.user.token).subscribe(res=>{
      if(res.status){
        this.data = res;
        this.dataSource1 = res.data.LevelOne
        this.dataSource2 = res.data.LevelTwo
        this.dataSource3 = res.data.LevelThree
        // this.dataSource.paginator = this.paginator
      }
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NoticeComponent, {
      width: '90%',
      maxHeight: '90%',
    });
  }

}
