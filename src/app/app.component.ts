import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from './services/admin-auth.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dusramoney';

  constructor(
    private authService:AuthService,
    private adminAuthService: AdminAuthService
  ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.authService.autoLogin();
    this.adminAuthService.autoLogin();
  }

}
