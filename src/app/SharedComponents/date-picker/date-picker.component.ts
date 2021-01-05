import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DatePickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDatepicker) { }

  ngOnInit() {
  }

}

export interface IDatepicker {
  expiresAfter: string;
}
