import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-upi',
  templateUrl: './add-upi.component.html',
  styleUrls: ['./add-upi.component.css']
})
export class AddUpiComponent implements OnInit {

  upiForm: FormGroup

  constructor(
    public dialogRef: MatDialogRef<AddUpiComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.upiForm = new FormGroup({
      upi_id: new FormControl('',Validators.required),
      upi_id_type: new FormControl('',Validators.required),
      type: new FormControl('upi',Validators.required),
    })
  }

  onSubmit(){
    if(this.upiForm.invalid) return;
    this.dialogRef.close(this.upiForm.value);
  }
}
