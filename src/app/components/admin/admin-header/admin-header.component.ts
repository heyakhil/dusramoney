import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AdminAuthService } from 'src/app/services/admin-auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  @Input() title: string = '';
  constructor(
    public location:Location,
    public authService: AdminAuthService
  ) { }

  ngOnInit(): void {
  }

}
