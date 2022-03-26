import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css']
})
export class AdminAuthComponent implements OnInit {

  loginForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private authService:AdminAuthService,
    private snackbarService:SnackbarService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)]),
      password: new FormControl('', Validators.required),
    })
  }

  onSubmit(){
    if(this.loginForm.invalid) return
    this.isLoading = true
    this.authService.login(this.loginForm.value).subscribe(res=>{
      if(res?.status){
        this.authService.handleAuthentication(res?.token)
        this.router.navigateByUrl('/admin')
      }else{

        this.snackbarService.error(res?.msg)
      }
      this.isLoading = false;
    })
  }

}
