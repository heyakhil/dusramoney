import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { User } from 'src/app/interfaces/user';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  admin: User;
  // displayedColumns: string[] = ['mobile_no', 'referal_code', 'verified', 'wallet_amount', 'id'];
  dataSource: any = [];
  pageIndex: number = 1;
  pageSize:number = 6
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private authService:AdminAuthService,
    private adminservice:AdminService
  ) { }

  ngOnInit(): void {
    this.authService.adminData.subscribe(res=>{
       if(res){
         this.admin = res;
         this.feedbackList(res.token)
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
    this.feedbackList(this.admin.token)
  }
  feedbackList(token:string){
    this.adminservice.getFeedback(token,this.pageIndex).subscribe(res=>{
      if(res.status){
        this.dataSource = res.data;
      }else{
        this.dataSource = []
      }
    })
  }
  
}
