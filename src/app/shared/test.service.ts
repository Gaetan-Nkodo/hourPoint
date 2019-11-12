import {Injectable} from '@angular/core';

@Injectable()
export class TestService{

    private  logStatus:boolean =false;

    setLogStatus(value:boolean){
        this.logStatus=value;
        console.log("setLogStatus",this.logStatus);
        
    }
    
    get isloggedIn(){
        return this.logStatus;
    }

   

}