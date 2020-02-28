import { Component } from '@angular/core';
import { GlobalService } from 'app/shared/global.service';

@Component({
    selector: 'app-user-cmp',
    templateUrl: 'adminpageconsult.component.html',
    providers: [GlobalService]
})

export class AdminPageConsultComponent {
    constructor(private data2: GlobalService){}
    
    private user
 
     ngOnInit(){
         this.data2.getUserProfile().subscribe(
             res => {
                 console.log(res['user']);
                 this.user = res['user'];
             },
             err => {
                 console.log("adminpageconsult error\n",err);
             }
         )
     }
}
