import { AfterViewInit, Component, OnInit } from '@angular/core';
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

  private screenWidth = new BehaviorSubject<number>(window.outerWidth);

  constructor() {}

  ngOnInit(): void {}


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