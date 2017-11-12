import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NavBarMenuItem } from '../custom-types/nav-bar-menu-item';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
import 'rxjs/add/oberator/return'
import { Observable } from 'rxjs/observable';

@Injectable()
export class FetchMongodbDataService {

  constructor(private http: HttpClient) { }

  getNavBarAll(): Array<NavBarMenuItem> {
    let _data=Observable.of(null);
    this.http.get<Array<NavBarMenuItem>>('http://localhost:3000/api/navBarMenuItems')
    .retry(3)
      .subscribe((data) => {
        _data.next;
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) console.log('Unhandled Error ', err.error.message);
        else console.log('Node Server returned status code ', err.status, err.error);
      });
    return _data;
  }

}
