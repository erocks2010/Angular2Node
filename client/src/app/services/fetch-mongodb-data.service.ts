import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NavBarMenuItem } from '../custom-types/nav-bar-menu-item';
import { Observable } from 'rxjs/observable';
import { Observer } from 'rxjs/observer';
import { Subject } from 'rxjs/subject';
import 'rxjs/Rx';


@Injectable()
export class FetchMongodbDataService {
  notification$: Observable<Array<NavBarMenuItem>>;
  observer: Observer<Array<NavBarMenuItem>>;
  subject: Subject<Array<NavBarMenuItem>>;
  constructor(private http: HttpClient) {
    this.subject = new Subject();
    // this.notification$ = new Observable(observer => this.observer = observer).share();
  }

  getNavBarAll() {
    return this.http.get<Array<NavBarMenuItem>>('http://localhost:3000/api/navBarMenuItems')
      .retry(3)
      .subscribe((data) => {
        this.subject.next(data);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) console.log('Unhandled Error ', err.error.message);
        else console.log('Node Server returned status code ', err.status, err.error);
      });
  }

}
