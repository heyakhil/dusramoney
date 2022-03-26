import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private authService:AuthService,
    private snackbarService:SnackbarService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      mobile_no: new FormControl('', [Validators.required, Validators.pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)]),
      password: new FormControl('', Validators.required),
    })
  }

  onSubmit(){
    if(this.loginForm.invalid) return
    this.isLoading = true
    this.authService.login(this.loginForm.value).subscribe(res=>{
      if(res?.status){
        this.authService.handleAuthentication(res?.token)
        this.router.navigateByUrl('/win')
      }else{

        this.snackbarService.error(res?.msg)
      }
      this.isLoading = false;
    })
  }

}
