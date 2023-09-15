import { AfterViewInit, Component, isDevMode, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, AfterViewInit {

  modeMenu: MatDrawerMode = 'side';
  showMenu = true;
  userFirstName = '';
  userLastName = '';
  userEmail = '';
  isUserAdmin = false;
  pageTitle = '';

  private screenWidth = new BehaviorSubject<number>(window.outerWidth);

  constructor(
    private router: Router) {
     }


  ngOnInit(): void {
   
  }


  ngAfterViewInit(): void {
    this.screenWidth.asObservable().subscribe(width => {
      if (width < 640) {
        this.showMenu = false;
        this.modeMenu = 'over';
      } else if (width > 640) {
        this.showMenu = true;
        this.modeMenu = 'side';
      }
    });
  }


 


}