import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';

export interface DialogData {
  name: string;
  dob: string;
  id: number;
  numHeld: any;
  accountData: any;
  clickedId: any;
  dobDate: any;
  dobMonth: any;
  dobYear: number;
  getDobDate: any;
  getDobMonth: any;
  getDobYear: any;
  selMonthIndex: any;
  }



@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {
  [x: string]: any;

  selYear: any = [];
  setDate: any;
  startDate: number;
  curYear: number;
  extrtcurYear: any;
  counter: number;


  selDates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

  selMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  editTitle = 'Edit account details';
  clickedId = this.data.numHeld;
  accountData = this.data.accountData; // pulling accountdata array from account-list-components

  getDobDateNum = this.accountData[this.data.numHeld].dob.substr(0, 2); // extract date from the dob to set the date selected option.
  getDobDate = this.getDobDateNum.replace(/^0+/, ''); // remove leading zero like 01, 02 etc.

  getDobMonthNum = this.accountData[this.data.numHeld].dob.substr(3, 2); // extract month from the dob to set the selected option.
  getDobMonthRmvLeadingdZero = this.getDobMonthNum.replace(/^0+/, ''); // remove leading zero like 01, 02 etc.
  getDobMonth = this.selMonth[this.getDobMonthRmvLeadingdZero - 1]; // use the month num to select name of a month from selmonth array

  getDobYearNum = this.accountData[this.data.numHeld].dob.substr(6, 4); // extract Year from the dob to set the selected option.
  getDobYear = this.getDobYearNum; // relevant so 'getDobYearNum' can be used to cross check for changes

  selMonthIndex = this.selMonth.indexOf(this.getDobMonth);


  /* new code for reactive form */
  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    dob: new FormControl('', Validators.required),
    id: new FormControl('', Validators.required),
    dobDate: new FormControl('', Validators.required),
    dobMonth: new FormControl('', Validators.required),
    dobYear: new FormControl('', Validators.required),
    });

  /* new code for reactive form end */

  // Year codes
getYearRange() {

  if (this.selYear.length > 0 && this.selYear.length !== null || this.selYear.length !== undefined) {

        this.setDate = new Date('January 01, 1900 01:15:00');
        this.startDate = this.setDate.getFullYear();
        this.selYear.push(this.startDate);

        this.curYear = new Date().getFullYear();
        this.extrtcurYear = this.curYear.toString().substr(2, 2);
        this.counter = 100 + parseInt(this.extrtcurYear, 10);

        for (let i = 1; i <= this.counter; i++) {
        this.selYear.push(this.startDate + i);
        }

        console.log('the year range: ' + this.selYear);

        // sorting so 2019 shows first in dropdown list
        this.selYear.sort(function(a: any, b: any) {
          return b - a; });

      return this.selYear;
  }

}

  showClickedNum() {
    this.clickedId = this.data.numHeld;
    console.log('ClickId: ' + this.clickedId);
    return this.clickedId;
  }

  // add CSS classes to labels and related span's. For date, month and year.
  addHighlight(event) {
    if (event.srcElement.id === 'dobDate') {
      const element = document.getElementsByClassName('labHghlight')[0];
      element.classList.add('labelActive');

      const eleSpan = document.getElementsByClassName('spanHghlight')[0];
      eleSpan.classList.add('labelActiveSpan');
    } else if (event.srcElement.id === 'dobMonth') {
      const element = document.getElementsByClassName('labHghlight')[1];
      element.classList.add('labelActive');

      const eleSpan = document.getElementsByClassName('spanHghlight')[1];
      eleSpan.classList.add('labelActiveSpan');
    } else {
      const element = document.getElementsByClassName('labHghlight')[2];
      element.classList.add('labelActive');

      const eleSpan = document.getElementsByClassName('spanHghlight')[2];
      eleSpan.classList.add('labelActiveSpan');
    }
  }

  // remove CSS classes from labels and related span's. For date, month and year.
  removehighlight(event) {
    if (event.srcElement.id === 'dobDate') {
      const element = document.getElementsByClassName('labHghlight')[0];
      element.classList.remove('labelActive');

      const eleSpan = document.getElementsByClassName('spanHghlight')[0];
      eleSpan.classList.remove('labelActiveSpan');
    } else if (event.srcElement.id === 'dobMonth') {
      const element = document.getElementsByClassName('labHghlight')[1];
      element.classList.remove('labelActive');

      const eleSpan = document.getElementsByClassName('spanHghlight')[1];
      eleSpan.classList.remove('labelActiveSpan');
    } else {
      const element = document.getElementsByClassName('labHghlight')[2];
      element.classList.remove('labelActive');

      const eleSpan = document.getElementsByClassName('spanHghlight')[2];
      eleSpan.classList.remove('labelActiveSpan');
    }

  }




  displaySubstr() {
    console.log(this.getDobMonthNum);
    console.log(this.getDobMonth);
    console.log(this.getDobYear);
  }


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AccountEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

// handling data in the form
  ngOnInit() {

    this.getYearRange(); // a call to populate the year select field

    this.form = this.fb.group({
      name: '',
      dob: '',
      id: '',
      dobDate: [this.getDobDate], // sets deflt value based on date of dob
      dobMonth: [this.getDobMonth], // sets deflt value based on month of dob
      dobYear: [this.getDobYear], // sets deflt value based on year of dob
      clickedId: this.data.numHeld, // send back id of btn num to cross check for update
      oldDobDateNum: this.getDobDateNum, // send back old date to cross check if changed
      oldDobMonthNum: this.getDobMonthNum, // send back old month to cross check if changed
      oldDobYearNum: this.getDobYearNum, // send back old year to cross check if changed
    });

  }

 // function for submit btn to save changes
  save(form): void {
    this.dialogRef.close(this.form.value);
 }


 // function for cancel btn
 cancel(): void {
  const closeMessage = 'cancel';
  this.dialogRef.close(closeMessage);
}


}
