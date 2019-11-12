import {Injectable} from '@angular/core'
import {User} from '../pages/login/user';
import { Observable } from 'rxjs/Observable'
import { Http,Response, RequestOptions,Headers } from '@angular/http'
import 'rxjs/add/operator/map'
//import { Student } from './student'


@Injectable()

export class GlobalService{

    constructor(public http:Http){

    }
    getInfo(){

        return this.http.get("http://localhost:3000/admin/database")
                        .map((res:Response)=> res.json())
           
   }

   setInfo(user:User){

    
    fetch("http://localhost:3000/admin/databased",{
        method: 'POST',
        body: JSON.stringify(user),
        headers: {'Content-Type':'application/json'}
    })
    
}

}
