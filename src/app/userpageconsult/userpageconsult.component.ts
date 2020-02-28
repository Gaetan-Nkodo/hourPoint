import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/shared/global.service';

@Component({
    selector: 'app-user-cmp',
    templateUrl: 'userpageconsult.component.html',
    providers:[]
})

export class UserPageConsultComponent implements OnInit {
    constructor(private data2: GlobalService){}

   private user

    ngOnInit(){
        this.data2.getUserProfile().subscribe(
            res => {
                console.log(res['user']);
                this.user = res['user'];
            },
            err => {
                console.log("userpageconsult error\n",err);
            }
        )
    }

}
