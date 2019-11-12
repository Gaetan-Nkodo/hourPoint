import {Injectable} from "@angular/core";
import {User} from '../pages/login/user';

@Injectable()
export class ActiveUserService{
    // index:number

    // getActiveUser():number{
    //     console.log("index3= "+this.index);
    //     return this.index;
    // }

    // setActiveUser(index:number){
    //     this.setIndexToLocalStorage(index);
    //     this.index=this.getIndexFromLocalStorage;
    //     console.log("index2= "+index);
    // }

    setActiveUserToLocalStorage(index:number) {
        localStorage.setItem("activeUser", JSON.stringify(index));
        console.log("index2= "+index);
    }

    getActiveUsersFromLocalStorage() {
        let index:number = JSON.parse(localStorage.getItem("activeUser"));
        console.log("index3= "+index);
        return index;
    }

}
