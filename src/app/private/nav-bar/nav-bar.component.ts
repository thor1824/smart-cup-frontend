import { Component, OnInit } from '@angular/core';
import {IconService} from "../../services/icon.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public indexPressed: NavTo = NavTo.Home;
  public NavTo = NavTo;
  constructor(
    public icon: IconService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigateTo(index: NavTo) {
    this.indexPressed = index;
    const navString = this.getNavString(index);
    this.router.navigate(['user/' + navString]);
  }

  private getNavString(index: NavTo) {
    switch (index) {
      case NavTo.Home:
        return 'dashboard';
      case NavTo.Graph:
        return 'temp-graph';
      case NavTo.Settings:
        return 'settings';
      case NavTo.History:
        return 'history';

    }
  }

}

export enum NavTo {
  Home,
  Graph,
  Settings,
  History
}
