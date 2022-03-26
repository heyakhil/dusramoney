import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: any;
  // displayedColumns: string[] = ['period', 'totalAmount', 'amountGivenToUser', 'userCount', 'winningColor', 'winningNumber','winningAnimal'];
  dataSource: any = []
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private adminService:AdminService,
    private authService:AdminAuthService
  ) { }

  ngOnInit(): void {
    this.authService.adminData.subscribe(res=>{
      if(res){
        this.dashboardData(res.token)
      }
    })
  }

  dashboardData(token:string){
    this.adminService.dashboard(token).subscribe(res=>{
      if(res.status){
        this.data = res;
        this.dataSource = res.data;
        // this.dataSource.paginator = this.paginator
      }else{

      }
    })
  }

}
