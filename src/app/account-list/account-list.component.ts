import { Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AccountEditComponent } from '../account-edit/account-edit.component';
import { identifierName } from '@angular/compiler';
import { NumberSymbol } from '@angular/common';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements AfterViewInit {

  @ViewChild('btn1') btn1: ElementRef;

  adminTitle = 'Admin';
  accountsTitle = 'Accounts';
  public accountData = [
    {id: 1, name: 'Joe Blogg', dob: '01/03/1983'},
    {id: 2, name: 'John Smith', dob: '11/02/1996'},
    {id: 3, name: 'Ruth Green', dob: '26/05/1977'},
    {id: 4, name: 'Jane Green', dob: '25/03/1973'},
    {id: 5, name: 'Simon Rusell', dob: '14/11/1966'},
    {id: 6, name: 'Dave Wood', dob: '22/12/1992'},
    {id: 7, name: 'Saler North', dob: '31/10/1992'}
  ];

  selMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


  indx:  any;
  numHeld: any;

  clickedId: any;
  dataR: any;
  birthDate: any;
  dobDate: any;
  birthMonth: any;
  dobMonth: any;
  selMonthIndex: any;
  monthNum: number;
  btnCancel: any;

  myEvent(indx) {
    this.numHeld = indx;
     console.log('numHeld:' + this.numHeld);
     // console.log(e);
   }

  // obtaining index number of data in array accountData
  getAccountDataIndex(indx) {
     this.numHeld = indx;
     console.log('Index:' + indx);
     console.log('numHeld:' + this.numHeld);

     return this.numHeld;
    }


  constructor(public dialog: MatDialog, private elRef: ElementRef) {}

  ngAfterViewInit() {
    console.log(this.elRef.nativeElement.querySelector('#btn1').innerHTML);
  }


   /* new dialog code */

   openDialog() {


    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';

    dialogConfig.data = {
      numHeld: this.numHeld,
      id: this.numHeld,
      description: 'Angular popup',
      accountData: this.accountData
  };

  const dialogRef = this.dialog.open(AccountEditComponent, dialogConfig);

 /* this.fileNameDialogRef
        .afterClosed()
        .pipe(filter(name => name))
        .subscribe(name => this.files.push({ name, content: '' }));
*/


        // Accepting back any edited data from the edit form
        dialogRef.afterClosed().subscribe(
          data => {
            console.log('Dialog output:', data);
            console.log('data close: ', data);

            if (data === 'cancel') {
              console.log('Cancel button is clicked');
            } else {
              console.log('Save button is clicked');

            this.dataR = data;
            console.log('Save button DataR', this.dataR);

            // checking if date is single dig. if so precede with '0' & add to a variable
            if (this.dataR.dobDate.toString().length === 1) {
              this.birthDate = 0 + this.dataR.dobDate;
           } else {
              this.birthDate = this.dataR.dobDate.toString();
           }

           // getMonth name & chng it to a number
           // take index num of month and add 1, as array starts at 0 & months start from 1.
           this.selMonthIndex = this.selMonth.indexOf(this.dataR.dobMonth);
           this.monthNum = this.selMonthIndex + 1;

           if (this.monthNum.toString().length === 1) {
             this.birthMonth = '0' + this.monthNum;
          } else {
             this.birthMonth = this.monthNum.toString();
          }

           // Name, Date, Month and Year have all been updated
          // tslint:disable-next-line:max-line-length
           if (this.numHeld === this.dataR.clickedId && this.dataR.name !== '' && this.birthDate !== this.dataR.oldDobDateNum && this.birthMonth !== this.dataR.oldDobMonthNum && this.dataR.dobYear !== this.dataR.getDobYearNum) {
             this.accountData[this.numHeld].name = this.dataR.name;
             this.accountData[this.numHeld].dob = this.birthDate + '/' + this.birthMonth + '/' + this.dataR.dobYear;

             // tslint:disable-next-line:max-line-length
             console.log('Same IDs - all chngd ' + this.dataR.clickedId + ' Name: ' + this.dataR.name + ' DOB: ' + this.birthDate + '/' + this.birthMonth + '/' + this.dataR.dobYear);
             // if only the name is updated:
           } else if (this.numHeld === this.dataR.clickedId && this.dataR.name !== '') {
             console.log('Same IDs - name only: ' + this.dataR.clickedId + ' Name only: ' + this.dataR.name);
             this.accountData[this.numHeld].name = this.dataR.name;
             // if only the 'date' is updated in the DOB:
           } else if (this.numHeld === this.dataR.clickedId && this.birthDate !== this.dataR.oldDobDateNum) {
             console.log('Same IDs - date only: ' + this.dataR.clickedId + ' Date: ' + this.birthDate);
            console.log('Ori DOB ' + this.accountData[this.numHeld].dob);
            this.accountData[this.numHeld].dob = this.birthDate + '/' + this.birthMonth + '/' + this.dataR.dobYear;
            // if only the 'month' is updated in the DOB:
           } else if (this.numHeld === this.dataR.clickedId && this.birthMonth !== this.dataR.oldDobMonthNum) {
             console.log('Same IDs - month only:' + this.dataR.clickedId + ' Month: ' + this.birthMonth);
            console.log('Ori DOB ' + this.accountData[this.numHeld].dob);
            this.accountData[this.numHeld].dob = this.birthDate + '/' + this.birthMonth + '/' + this.dataR.dobYear;
            // if only the 'year' is updated in the DOB:
           } else if (this.numHeld === this.dataR.clickedId && this.dataR.dobYear !== this.dataR.oldDobYearNum) {
             console.log('Same IDs - year only:' + this.dataR.clickedId + ' Year: ' + this.dataR.dobYear);
            console.log('Ori DOB ' + this.accountData[this.numHeld].dob);
            this.accountData[this.numHeld].dob = this.birthDate + '/' + this.birthMonth + '/' + this.dataR.dobYear;
            // nothing was changed:
           } else {
             console.log('Nothing has changed');
             console.log('Nothing: Ori DOB ' + this.accountData[this.numHeld].dob);
           }

            }


           // let saveUpdates = () => {


          // }; // end of submit variable






        }
      );


    }

   /* new dialog code end */

}




