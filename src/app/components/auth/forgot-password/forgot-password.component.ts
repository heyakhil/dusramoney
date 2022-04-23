import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm: FormGroup;
  isLoading: boolean = false;
  isOTPSent: boolean = false;
  isOTPSentLoading: boolean = false;
  referalCode: string;
  constructor(
    private authService: AuthService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.forgotForm = new FormGroup({
      mobile_no: new FormControl('', Validators.required),
      otp: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    })
  }

  get validation() {
    return this.forgotForm.controls
  }
  onSubmit() {
    if (this.forgotForm.invalid) return
    this.isLoading = true
    this.authService.changePassword(this.forgotForm.value).subscribe(res=>{
      this.isLoading = false;
      if (res?.status) {
        this.snackbarService.success(res?.msg)
      } else {
        this.snackbarService.error(res?.msg)
      }
    })

  }
  sendOTP() {
    if (!this.forgotForm.value.mobile_no) return
    this.isOTPSentLoading = true
    this.authService.sendResetOTP(this.forgotForm.value.mobile_no).subscribe(res => {
      this.isOTPSentLoading = false
      if (res?.status) {
        this.snackbarService.success(res?.msg)
        this.isOTPSent = true;
      } else {

        this.snackbarService.error(res?.msg)
      }
    })
  }


}
