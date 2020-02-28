import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { GlobalService } from 'app/shared/global.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import swal from 'sweetalert2';
import { HTTPStatus } from 'app/shared/auth/auth.interceptors';

declare var $: any;

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers:[GlobalService]
})

export class LoginComponent implements OnInit, OnDestroy {
    year: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;

    signal:number=0;
    tab=[];
    

    constructor(private element: ElementRef,public router:Router,private data2:GlobalService,private location:Location,private status:HTTPStatus) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }


    database(donnee){

        this.data2.loginHandler(donnee.name,donnee.password).subscribe(
            res => {
                console.log('TOKEN',res);
                this.data2.setTokenToLocalStorage(res['token']);
                let userPayload = this.data2.getUserPayload();
                if(userPayload.profil === 'admin'){
                    this.router.navigate(['/dashboard']);
                }else{
                    this.router.navigate(['/userList']);
                }
            },
            err => {
                //alert(err.error.message);err.error.message
                this.status.setHttpStatus(false);
                swal({
                    title: err.url!=null ? err.error.message : "Erreur de connexion au serveur backend",
                    type: "warning",
                    buttonsStyling: false,
                    confirmButtonClass: 'btn btn-info'
                }).catch(swal.noop);


                console.log("Login error 2",err);
            }
        );

        //  this.signal=0;

        //  let index=0;
    
        // console.log("this.tab",this.tab); 
        
        // for(let i:number=0;i<this.tab.length;i++){
        //     if(this.tab[i].userName == donnee.name){
        //         if(this.tab[i].password == donnee.password){
        //             this.signal++;
        //             index=i;
        //             this.activeIndex.setActiveUserToLocalStorage(index);
    
        //         }
        //     }
        // }  

        // if(this.signal!=0){
        //     if(this.tab[index].profil === 'admin'){
        //         this.test.setLogStatus(true);
        //         this.router.navigate(['/dashboard']);
                
        //     }else{
        //         this.router.navigate(['/dashboardUser']);
        //     }
        // } else {
        //     alert("bad login");
        // }

        
    }

    ngOnInit() {
    
        if(this.data2.isLoggedIn()){
            let userPayload = this.data2.getUserPayload()
            if(userPayload.profil == "admin"){
              this.router.navigateByUrl('/dashboard');
            }else{
              this.router.navigateByUrl('/userList');
            }
        }



        // this.data2.getInfo().subscribe(data=>{
        //     this.tab=data;
        //     console.log("valLogin",this.tab)
        //     });












        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        body.classList.add('off-canvas-sidebar');
        //const card = document.getElementsByClassName('card')[0];
        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            //card.classList.remove('card-hidden');
        }, 700);
    }
    sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function() {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
    ngOnDestroy(){
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('login-page');
      body.classList.remove('off-canvas-sidebar');
    }
}
