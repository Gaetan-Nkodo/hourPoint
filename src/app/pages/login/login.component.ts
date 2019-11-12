import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { DatabaseService } from '../../shared/database.service';
import { ActiveUserService } from 'app/shared/activeUser.service';
import { GlobalService } from 'app/shared/global.service';
import { TestService } from 'app/shared/test.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers:[ActiveUserService,DatabaseService,GlobalService]
})

export class LoginComponent implements OnInit, OnDestroy {
    year: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;

    signal:number=0;
    tab=[];
    

    constructor(private element: ElementRef,private test:TestService,public router:Router,private data:DatabaseService,private data2:GlobalService,private activeIndex:ActiveUserService) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }


    database(donnee){

        this.signal=0;
;
        let index=0;
    
        console.log("this.tab",this.tab);
        
        for(let i:number=0;i<this.tab.length;i++){
            if(this.tab[i].userName == donnee.name){
                if(this.tab[i].password == donnee.password){
                    this.signal++;
                    index=i;
                    this.activeIndex.setActiveUserToLocalStorage(index);
    
                }
            }
        }  

        if(this.signal!=0){
            if(this.tab[index].profil === 'admin'){
                this.test.setLogStatus(true);
                this.router.navigate(['/dashboard']);
                
            }else{
                this.router.navigate(['/dashboardUser']);
            }
        } else {
            alert("bad login");
        }

        
    }

    ngOnInit() {

        this.data2.getInfo().subscribe(data=>{
            this.tab=data;
            console.log("valLogin",this.tab)
            });



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
