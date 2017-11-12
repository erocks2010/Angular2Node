import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/do';

@Injectable()
export class HttpGeneralInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const reqClone=req.clone({setHeaders:{'Access-Control-Allow-Origin':'*'}});
        return next.handle(reqClone);
    }
}
