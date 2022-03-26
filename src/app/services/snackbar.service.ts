import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackBar:MatSnackBar
  ) { }

  error(msg:string,action:string = 'X'){
    this.snackBar.open(msg,action,{
      panelClass: ['snackbar-error'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    })
  }
  success(msg:string,action:string = 'X'){
    this.snackBar.open(msg,action,{
      panelClass: ['snackbar-success'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    })
  }
  info(msg:string,action:string = 'X'){
    this.snackBar.open(msg,action,{
      panelClass: ['snackbar-info'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    })
  }

}
