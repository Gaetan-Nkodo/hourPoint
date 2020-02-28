import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/shared/global.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-user-cmp',
    templateUrl: 'userpage.component.html',
    providers:[GlobalService]
})

export class UserPageComponent implements OnInit{
    constructor(private data2: GlobalService){

    }

    private user;

    ngOnInit(){
        this.getUserInfo();
    }

    getUserInfo(){

        this.data2.getUserProfile().subscribe(
            res => {
                console.log("user at init",res['user']);
                this.user = res['user'];
            },
            err => {
                console.log("userpage error\n",err);
            }
        )

    }

    choice=false;
    annuler=false;
    valid=false;
    i=0;
    newMdp1;
    newMdp2;
    balise = 0;


    onClick(){

        if(this.i==0){
            this.choice= true;
            this.annuler=true;
            this.i++;
        }
        
    }

    keyPressed(mdp){
        this.balise = 1;
        this.data2.testPassword(this.user.userName,mdp).subscribe(res=>{

            console.log("userPageComponent keyPressed res",res);

            if(res){
                this.valid = true;
                this.choice = false;
            }else{
                //alert("Mot de passe incorrect");
                swal({
                    title: "Mot de passe incorrect",
                    type: "warning",
                    buttonsStyling: false,
                    confirmButtonClass: 'btn btn-info'
                }).catch(swal.noop);
                
            }
        })


    }
   

    
    newMdpTest(){
        console.log("BALISE",this.balise);
        /*setTimeout(() => {
            console.log("IN SET TIMEOUT")
            this.balise = 0;
        },2000);*/
        //if(this.balise != 1){
            if(this.annuler==true){
            if(this.newMdp1==this.newMdp2){
                this.i=0;
                console.log("newMdpTest this.newmdp1",this.newMdp1);
                if(this.newMdp1!= undefined){
                    this.user.password=this.newMdp1;
                }
                
                this.valid = false;
                this.choice=false;
                console.log("it entered");

            }else{
                this.i=0;
                if(this.annuler){
                    return swal({
                        title: "Verifiez que les mot de passe sont identiques!",
                        type: "warning",
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-info'
                    }).catch(swal.noop);
                    //alert("Verifiez que les mot de passe sont identiques!");
                }
            }
        }
                console.log("newMdpTest updated this.user",this.user)
                console.log("\n\nUSER PASSWORD",this.user.password)
                this.data2.updateUserInfo(this.user,this.annuler).subscribe(
                    res => {
                        this.user = res;
                        console.log("Changed user",res);
                        swal({
                            title: 'Mis à jour',
                            text: 'Profil utilisateur mis à jour avec succès.',
                            type: 'success',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        });
                    },
                    err => {
                        console.log(err);
                    }
                );
                this.annuler=false;
                this.newMdp1=undefined;
                this.newMdp2=undefined;
    //}
}

}
