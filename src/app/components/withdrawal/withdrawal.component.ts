import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Bank } from 'src/app/interfaces/bank';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { WalletService } from 'src/app/services/wallet.service';
import { AddBankComponent } from 'src/app/shared/modal/add-bank/add-bank.component';
import { AddUpiComponent } from 'src/app/shared/modal/add-upi/add-upi.component';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.css']
})
export class WithdrawalComponent implements OnInit {

  user: User;
  accountList: Bank[];
  isListLoading: boolean = true;
  withdrawlType: string = 'bank';
  withdrawlForm: FormGroup;

  dataSource: any = []
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private dialog:MatDialog,
    private walletService:WalletService,
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.authService.userData.subscribe(res => {
      if (res) {
        this.user = res;
        this.authService.getUser(res.token).subscribe(resp=>{
          this.user = {...this.user,...resp.data}
          this.getWithdrwalAccounts()
          this.getTransactionHistory();
        })
      }
    })

    this.withdrawlForm = new FormGroup({
      withdrawl_id: new FormControl('',Validators.required),
      amount: new FormControl(0,[Validators.required,Validators.pattern(/^.{4,}$/)]),
      password: new FormControl('',Validators.required),
      type: new FormControl('bank',Validators.required),
    })
    
  }

  getWithdrwalAccounts(){
    this.isListLoading = true
    this.walletService.getWithdrwalAccounts(this.withdrawlForm.value.type,this.user.token).subscribe(res=>{
      if(res.status){
        this.accountList = res.data
        this.isListLoading = false;
      }else{

      }
    })
  }

  getTransactionHistory(){
    this.walletService.transactionHistory(this.user.token).subscribe(res=>{
      if(res.status){
        this.dataSource = res.data
      }
    })
  }

  onSubmit(){
    if(this.withdrawlForm.invalid) return
    this.walletService.withdraw(this.user.token,this.withdrawlForm.value).subscribe(res=>{
      if(res.status){
        this.snackbarService.success(res.msg)

      }else{
        this.snackbarService.error(res.msg)

      }
    })
  }
  
  openBankDialog(): void {
    const dialogRef = this.dialog.open(AddBankComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.walletService.addBank(this.user.token,result).subscribe(res=>{
          if(res.status){
            this.snackbarService.success(res.msg)
            this.getWithdrwalAccounts()
          }else{
            this.snackbarService.error(res.msg)

          }
        })
      }
    })
  }
  
  openUPIDialog(): void {
    const dialogRef = this.dialog.open(AddUpiComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result){
        this.walletService.addBank(this.user.token,result).subscribe(res=>{
          if(res.status){
            this.snackbarService.success(res.msg)
            this.getWithdrwalAccounts()
          }else{
            this.snackbarService.error(res.msg)

          }
        })
      }
    })
  }

}
