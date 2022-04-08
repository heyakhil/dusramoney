import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/interfaces/user';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ConfirmationComponent } from 'src/app/shared/modal/confirmation/confirmation.component';
import { EditUserComponent } from 'src/app/shared/modal/edit-user/edit-user.component';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  admin: User;
  // displayedColumns: string[] = ['mobile_no', 'referal_code', 'verified', 'wallet_amount', 'id'];
  dataSource: any = [];
  pageIndex: number = 1;
  pageSize:number = 6
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private dialog: MatDialog,
    private authService:AdminAuthService,
    private snackbarService:SnackbarService
  ) { }

  ngOnInit(): void {
    this.authService.adminData.subscribe(res=>{
       if(res){
         this.admin = res;
         this.usersList(res.token)
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
    this.usersList(this.admin.token)
  }
  usersList(token:string){
    this.authService.getUsers(token,this.pageIndex).subscribe(res=>{
      if(res.status){
        this.dataSource = res.data;
        // this.dataSource.paginator = this.paginator;
      }else{
        this.dataSource = []
      }
    })
  }
  
  
  editDialog(x:any): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '500px',
      data: x
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.authService.updateUser(this.admin.token,result).subscribe(res=>{
          if(res.status){
            this.snackbarService.success(res.msg)
            this.usersList(this.admin.token)
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
        this.authService.blockUser(this.admin.token,id).subscribe(res=>{
          if(res.status){
            this.snackbarService.success(res.msg)
            this.usersList(this.admin.token)
          }else{
            this.snackbarService.error(res.msg)
          }
        })
      }
    })
  }
}
