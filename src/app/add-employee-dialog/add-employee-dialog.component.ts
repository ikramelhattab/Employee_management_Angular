import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import required modules

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
  contactNumber = 0;
  dob = '';
  address: string = '';
  imageUrl: string = '';
  age = 0;
  salary = 0.0;

 
  employeeForm!: FormGroup; // Declare a FormGroup


  constructor(public dialogRef: MatDialogRef<AddEmployeeDialogComponent>, private datePipe: DatePipe, private fb: FormBuilder) { }

  ngOnInit(): void { 
     // Initialize the form with validation rules
     this.employeeForm = this.fb.group({
      imageUrl: ['', Validators.required], // Example: Image URL is required
      firstName: ['', Validators.required], // First Name is required
      lastName: ['', Validators.required], // Last Name is required
      email: ['', [Validators.required, Validators.email]], // Email is required and must be a valid email format
      contactNumber: ['', Validators.required], // Contact Number is required
      age: ['', Validators.required], // Age is required
      dob: ['', Validators.required], // Date of Birth is required
      salary: ['', Validators.required], // Salary is required
      address: ['', Validators.required], // Address is required
    });
  }

  // Handle form submission
  onSubmit(): void {
    if (this.employeeForm && this.employeeForm.valid) {
      // Form is valid, handle submission
      console.log(this.employeeForm.value);
      const dateOfBirth = this.datePipe.transform(this.employeeForm.get('dob')?.value, 'dd/MM/yyyy');
      const contactNumber = this.employeeForm.get('contactNumber')?.value;
      this.dialogRef.close({ firstName: this.firstName, lastName: this.lastName, email: this.email, address: this.address, contactNumber: this.contactNumber, dob: dateOfBirth, age: this.age, salary: this.salary, imageUrl: this.imageUrl });
    } else {
      // Form is not valid, handle errors
      alert('Veuillez remplir tous les champs obligatoires et corriger les éventuelles erreurs de validation.');
    }
    // const date_birth = this.datePipe.transform(this.dob, 'dd/MM/yyyy');
    // Insert the new employee at the beginning of the employees array
    // this.employee.unshift({ firstName: this.firstName, lastName: this.lastName, email: this.email, address: this.address, contactNumber: this.contactNumber, dob: date_birth, age: this.age, salary: this.salary, imageUrl: this.imageUrl });
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



  // Convenience getter for easy access to form fields
  get f() { return this.employeeForm?.controls; }


}
