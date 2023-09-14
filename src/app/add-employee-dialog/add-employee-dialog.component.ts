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
  contactNumber: string = '';
  dob: string = '';
  address: string = '';
  imageUrl: string = '';
  age = 0;
  salary = 0.0;
  

  


  constructor(public dialogRef: MatDialogRef<AddEmployeeDialogComponent>) { }

  ngOnInit(): void { }

  // Handle form submission
  onSubmit(): void {
    console.log('Form submitted with values:');
    console.log('First Name:', this.firstName);
    console.log('Last Name:', this.lastName);
    console.log('Email:', this.email);

    // Close the dialog and pass any data back to the parent component if needed
    this.dialogRef.close({ firstName: this.firstName, lastName: this.lastName, email: this.email,address: this.address, contactNumber: this.contactNumber, dob: this.dob, age: this.age, salary: this.salary, imageUrl: this.imageUrl  });
  }



  
  // Handle cancel button click
  onCancel(): void {
    this.dialogRef.close();
  }


  onCancelClick(event: Event) {

    event.preventDefault();
    this.dialogRef.close();
  }
}
