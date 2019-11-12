import { Component } from '@angular/core';
import { ActiveUserService } from 'app/shared/activeUser.service';
import { DatabaseService } from 'app/shared/database.service';

@Component({
    selector: 'app-user-cmp',
    templateUrl: 'userpageconsult.component.html',
    providers:[ActiveUserService,DatabaseService]
})

export class UserPageConsultComponent {
    constructor(private activeUser:ActiveUserService,private data:DatabaseService){}
    tab=this.data.getInfo();
    user=this.tab[this.activeUser.getActiveUsersFromLocalStorage()];

}
