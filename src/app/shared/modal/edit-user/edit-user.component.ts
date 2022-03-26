import { Component, Inject, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  ngOnInit(): void {
    this.userForm = new FormGroup({
      user_id: new FormControl(this.data?.id,Validators.required),
      mobile_no: new FormControl(this.data?.mobile_no,Validators.required),
      wallet_amount: new FormControl(this.data?.wallet_amount,Validators.required),
    })
  }

  onSubmit(){
    if(this.userForm.invalid) return;
    this.dialogRef.close(this.userForm.value);
  }
}
