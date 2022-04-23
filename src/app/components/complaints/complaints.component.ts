import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { GamesService } from 'src/app/services/games.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {

  user:any;
  complaintForm:FormGroup

  constructor(
    private gameService:GamesService,
    private authService:AuthService,
    private snackbarService:SnackbarService
  ) { }

  ngOnInit(): void {
    this.complaintForm = new FormGroup({
      type: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
    })
    this.authService.userData.subscribe(res => {
      if (res) {
        this.user = res;
        this.authService.getUser(res.token).subscribe(resp=>{
          this.user = {...this.user,...resp.data}
        })
      }
    })
  }

  onSubmit(){
    if(this.complaintForm.invalid) return
    this.gameService.createComplaint(this.user.token,this.complaintForm.value).subscribe(res=>{
      if(res?.status){
        this.complaintForm.reset()
        this.snackbarService.success(res?.msg)
      }else{
        this.snackbarService.error(res?.msg)
      }
    })
  }
  
}
