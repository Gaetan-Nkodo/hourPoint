import { Component, OnInit } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { HTTPStatus } from './shared/auth/auth.interceptors';


@Component({
    selector: 'app-my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    HTTPActivity: boolean;
    constructor(private httpStatus: HTTPStatus) {

        console.log('IN APPCOMPONENT')
        this.httpStatus.getHttpStatus().subscribe((status: boolean) => {this.HTTPActivity = status; console.log("STATUS",status)});

    }




    // showLoadingIndicator = true;
    // constructor(private router:Router) {
    //     this.router.events.subscribe((routerEvent:Event) => {

    //         if(routerEvent instanceof NavigationStart){
    //             this.showLoadingIndicator = true;
    //         }

    //         if(routerEvent instanceof NavigationEnd){
    //             this.showLoadingIndicator = false;
    //         }

    //     });

    // }

    ngOnInit() {
    }
}
