import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TestService } from './test.service';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth:TestService,public router:Router){

    }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (this.auth.isloggedIn==false) {
            this.router.navigate(['/pages/login']);
        }
        return this.auth.isloggedIn;
    }
    
    }