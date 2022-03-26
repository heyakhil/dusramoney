import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.css']
})
export class AddBankComponent implements OnInit {

  bankForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddBankComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  ngOnInit(): void {
    this.bankForm = new FormGroup({
      name: new FormControl('',Validators.required),
      bank_name: new FormControl('',Validators.required),
      ifsc_code: new FormControl('',Validators.required),
      account_no: new FormControl('',Validators.required),
      type: new FormControl('bank',Validators.required),
    })
  }

  onSubmit(){
    if(this.bankForm.invalid) return;
    this.dialogRef.close(this.bankForm.value);
  }

  
}
