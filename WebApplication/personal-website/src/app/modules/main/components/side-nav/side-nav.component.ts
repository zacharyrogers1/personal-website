import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  isSideNavOpen:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSideNav() {
    this.isSideNavOpen = !this.isSideNavOpen;
  }

}
