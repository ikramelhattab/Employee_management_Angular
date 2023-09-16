import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'https://hub.dummyapis.com/employee';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any> {
    return this.http.get(`${this.apiUrl}?noofRecords=100&idStarts=1`);
  }
}
