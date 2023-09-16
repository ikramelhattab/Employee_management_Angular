import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeDialogComponent } from '../add-employee-dialog/add-employee-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})

export class EmployeeListComponent implements OnInit {

  employees: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  sortKey = '';
  searchFilter = '';
  sortDirection: 'asc' | 'desc' = 'asc'; // Initialize sorting direction

  // For storing the data of a new employee
  newEmployee: any = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    contactNumber: '',
    dob: '',
    age: '',
    salary: '',
  };


  constructor(private employeeService: EmployeeService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadEmployees();
    this.filterData();

  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe((data: any) => {
      this.employees = data;
    });
  }






  /** Update the pagiantion  when the user change the number of elements per page */
  onItemsPerPageChange(): void {
    this.currentPage = 1;
    this.filterData();
  }


  /** Calculate the total number of pages */
  get totalPages(): number {
    return Math.ceil(this.employees.length / this.itemsPerPage);
  }

  /** Previous page */
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  /** Next page */
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  /** Sort elements asc and desc */
  sortBy(key: string): void {
    if (key === this.sortKey) {
      // If the same column header is clicked, toggle the sorting direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // If a different column header is clicked, reset the sorting direction to 'asc'
      this.sortDirection = 'asc';
    }
    this.sortKey = key;

    switch (key) {
      case 'firstName':
      case 'lastName':
      case 'email':
      case 'address':
      case 'contactNumber':
        // For string fields, use localeCompare
        this.employees.sort((a, b) => {
          const result = a[key].localeCompare(b[key]);
          return this.sortDirection === 'asc' ? result : -result;
        });
        break;
      case 'age':
      case 'salary':
        // For numeric fields, use numeric comparison
        this.employees.sort((a, b) => {
          const result = a[key] - b[key];
          return this.sortDirection === 'asc' ? result : -result;
        });
        break;
      case 'dob':
        // For date field in "DD/MM/YYYY" string format, parse the dates and compare
        this.employees.sort((a, b) => {
          const dateA = this.parseDateFromString(a[key]);
          const dateB = this.parseDateFromString(b[key]);

          if (!dateA || !dateB) {
            return 0; // Return 0 if the dates are not valid
          }

          const result = dateA.getTime() - dateB.getTime();
          return this.sortDirection === 'asc' ? result : -result;
        });
        break;
    }
  }


  /** Custom function to parse date from "MM/DD/YYYY" string format */
  private parseDateFromString(dateString: string): Date | null {
    const dateParts = dateString.split('/');
    if (dateParts.length === 3) {
      const day = parseInt(dateParts[0]);
      const month = parseInt(dateParts[1]);
      const year = parseInt(dateParts[2]);
      // Check if the parsed values are valid
      if (!isNaN(month) && !isNaN(day) && !isNaN(year)) {
        return new Date(year, month - 1, day); // Month is zero-based
      }
    }
    return null; // Return null for invalid date strings
  }


  /** Assuming you want to filter by any field containing the searchFilter value */
  filterData(): void {
    this.employees = this.employees.filter((employee) => {
      const searchString = this.searchFilter.toLowerCase();
      const searchNumber = parseInt(this.searchFilter);
      const searchFloat = parseFloat(this.searchFilter);
      return (
        employee.firstName.toLowerCase().includes(searchString) ||
        employee.lastName.toLowerCase().includes(searchString) ||
        employee.email.toLowerCase().includes(searchString) ||
        employee.address.toLowerCase().includes(searchString) ||
        employee.contactNumber.toLowerCase().includes(searchString) ||
        employee.dob.toLowerCase().includes(searchString) ||
        (employee.age === searchNumber) ||
        (employee.salary === searchFloat)
      );
    });
  }



  /** delete empolyee in the table */
  deleteEmployee(employee: any): void {
    const index = this.employees.indexOf(employee);
    if (index !== -1) {
      this.employees.splice(index, 1);
    }

  }

  /** Open the add form as a dialog */
  openAddForm(): void {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // add new emp to list 
        this.employees.push(result);
      }
    });
  }


}