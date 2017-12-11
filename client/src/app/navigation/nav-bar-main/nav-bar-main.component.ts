import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FetchMongodbDataService } from '../../services/fetch-mongodb-data.service';
import { NavBarMenuItem } from '../../custom-types/nav-bar-menu-item';
import { Observable } from 'rxjs/observable';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs/subject';

@Component({
  selector: 'nav-bar-main',
  templateUrl: './nav-bar-main.component.html',
  styleUrls: ['./nav-bar-main.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [FetchMongodbDataService]
})

export class NavBarMainComponent implements OnInit {
  navBarItems: Array<NavBarMenuItem>;
  subjectNavBarMenuItems$: Subject<Array<NavBarMenuItem>>;

  constructor(private mongoDb: FetchMongodbDataService) {
    this.subjectNavBarMenuItems$ = mongoDb.subject;
  }

  ngOnInit() {
    this.subjectNavBarMenuItems$
      .subscribe({
        next: (data) => {
          this.navBarItems = data;
        }
      });

    this.mongoDb.getNavBarAll();
  }
}
