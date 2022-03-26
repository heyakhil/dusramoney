import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-biding',
  templateUrl: './biding.component.html',
  styleUrls: ['./biding.component.css']
})
export class BidingComponent implements OnInit {

  amountList = [10, 100, 1000, 10000]
  selectedAmount: number = 10;
  quantity: number = 1;
  isRuleChecked: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<BidingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  ngOnInit(): void {
  }

  onNoClick(): void {
    let payloads = {
      amount: this.selectedAmount * this.quantity,
      selectedBid: this.data?.selectedBid
    }
    this.dialogRef.close(payloads);
  }
}
