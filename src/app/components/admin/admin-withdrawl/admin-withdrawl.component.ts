import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/interfaces/user';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { WalletService } from 'src/app/services/wallet.service';
import { ConfirmationComponent } from 'src/app/shared/modal/confirmation/confirmation.component';

@Component({
  selector: 'app-admin-withdrawl',
  templateUrl: './admin-withdrawl.component.html',
  styleUrls: ['./admin-withdrawl.component.css']
})
export class AdminWithdrawlComponent implements OnInit {

  admin: User;
  // displayedColumns: string[] = ['user_id', 'amount', 'name', 'account_no', 'ifsc_code', 'bank_name', 'upi_id','upi_id_type', 'accessId'];
  dataSource: any = []
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private walletService: WalletService,
    private authService: AdminAuthService,
    private dialog: MatDialog,
    private snackbarService:SnackbarService
  ) { }

  ngOnInit(): void {
    this.authService.adminData.subscribe(res=>{
      if(res){
        this.admin = res;
        this.getWithdrawRequest(res.token)
      }
    })
  }

  getWithdrawRequest(token: string){
    this.walletService.withdrawRequests(token).subscribe(res=>{
      this.dataSource = res.data
      // this.dataSource.paginator = this.paginator
    })
  }

  
  openDialog(id:number): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.walletService.withdrawSuccess(this.admin.token,id).subscribe(res=>{
          if(res.status){
            this.snackbarService.success(res.msg)
            this.getWithdrawRequest(this.admin.token)
          }else{
            this.snackbarService.error(res.msg)

          }
        })
      }
    })
  }

}
