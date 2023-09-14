import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-employee-dialog',
  templateUrl: './add-employee-dialog.component.html',
  styleUrls: ['./add-employee-dialog.component.css'],
  providers: [DatePipe],

})
export class AddEmployeeDialogComponent implements OnInit {

  // Define properties for your form fields here
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  contactNumber: string = '';
  dob = '';
  address: string = '';
  imageUrl: string = '';
  age = 0;
  salary = 0.0;

 


  constructor(public dialogRef: MatDialogRef<AddEmployeeDialogComponent>, private datePipe: DatePipe) { }

  ngOnInit(): void { }

  // Handle form submission
  onSubmit(): void {

    const date_birth = this.datePipe.transform(this.dob, 'dd/MM/yyyy');
    // Insert the new employee at the beginning of the employees array
    // this.employee.unshift({ firstName: this.firstName, lastName: this.lastName, email: this.email, address: this.address, contactNumber: this.contactNumber, dob: date_birth, age: this.age, salary: this.salary, imageUrl: this.imageUrl });
    // Close the dialog and pass any data back to the parent component if needed
    this.dialogRef.close({ firstName: this.firstName, lastName: this.lastName, email: this.email, address: this.address, contactNumber: this.contactNumber, dob: date_birth, age: this.age, salary: this.salary, imageUrl: this.imageUrl });
  }


  // Handle image upload
  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Read the selected file as a data URL and set it as imageUrl
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
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
