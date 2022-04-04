import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.css']
})
export class AddBankComponent implements OnInit {

  bankForm: FormGroup;
  isOTPForm: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AddBankComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService:AuthService,
    private snackbarService:SnackbarService
  ) { }


  ngOnInit(): void {
    this.bankForm = new FormGroup({
      name: new FormControl('',Validators.required),
      bank_name: new FormControl('',Validators.required),
      ifsc_code: new FormControl('',Validators.required),
      account_no: new FormControl('',Validators.required),
      otp: new FormControl('',Validators.required),
      type: new FormControl('bank',Validators.required),
    })
  }

  sendOTP(){
    this.isOTPForm = true;
    this.authService.resendOTP(this.authService.userData.value.token).subscribe(res=>{
      console.log(res)
      if(res.status){
        this.snackbarService.success(res.msg)
      }else{
        this.snackbarService.error(res.msg)
      }
    })
  }

  onSubmit(){
    if(this.bankForm.invalid){
      this.isOTPForm = false;
      return;
    }
    this.dialogRef.close(this.bankForm.value);
  }

  
}
