import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { User } from 'src/app/interfaces/user';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { AdminService } from 'src/app/services/admin.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ConfirmationComponent } from 'src/app/shared/modal/confirmation/confirmation.component';

@Component({
  selector: 'app-admin-transaction',
  templateUrl: './admin-transaction.component.html',
  styleUrls: ['./admin-transaction.component.css']
})
export class AdminTransactionComponent implements OnInit {

  admin: User;
  // displayedColumns: string[] = ['mobile_no', 'referal_code', 'verified', 'wallet_amount', 'id'];
  dataSource: any = [];
  pageIndex: number = 1;
  pageSize:number = 6
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private dialog: MatDialog,
    private authService:AdminAuthService,
    private snackbarService:SnackbarService,
    private adminService:AdminService
  ) { }

  ngOnInit(): void {
    this.authService.adminData.subscribe(res=>{
       if(res){
         this.admin = res;
         this.transactionList(res.token)
       }
    })
  }

  customPagination(array:any, page_size:any, page_number:any = 1) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }
  paginationChange(event:string){
    if(event === 'next' && this.pageIndex >= 1 && this.dataSource.length > 0){
      this.pageIndex ++;
    }
    if(event === 'prev' && this.pageIndex > 1){
      this.pageIndex --;
    }
    this.transactionList(this.admin.token)
  }
  transactionList(token:string){
    this.adminService.getTransaction(token,this.pageIndex).subscribe(res=>{
      if(res.status){
        this.dataSource = res.data;
        // this.dataSource.paginator = this.paginator;
      }else{
        this.dataSource = []
      }
    })
  }
  
  onSearch(event:any){
    let val=event.target.value
    this.adminService.searchTable(this.admin.token,val).subscribe(res=>{
     if(res.data){
       this.dataSource = res.data
     }else{
       this.dataSource = []
     }
    })
  }

  statusFilter(event:any){
    this.adminService.transactionStatusFilter(this.admin.token,event.value).subscribe(res=>{
      if(res.data){
        this.dataSource = res.data
      }else{
        this.dataSource = []
      }
    })
  }

  acceptTransaction(id:number): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.adminService.acceptTransaction(this.admin.token,id).subscribe(res=>{
          if(res.status){
            this.snackbarService.success(res.msg)
            this.transactionList(this.admin.token)
          }else{
            this.snackbarService.error(res.msg)
          }
        })
      }
    })
  }

  declineTransaction(id:number): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.adminService.declineTransaction(this.admin.token,id).subscribe(res=>{
          if(res.status){
            this.snackbarService.success(res.msg)
            this.transactionList(this.admin.token)
          }else{
            this.snackbarService.error(res.msg)
          }
        })
      }
    })
  }

  blockDialog(id:number): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.adminService.blockTransaction(this.admin.token,id).subscribe(res=>{
          if(res.status){
            this.snackbarService.success(res.msg)
            this.transactionList(this.admin.token)
          }else{
            this.snackbarService.error(res.msg)
          }
        })
      }
    })
  }
}
