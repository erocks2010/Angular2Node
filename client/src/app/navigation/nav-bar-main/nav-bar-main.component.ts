import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FetchMongodbDataService } from '../../services/fetch-mongodb-data.service';
import { NavBarMenuItem } from '../../custom-types/nav-bar-menu-item';

@Component({
  selector: 'nav-bar-main',
  templateUrl: './nav-bar-main.component.html',
  styleUrls: ['./nav-bar-main.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [FetchMongodbDataService]
})
export class NavBarMainComponent implements OnInit {
  navBarItems: Array<NavBarMenuItem>;
  constructor(private mongoDb: FetchMongodbDataService) { }

  ngOnInit() {
    this.navBarItems = this.mongoDb.getNavBarAll();
  }



}
