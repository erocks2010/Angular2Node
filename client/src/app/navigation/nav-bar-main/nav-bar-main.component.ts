import { Component, OnInit, ViewEncapsulation, AfterViewChecked } from '@angular/core';
import { FetchMongodbDataService } from '../../services/fetch-mongodb-data.service';
import { NavBarMenuItem } from '../../custom-types/nav-bar-menu-item';
import { Observable } from 'rxjs/observable';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs/subject';
import * as $ from 'jquery';

@Component({
  selector: 'nav-bar-main',
  templateUrl: './nav-bar-main.component.html',
  styleUrls: ['./nav-bar-main.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [FetchMongodbDataService]
})

export class NavBarMainComponent implements OnInit, AfterViewChecked {
  navBarItems: Array<NavBarMenuItem>;
  navBarItemsArray: Array<Array<NavBarMenuItem>>;
  subjectNavBarMenuItems$: Subject<Array<NavBarMenuItem>>;

  constructor(private mongoDb: FetchMongodbDataService) {
    this.subjectNavBarMenuItems$ = mongoDb.subject;
  }

  ngOnInit() {
    this.subjectNavBarMenuItems$
      .subscribe({
        next: (data) => {
          this.navBarItems = data;
          this.navBarItemsArray = this.itemsInFirstRow(4);
        }
      });

    this.mongoDb.getNavBarAll();
  }

  ngAfterViewChecked() {
    // $('.navBarMenuItem').hide();
    this.toggleMenuVisiblity();
  }

  itemsInFirstRow(n: number): Array<Array<NavBarMenuItem>> {
    let result = [];
    while (this.navBarItems.length != 0) {
      result.push(this.navBarItems.splice(0, n));
      (n <= 1) ? '' : n--;
    }
    return result;
  }

  toggleMenuVisiblity() {
    if ($('.toggleMenu').css('visiblility') == 'visible') {
      $('.navBarMenuItem').hide();
    }
    else {
      $('.toggleMenu').hide();
      $('.navBarMenuItem').show();
    }
  }
}
