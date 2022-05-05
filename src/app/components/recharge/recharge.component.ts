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
  amountList = [500,1000,2000,5000,10000,49999]
  rechargeForm: FormGroup;
  paymentForm: FormGroup;
  minRecharge: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: any = []
  selectedFile: Blob;
  startPayment:boolean = false;
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
    this.authService.userData.subscribe(res => {
      if (res) {
        this.user = res;
        this.authService.getUser(res.token).subscribe(resp=>{
          this.user = {...this.user,...resp.data}
          this.rechargeForm.controls['amount'].setValidators([Validators.required,Validators.min(resp.data.limit.minimum_recharge)])
          this.rechargeForm.controls['amount'].updateValueAndValidity()
        })
        this.getTransactionHistory()
      }
    })
    this.rechargeForm = new FormGroup({
      name: new FormControl('',Validators.required),
      mobile_no: new FormControl('',[Validators.required,Validators.pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)]),
      amount: new FormControl('',Validators.required),
    })
    this.paymentForm = new FormGroup({
      reference_id: new FormControl('',Validators.required),
      image: new FormControl(null,Validators.required),
      transaction_id: new FormControl(localStorage.getItem('transaction_id'),Validators.required)
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

  onImageSelect(event:any){
    let file = event.target.files[0]
    if(!file) return;
    this.selectedFile = file
    this.paymentForm.patchValue({image:file})
  }

  onSubmit(){
    this.walletService.paymentData(this.user.token,this.rechargeForm.value).subscribe(res=>{
      if(res.status){
        // location.href = res.url;
        this.snackbarService.success(res.msg)
        this.paymentForm.patchValue({transaction_id:res.transaction_id})
        localStorage.setItem('transaction_id',res.transaction_id)
        this.startPayment = true;
      }else{
        this.snackbarService.error(res.msg)
        
      }
    })
  }

  paymentSubmit(){
    if(this.paymentForm.invalid) return;
    let payload = new FormData();
    payload.append("reference_id",this.paymentForm.value.reference_id)
    payload.append("transaction_id",this.paymentForm.value.transaction_id)
    payload.append("image",this.selectedFile)
    this.walletService.uploadTransactionData(this.user.token,payload).subscribe(res=>{
      if(res.status){
        this.snackbarService.success(res.msg)
        this.resetPayment()
      }else{
        this.snackbarService.error(res.msg)
        
      }
    })
  }

  resetPayment(){
    localStorage.removeItem("transaction_id")
    this.paymentForm.reset();
    this.startPayment = false;
  }
}
