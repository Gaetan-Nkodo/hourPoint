import { Component } from '@angular/core';
import { ActiveUserService } from 'app/shared/activeUser.service';
import { DatabaseService } from 'app/shared/database.service';

@Component({
    selector: 'app-user-cmp',
    templateUrl: 'userpage.component.html',
    providers:[ActiveUserService,DatabaseService]
})

export class UserPageComponent {
    constructor(private activeUser:ActiveUserService,private data:DatabaseService){}
    tab=this.data.getInfo();
    user=this.tab[this.activeUser.getActiveUsersFromLocalStorage()];
    choice=false;
    annuler=false;
    valid=false;
    i=0;
    newMdp1;
    newMdp2;


    onClick(){

        if(this.i==0){
            this.choice= true;
            this.annuler=true;
            this.i++;
        }
        
    }

    keyPressed(mdp){

        if(mdp == this.user.password){
            this.valid = true;
            this.choice = false;
        }else{
            alert("Mot de passe incorrect");
            
        }

    }
    
    newMdpTest(){
        if(this.annuler==true){
        if(this.newMdp1==this.newMdp2){
            console.log(this.newMdp1);
            if(this.newMdp1!= undefined){
                this.user.password=this.newMdp1;
            }
            this.annuler=false;
            this.valid = false;
            this.choice=false;
            console.log("it entered");

        }else{
            if(this.annuler){
            alert("Verifiez que les mot de passe sont identiques!");
            }
        }
        this.i=0;
    }
            this.data.modifInfo(this.user);
    }

}
