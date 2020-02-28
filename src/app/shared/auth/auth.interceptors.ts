import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {tap} from "rxjs/operators";
import { GlobalService } from "../global.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { catchError, finalize, map } from 'rxjs/operators';


@Injectable()
export class HTTPStatus {
  private requestInFlight$: BehaviorSubject<boolean>;
  constructor() {
    this.requestInFlight$ = new BehaviorSubject(false);
  }

  setHttpStatus(inFlight: boolean) {
    this.requestInFlight$.next(inFlight);
  }

  getHttpStatus(): Observable<boolean> {
    return this.requestInFlight$.asObservable();
  }
}



@Injectable()

 export class AuthInterceptor implements HttpInterceptor{

     constructor(private data2:GlobalService,private router:Router,private status:HTTPStatus){

     }

     
     intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>>{

        console.log("In authInterceptor")
        this.status.setHttpStatus(true);
         if(req.headers.get('noauth')){
            console.log("In authInterceptor with noauth");
             return next.handle(req.clone());
         }else{
             console.log("In authInterceptor without noauth");
             const clonedreq = req.clone({
                 headers: req.headers.set("Authorization", "Bearer " + this.data2.getTokenFromLocalStorage())
             });
             return next.handle(clonedreq).pipe(
                 tap(
                     event => {console.log("IN EVENT")},

                     err => {
                         if(err.error.auth == false){
                             this.router.navigate(['/pages/login']);
                         }
                     }),
                finalize(() => {
                this.status.setHttpStatus(false);
              })
                            
             );
         }

     }

 }
