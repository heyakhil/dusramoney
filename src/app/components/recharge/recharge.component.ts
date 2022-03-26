import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {

  user:User;
  amountList = [1,500,1000,2000,5000,10000,49999]
  rechargeForm: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: any = []
  constructor(
    private authService:AuthService,
    private walletService: WalletService,
    private route: ActivatedRoute,
    private snackbarService:SnackbarService
  ) {
    this.route.queryParams
      .subscribe((params:any) => {
        if(params?.resp === 'success'){
          snackbarService.success('Congratulation ! Payment was successfull.')
        }
        if(params?.resp === 'error'){
          snackbarService.error('Payment was unsuccessfull. Please try again !')
        }

      }
    );
   }

  ngOnInit(): void {
    this.rechargeForm = new FormGroup({
      amount: new FormControl('',Validators.required),
      firstname: new FormControl('',Validators.required),
      lastname: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      phone: new FormControl('',Validators.required),
      productinfo: new FormControl('IPhone',Validators.required),
    })
    
    this.authService.userData.subscribe(res => {
      if (res) {
        this.user = res;
        this.authService.getUser(res.token).subscribe(resp=>{
          this.user = {...this.user,...resp.data}
        })
        this.getTransactionHistory()
      }
    })
  }

  rechargeAmount(item:number){
    this.rechargeForm.patchValue({amount:item})
  }
  
  getTransactionHistory(){
    this.walletService.transactionHistory(this.user.token).subscribe(res=>{
      if(res.status){
        this.dataSource = res.data;
      }
    })
  }

  onSubmit(){
    this.walletService.paymentData(this.user.token,{amount:this.rechargeForm.value.amount}).subscribe(res=>{
      if(res.status){
        location.href = res.url;
      }else{
        this.snackbarService.error(res.msg)
        
      }
    })
  }

}
