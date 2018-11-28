import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html'
})
export class WarningDialogComponent{

  constructor(
    public dialogRef: MatDialogRef<WarningDialogComponent>) {}

  onOkClick(): void {
    this.dialogRef.close();
  }

}
