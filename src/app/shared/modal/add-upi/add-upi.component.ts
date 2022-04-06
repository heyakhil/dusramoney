import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-add-upi',
  templateUrl: './add-upi.component.html',
  styleUrls: ['./add-upi.component.css']
})
export class AddUpiComponent implements OnInit {

  upiForm: FormGroup
  isOTPForm: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddUpiComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService:AuthService,
    private snackbarService:SnackbarService
  ) { }

  ngOnInit(): void {
    this.upiForm = new FormGroup({
      upi_id: new FormControl('',Validators.required),
      upi_id_type: new FormControl('',Validators.required),
      type: new FormControl('upi',Validators.required),
      otp: new FormControl('',Validators.required),
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
    if(this.upiForm.invalid) return;
    this.dialogRef.close(this.upiForm.value);
  }
}
