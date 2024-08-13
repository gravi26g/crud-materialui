import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  // constructor() { }
  durationInSeconds = 30;

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message:string,action:string) {
    this._snackBar.open(message,action,{
      duration: this.durationInSeconds * 1000,
      verticalPosition:'top'
    });
  }
}
