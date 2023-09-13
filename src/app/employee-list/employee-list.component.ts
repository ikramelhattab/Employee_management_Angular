import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';

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
  newEmployee: any = {}; // For storing the data of a new employee
  showAddForm = false; // To toggle the display of the add employee form

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.filterData();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe((data: any) => {
      this.employees = data;
    });
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
  }

  sortBy(key: string): void {
    this.sortKey = key;

        if (key === 'firstName') {
          this.employees.sort((a, b) => a.firstName.localeCompare(b.firstName));
        } else if (key === 'lastName') {
          this.employees.sort((a, b) => a.lastName.localeCompare(b.lastName));
        } else if (key === 'email') {
          this.employees.sort((a, b) => a.email.localeCompare(b.email));
        } else if (key === 'address') {
          this.employees.sort((a, b) => a.address.localeCompare(b.address));
        } else if (key === 'address') {
          this.employees.sort((a, b) => a.address.localeCompare(b.address));
        }else if (key === 'contactNumber') {
          this.employees.sort((a, b) => a.contactNumber.localeCompare(b.contactNumber));
        } 
          else if (key === 'age') {
          this.employees.sort((a, b) => a[key] - b[key]);
        } else if (key === 'salary') {
          this.employees.sort((a, b) => a[key] - b[key]);
        }
        else if (key === 'dob') {
          this.employees.sort((a, b) => {
            const dateA = this.parseDateFromString(a[key]);
            const dateB = this.parseDateFromString(b[key]);
    
            if (!dateA || !dateB) {
              return 0; // Return 0 if the dates are not valid
            }
    
            return dateA.getTime() - dateB.getTime();
                  
              });   
            }      


            
  }


// Custom function to parse date from "MM/DD/YYYY" string format
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

  filterData(): void {
    // Assuming you want to filter by any field containing the searchFilter value
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
        employee.dob.toLowerCase().includes(searchString)||
        (employee.age === searchNumber)||
        (employee.salary === searchFloat) 
      );
    });
  }




  deleteEmployee(employee: any): void {

  const index = this.employees.indexOf(employee);
  if (index !== -1) {
   this.employees.splice(index, 1);
  }

  }

  addEmployee(newEmployee: any): void {
    
    this.employees.push(newEmployee);
    this.newEmployee = {}; // Clear the form fields
    this.showAddForm = false; // Hide the add employee form  }

}

}