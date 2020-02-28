import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'app/pages/login/user';
import { Router } from '@angular/router';
import { GlobalService } from 'app/shared/global.service';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';
import { HTTPStatus } from 'app/shared/auth/auth.interceptors';

@Component({
    selector: 'app-register-cmp',
    templateUrl: './registerImport.component.html',
    providers: [GlobalService]
})

export class RegisterImportComponent {
    test: Date = new Date();

    private tab = [];

    constructor(private data2: GlobalService, private router: Router,private http:HttpClient, private status:HTTPStatus){

    }

    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    onClick(donnee) {
      if(donnee.mdp === donnee.mdpConfirm){
        let newUser:User = new User("",donnee.nomUtilisateur,donnee.nom,donnee.prenom,donnee.adresse,donnee.tel,donnee.mdp,donnee.profil);
        console.log("New User",newUser);
        this.data2.setInfo(newUser).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log('CREATE USER ERROR', err.error);
          }
        );
        this.router.navigate(['/dashboard']);
      }else{
        alert("Verifiez que les mot de passe sont identiques!");
      }

    }
/***************************************************************************************************** */
    data: any=[{nomUtilisateur: '',nom: '',prenom: '',motDePasse:'',adresse:'',tel:'',profil:''}]

    exportAsXLSX():void {
      this.data2.exportAsExcelFile(this.data, 'pse');
   }
/***************************************************************************************************** */
import=false;
importer(){
  this.import=true
}

annuler(){
  this.import=false
  this.selectedFile=null
}

selectedFile:File=null

onFileSelected(event){
    this.selectedFile=<File>event.target.files[0];
}

onUpload(){
    this.status.setHttpStatus(true);
    const fd=new FormData();
    fd.append('photo',this.selectedFile,this.selectedFile.name)
    this.http.post('http://localhost:3000/api2/upload',fd)
             .subscribe(res=>{
                 console.log("in upload",res);
                 let obj:any = res
                 this.tab = obj.failure;
                 console.log(this.tab);
                 swal({
                  title: 'Importation terminée',
                  text: obj.success.length+' importation(s) réussie(s), ' + obj.failure.length +' importation(s) échoué(s)',
                  type: 'success',
                  confirmButtonClass: 'btn btn-success',
                  buttonsStyling: false
              });
              this.status.setHttpStatus(false);
             })
    this.selectedFile=null;
    this.import=false;
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
