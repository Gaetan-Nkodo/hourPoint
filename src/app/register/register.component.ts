import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from 'app/shared/database.service';
import { User } from 'app/pages/login/user';
import { Router } from "@angular/router";
import { GlobalService } from 'app/shared/global.service';

@Component({
    selector: 'app-register-cmp',
    templateUrl: './register.component.html',
    providers: [DatabaseService,GlobalService]
})

export class RegisterComponent {
    test: Date = new Date();

    constructor(private data:DatabaseService,public data2:GlobalService, public router: Router,){

    }

    onClick(donnee){

      let newUser:User = new User(0,donnee.nomUtilisateur,donnee.nom,donnee.prenom,donnee.adresse,donnee.tel,donnee.mdp,donnee.profil);
      this.data2.setInfo(newUser);
      this.router.navigate(['/dashboard']);


    }

    // ngOnInit() {
    //   const body = document.getElementsByTagName('body')[0];
    //   body.classList.add('register-page');
    //   body.classList.add('off-canvas-sidebar');
    // }
    // ngOnDestroy(){
    //   const body = document.getElementsByTagName('body')[0];
    //   body.classList.remove('register-page');
    //   body.classList.remove('off-canvas-sidebar');
    // }
}
