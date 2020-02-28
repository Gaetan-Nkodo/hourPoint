import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/shared/global.service';

@Component({
    selector: 'app-user-cmp',
    templateUrl: 'adminUserpageconsult.component.html',
    providers:[]
})

export class AdminUserPageConsultComponent implements OnInit {
    constructor(private data2: GlobalService){}

   private user

    ngOnInit(){
        console.log("selectedUserId",this.data2.getUserIdFromLocalStorage());
        this.data2.getInfoById(this.data2.getUserIdFromLocalStorage()).subscribe(
            res => {
                console.log(res);
                this.user = res;
            },
            err => {
                console.log("userpageconsult error\n",err);
            }
        )
    }

}
