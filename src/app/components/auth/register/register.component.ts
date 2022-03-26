import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  isOTPSent: boolean = false;
  isOTPSentLoading: boolean = false;
  isLoading: boolean = false;
  referalCode: string;

  constructor(
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private router:Router,
    private route: ActivatedRoute
  ) {
    
    this.route.queryParams
      .subscribe((params:any) => {
        this.referalCode = params?.code
        
      }
    );
   }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      mobile_no: new FormControl('', [Validators.required, Validators.pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)]),
      password: new FormControl('', Validators.required),
      otp: new FormControl('', Validators.required),
      refer_by: new FormControl(this.referalCode,)
    })
  }

  get validation() {
    return this.registerForm.controls
  }

  sendOTP() {
    if(!this.registerForm.value.mobile_no) return
    this.isOTPSentLoading = true
    this.authService.sendOTP(this.registerForm.value.mobile_no).subscribe(res => {
      this.isOTPSentLoading = false
      if(res?.status){
        this.snackbarService.success(res?.msg)
        this.isOTPSent = true;
      }else{

        this.snackbarService.error(res?.msg)
      }
    })
  }

  onSubmit() {
    if(this.registerForm.invalid) return
    this.isLoading = true;
    this.authService.register(this.registerForm.value).subscribe(res => {
      if(res?.status){
        this.snackbarService.success(res?.msg)
        this.isOTPSent = true;
        this.authService.handleAuthentication(res?.token)
        this.router.navigateByUrl('/win')
      }else{

        this.snackbarService.error(res?.msg)
      }
      this.isLoading = false;
    })
  }

}
