import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { AdminService } from 'src/app/services/admin.service';
import { GameInfoComponent } from 'src/app/shared/modal/game-info/game-info.component';

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
    private authService:AdminAuthService,
    private dialog: MatDialog
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

  showGameInfo(item:any){
    if(!item.history) return;
    const dialogRef = this.dialog.open(GameInfoComponent, {
      width: '90%',
      data: item.history
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        
      }
    })
  }

}
