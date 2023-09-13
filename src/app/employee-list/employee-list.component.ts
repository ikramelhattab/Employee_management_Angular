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
  showAddForm = false; // To toggle the display of the add employee form
  sortDirection: 'asc' | 'desc' = 'asc'; // Initialize sorting direction

// For storing the data of a new employee
  newEmployee: any = {
    firstName: '',
    lastName: '',
    email: '',
    // Initialisez d'autres propriétés ici
  };
  

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadEmployees();
    this.filterData();
    this.showAddForm = false; 

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
        // For string fields, use localeCompare for case-insensitive sorting
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
        // For date fields in "DD/MM/YYYY" string format, parse the dates and compare
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

  onItemsPerPageChange(): void {
    // Mettez à jour la pagination lorsque l'utilisateur change le nombre d'éléments par page
    // Par exemple, revenez à la première page lorsque le nombre d'éléments par page est modifié
    this.currentPage = 1;
  
    // Appelez la méthode filterData (ou toute autre méthode que vous utilisez pour le filtrage) pour mettre à jour l'affichage
    this.filterData();
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
        employee.dob.toLowerCase().includes(searchString) ||
        (employee.age === searchNumber) ||
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
  addEmployee(): void {

    console.log('Adding employee...');
    console.log('showAddForm before:', this.showAddForm);
    // Ajoutez le nouvel employé à la liste
    this.employees.push(this.newEmployee);
  
    // Réinitialisez les champs du formulaire après l'ajout
    this.newEmployee = {
      firstName: '',
      lastName: '',
      email: ''
      // Réinitialisez d'autres propriétés ici
    };

    this.showAddForm = false; // Hide the add employee form
    console.log('showAddForm after:', this.showAddForm); // Add this line


  }
  


}