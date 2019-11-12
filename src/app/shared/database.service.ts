import {Injectable} from "@angular/core";
import {User} from '../pages/login/user';
import { ActiveUserService } from "./activeUser.service";


export class Database{

}

@Injectable()
export class DatabaseService{

    constructor(private activeUser:ActiveUserService){}
    
    usertab = [ new User(0,'ad','admin','','nordwish225',665458525,'admin','admin')];
    

    getInfo():User[]{
        this.getUsersFromLocalStorage();
        console.log("this.usertab",this.usertab);
        console.log("user retrieved");
        
        return this.usertab;
    }
    setInfo(user:User){
        this.getUsersFromLocalStorage();
        if(this.usertab == null){
            user.id = 0;
        }else{
            user.id = this.usertab[this.usertab.length -1].id + 1;
        }
        this.usertab.push(user);
        console.log(this.usertab);
        this.setUsersToLocalStorage();
        console.log("user saved");
        
    }

    modifInfo(user:User){
        this.getUsersFromLocalStorage();
        this.usertab[this.activeUser.getActiveUsersFromLocalStorage()]=user;
        this.setUsersToLocalStorage();
    }

    deleteUser(userID:number){
       let index:number;
        for(let user of this.usertab){
            if(user.id==userID){
                index=this.usertab.indexOf(user);
                this.usertab.splice(index,1);
                this.setUsersToLocalStorage();
            }
        }

    }

    setUsersToLocalStorage() {
        localStorage.setItem("usersList", JSON.stringify(this.usertab));
        console.log("save usersList to localstorage");
        
    }

    getUsersFromLocalStorage() {

        if(localStorage.getItem("usersList") != null){

            this.usertab = JSON.parse(localStorage.getItem("usersList"));
            console.log("save user to userList in localstorage");
        }
        
        
    }

    

}
