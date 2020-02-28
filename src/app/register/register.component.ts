import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'app/pages/login/user';
import { Router } from '@angular/router';
import { GlobalService } from 'app/shared/global.service';
import swal from 'sweetalert2';
import { HTTPStatus } from 'app/shared/auth/auth.interceptors';

@Component({
    selector: 'app-register-cmp',
    templateUrl: './register.component.html',
    providers: [GlobalService]
})

export class RegisterComponent {
    test: Date = new Date();

    constructor(private data2: GlobalService, private router: Router, private status:HTTPStatus){

    }

    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    onClick(donnee) {
      if(donnee.mdp === donnee.mdpConfirm){
        let newUser:User = new User("",donnee.nomUtilisateur,donnee.nom,donnee.prenom,donnee.adresse,donnee.tel,donnee.mdp,donnee.profil);
        console.log("New User",newUser);
        this.data2.setInfo(newUser).subscribe(
          res => {
            console.log(res);
            swal({
              title: 'Créé',
              text: 'Nouvel utilisateur créé avec succès.',
              type: 'success',
              confirmButtonClass: 'btn btn-success',
              buttonsStyling: false
          });
            this.router.navigate(['/adminList']);
          },
          err => {
            console.log('CREATE USER ERROR', err.error);
            swal({
              title: err.error.message,
              type: "warning",
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-info'
          }).catch(swal.noop);

          this.status.setHttpStatus(false);
      
          }
        );
      }else{

          swal({
            title: "Verifiez que les mot de passe sont identiques!",
            type: "warning",
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-info'
        }).catch(swal.noop);

      }


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
