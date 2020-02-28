import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { GlobalService } from '../global.service';

@Injectable()
export class UserAuthGuard implements CanActivate {

  constructor(private data2:GlobalService,private router: Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(!this.data2.isLoggedIn()){
        console.log('IN canActivate');
        this.router.navigate(['/pages/login']);
        this.data2.deleteTokenFromLocalStorage();
        return false;
      }else{
        let userPayload = this.data2.getUserPayload()

        if(userPayload.profil == "user"){
          return true;
        }else{
          this.router.navigateByUrl('/pageNotFound');
          return false
        }
      }

  }
}
