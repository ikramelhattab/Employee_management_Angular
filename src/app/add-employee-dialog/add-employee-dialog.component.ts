import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-employee-dialog',
  templateUrl: './add-employee-dialog.component.html',
  styleUrls: ['./add-employee-dialog.component.css'],
})
export class AddEmployeeDialogComponent implements OnInit {

  // Define properties for your form fields here
  firstName: string = '';
  lastName: string = '';
  email: string = '';

  constructor(public dialogRef: MatDialogRef<AddEmployeeDialogComponent>) { }

  ngOnInit(): void { }

  // Handle form submission
  onSubmit(): void {
    // You can access the form field values here
    console.log('Form submitted with values:');
    console.log('First Name:', this.firstName);
    console.log('Last Name:', this.lastName);
    console.log('Email:', this.email);

    // Close the dialog and pass any data back to the parent component if needed
    this.dialogRef.close({ firstName: this.firstName, lastName: this.lastName, email: this.email });
  }

  // Handle cancel button click
  onCancel(): void {
    // Close the dialog without saving any data
    this.dialogRef.close();
  }
}
