import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FetchMongodbDataService } from '../../services/fetch-mongodb-data.service';
import { NavBarMenuItem } from '../../custom-types/nav-bar-menu-item';
import { Observable } from 'rxjs/observable';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'nav-bar-main',
  templateUrl: './nav-bar-main.component.html',
  styleUrls: ['./nav-bar-main.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [FetchMongodbDataService]
})
export class NavBarMainComponent implements OnInit {
  navBarItems: Array<NavBarMenuItem>;
  notification$: Observable<Array<NavBarMenuItem>>;
  constructor(private mongoDb: FetchMongodbDataService) { }

  ngOnInit() {
    // this.notification$ = this.mongoDb.notification$;
    // this.notification$
    //   .subscribe((data) => {
    //     this.navBarItems = data;
    //   })
    this.mongoDb.getNavBarAll()
      .subscribe((data) => {
        this.navBarItems = data;
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) console.log('Unhandled Error ', err.error.message);
        else console.log('Node Server returned status code ', err.status, err.error);
      });;
  }



}
