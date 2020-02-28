import {Injectable} from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Http,Response, RequestOptions,Headers } from '@angular/http'
import 'rxjs/add/operator/map'
import { splitAtColon } from '@angular/compiler/src/util';
import { HttpHeaders, HttpClient } from '@angular/common/http';
//import { Student } from './student'

import {User} from '../pages/login/user';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()

export class GlobalService{

    noAuthHeader = {headers: new HttpHeaders({'NoAuth': 'True'})};

    constructor(public http:HttpClient){

    }
    getInfo(){

        return this.http.get("http://localhost:3000/admin/database")
                        .map((res:Response)=> res)
           
   }

   getInfoById(_id){

    return this.http.get("http://localhost:3000/admin/database/"+_id)
                    .map((res:Response)=> res)
       
    }

   loginHandler(userName:string, password:string){

    console.log(userName,password);
    let userLogin ={
        userName: userName,
        password: password
    }

    return this.http.post("http://localhost:3000/admin/login",userLogin,this.noAuthHeader)
                    .map((res:Response)=> res)

   }

   setInfo(user:User){

    return this.http.post("http://localhost:3000/admin/databased",user,this.noAuthHeader)
             .map((res:Response)=> res)

    
}

DeleteUser(_id:string){

    return this.http.delete("http://localhost:3000/admin/database/"+_id)
             .map((res:Response)=> res)

}


getUserProfile(){
    console.log('In getUserProfile\n');
    return this.http.get("http://localhost:3000/user/database")
    .map((res:Response)=> res)

}

updateUserInfo(user,bool){
    console.log("updateUser user",user);
    console.log("updateUser user._id",user._id);
    return this.http.put("http://localhost:3000/admin/database/"+user._id,{user:user,bool:bool})
                    .map((res:Response) => res)
}


getdatabaseStatistics(){

    return this.http.get("http://localhost:3000/admin/databaseStatistics")
                    .map((res:Response)=> res)
       
}



    setTokenToLocalStorage(token: string) {
        localStorage.setItem('token',token);
        console.log("saved token to localstorage");
        
    }

    deleteTokenFromLocalStorage() {
        localStorage.removeItem('token');
        console.log("Removed token from localstorage");
        
    }
    getTokenFromLocalStorage(){
        return localStorage.getItem('token');
    }

    getUserPayload(){
        var token = this.getTokenFromLocalStorage();
        console.log('In getUserPayload\n', token);
        if(token){
            var userPayload = atob(token.split('.')[1]);
            return JSON.parse(userPayload);
        }else{
            return null;
        }
    }

    isLoggedIn(){
        var userPayload = this.getUserPayload();
        console.log('In isLoggedIn', userPayload);
        

        if(userPayload){
            return userPayload.exp > Date.now()/1000;
        }else{
            return false;
        }
    }

    getWeekHoursInfo(){
        console.log('In getWeekHoursInfo\n');
        return this.http.get("http://localhost:3000/user/weekHoursInfo")
        .map((res:Response)=> res) 
    }


    getAllWeekHoursInfo(day,month,year){
        console.log('In getAllWeekHoursInfo YOOOOO\n',day,month,year);
        return this.http.get("http://localhost:3000/admin/allWeekHoursInfo/"+ day +"/"+month+"/"+year)
        .map((res:Response)=> res) 
    }

    getMonthHoursInfo(month,year){
        console.log('In getMonthHoursInfo\n');
        return this.http.get("http://localhost:3000/user/monthHoursInfo/"+ month +"/"+year)
        .map((res:Response)=> res) 
    }

    getAllMonthHoursInfo(month,year){
        console.log('In getAllMonthHoursInfo\n');
        return this.http.get("http://localhost:3000/admin/allMonthHoursInfo/"+ month +"/"+year)
        .map((res:Response)=> res) 
    }

    getAdminWeekHoursInfo(_id){
        console.log('In getAdminWeekHoursInfo\n');
        return this.http.get("http://localhost:3000/admin/weekHoursInfo/"+_id)
        .map((res:Response)=> res) 
    }

    
    getAdminMonthHoursInfo(_id,month,year){
        console.log('In getAdminMonthHoursInfo\n');

        //this.postMonthData(month);

        return this.http.get("http://localhost:3000/admin/monthHoursInfo/"+_id + "/" + month +"/"+year)
        .map((res:Response)=> res) 
    }

    testPassword(username,mdp){
        
        return this.http.post('http://localhost:3000/user/testPassword',{userName:username,password:mdp})

    }

    setUserIdToLocalStorage(_id) {
        localStorage.setItem('UserId',_id);
        console.log("UserId saved token to localstorage");
        
    }

    getUserIdFromLocalStorage(){
        return localStorage.getItem('UserId');
    }

    deleteUserIdFromLocalStorage() {
        localStorage.removeItem('UserId');
        console.log("Removed userId from localstorage");
        
    }

    setCurrentPageToLocalStorage(route) {
        localStorage.setItem('currentPage',route);
        console.log("currentPage saved token to localstorage");
        
    }

    getCurrentPageFromLocalStorage(){
        return localStorage.getItem('currentPage');
    }

    private hourDiffBis1;
    private hourDiffBis2;
    calculateExtraMorning(hourOnDuty,hourClockIn,hourClockOut){
        let hourDiff,newHour,newMin;
        let hourOnDutyMin=parseInt(hourOnDuty.split(":")[0])*60 + parseInt(hourOnDuty.split(":")[1])
        let hourClockInMin=parseInt(hourClockIn.split(":")[0])*60 + parseInt(hourClockIn.split(":")[1])

         this.hourDiffBis1=hourOnDutyMin-hourClockInMin
         if(hourClockIn==''||hourClockOut==""){
            this.hourDiffBis1=0
            return "/"
        }
        
         hourDiff=this.hourDiffBis1

         if(hourDiff<0){
            hourDiff=-hourDiff
         }

         newHour=Math.floor(hourDiff/60)
         newMin=hourDiff-(newHour*60)
 
         if(this.hourDiffBis1<0){
             return "-"+newHour+"h"+newMin+"min";
         }
         else{
             return newHour+"h"+newMin+"min";
         }
    }

    calculateExtraAfternoon(hourOffDuty,hourClockOut,hourClockIn){
        let hourDiff,newHour,newMin;
        let hourOnDutyMin=parseInt(hourOffDuty.split(":")[0])*60 + parseInt(hourOffDuty.split(":")[1])
        let hourClockOutMin=parseInt(hourClockOut.split(":")[0])*60 + parseInt(hourClockOut.split(":")[1])

        this.hourDiffBis2=hourClockOutMin-hourOnDutyMin
        if(hourClockOut==''||hourClockIn==""){
            this.hourDiffBis2=0
            return "/"
        }
        hourDiff=this.hourDiffBis2

        if(hourDiff<0){
            hourDiff=-hourDiff
        }
        newHour=Math.floor(hourDiff/60)
        newMin=hourDiff-(newHour*60)

        if(this.hourDiffBis2<0){
            return "-"+newHour+"h"+newMin+"min";
        }
        else{
            return newHour+"h"+newMin+"min";
        }

    }

    calculateExtraTotal(){
        let hourDiffBis3,newHour,newMin;
        hourDiffBis3=this.hourDiffBis1+this.hourDiffBis2
        let hourDiff=hourDiffBis3
        if(hourDiff<0){
            hourDiff=-hourDiff
        }

        newHour=Math.floor(hourDiff/60)
        newMin=hourDiff-(newHour*60)

        if(hourDiffBis3<0){
            return {hourString:"-"+newHour+"h"+newMin+"min",hourNumber: hourDiffBis3};
        }
        else{
            return {hourString: newHour+"h"+newMin+"min",hourNumber: hourDiffBis3};
        }
    }

    calculateTotalExtraTotal(tabExtraTotal){
        console.log('in calculateTotalextra',tabExtraTotal);
        let total=0,newHour,newMin;
        for(let i=0;i<tabExtraTotal.length;i++){
            total=total+tabExtraTotal[i]
        }

        newHour=Math.floor(total/60)
        newMin=total-(newHour*60)

        if(total<0){
            return "-"+newHour+"h"+newMin+"min";
        }
        else{
            return newHour+"h"+newMin+"min";
        }
    
    }

    calculateMinDiff(hour1,hour2){
        let hourDiff;
        let hour1Min=parseInt(hour1.split(":")[0])*60 + parseInt(hour1.split(":")[1])
        let hour2Min=parseInt(hour2.split(":")[0])*60 + parseInt(hour2.split(":")[1])

         hourDiff=hour2Min-hour1Min

         return hourDiff;

    }


    calculateHourDiff(minDiff){
        let newHour,newMin;
         newHour=Math.floor(minDiff/60)
         newMin=minDiff-(newHour*60)
 
         return newHour+"h"+newMin+"min";

    }

    private tab;
    private tabExtraMorning=[];
    private tabExtraAfternoon=[];
    private tabExtraTotalString=[];
    private tabExtraTotalNumber=[];
    private totalExtraTotal;

    heureSup(res) {
            this.tab =res;
            if(this.tab.length==1){
                return "/"
            }else{

            for(let i=0;i<this.tab.length;i++){
               this.tabExtraMorning.push(this.calculateExtraMorning(this.tab[i].onDuty,this.tab[i].clockIn,this.tab[i].clockOut));
               this.tabExtraAfternoon.push(this.calculateExtraAfternoon(this.tab[i].offDuty,this.tab[i].clockOut,this.tab[i].clockIn));
               this.tabExtraTotalString.push(this.calculateExtraTotal().hourString); 
               this.tabExtraTotalNumber.push(this.calculateExtraTotal().hourNumber);
            }

            for(let i=0;i<this.tab.length;i++){
              this.tab[i].extraMorning = this.tabExtraMorning[i]
              this.tab[i].extraAfternoon = this.tabExtraAfternoon[i]
              this.tab[i].extraFinal = this.tabExtraTotalString[i]

              /*if(this.tabExtraMorning[i].charAt(0)=='-'){

                this.tab[i].extraMorningSign=0
              }else{
                this.tab[i].extraMorningSign=1
              }

              if(this.tabExtraAfternoon[i].charAt(0)=='-'){

                this.tab[i].extraAfternoonSign=0
              }else{
                this.tab[i].extrAfternoonSign=1
              }

              if(this.tabExtraTotalString[i].charAt(0)=='-'){

                this.tab[i].extraFinalSign=0
              }else{
                this.tab[i].extrFinalSign=1
              }*/

            }

            this.totalExtraTotal=this.calculateTotalExtraTotal(this.tabExtraTotalNumber);

           this.tabExtraMorning=[]
           this.tabExtraAfternoon=[]
           this.tabExtraTotalString=[]
           this.tabExtraTotalNumber=[]

           return this.totalExtraTotal;
        }
            
        }
    

    public exportAsExcelFile(json: any[], excelFileName: string): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
      }

    private saveAsExcelFile(buffer: any, fileName: string): void {
         const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
         FileSaver.saveAs(data, fileName + new  Date().getTime() + EXCEL_EXTENSION);
      }

      public obj;
      public tabx;

    public statWeek(tabWeekHours){
        this.tabx=[];
        this.obj={};

         console.log("**********************tabWeekHours",tabWeekHours);
        // console.log("**********************tabx",this.tabx);
        // console.log("**********************obj",this.obj);

        for(let i=0;i<tabWeekHours.length;i++){
            this.obj={};

        if(tabWeekHours[i].length==1){
            this.obj.nom=tabWeekHours[i]
            this.tabx.push(this.obj)
        }else{
            this.obj.nom= tabWeekHours[i][0].name
            this.tabx.push(this.obj)
        }

        if(tabWeekHours[i].length==1){
            
            this.tabx[i].heureNormale="/"
        }else{
            var heureNormale=0
            for(var j=0;j<tabWeekHours[i].length;j++){

            heureNormale=heureNormale+this.calculateMinDiff(tabWeekHours[i][j].onDuty,tabWeekHours[i][j].offDuty)
            }
            this.tabx[i].heureNormale=this.calculateHourDiff(heureNormale);
        }
        console.log('IN STATISTICS FUNCTION')
        if(tabWeekHours[i].length==1){
            
            this.tabx[i].heureNonEffectue="/"
            this.tabx[i].heureEffectue="/"
        }else{
            var heureNonEffectue1=0
            var heureNonEffectue2=0
            for(var j=0;j<tabWeekHours[i].length;j++){
                if(tabWeekHours[i][j].clockIn==""||tabWeekHours[i][j].clockOut==""){
                    heureNonEffectue1=heureNonEffectue1+this.calculateMinDiff(tabWeekHours[i][j].onDuty,tabWeekHours[i][j].offDuty);
                }else{
                    if(this.calculateMinDiff(tabWeekHours[i][j].onDuty,tabWeekHours[i][j].clockIn)>0){
                        heureNonEffectue1=heureNonEffectue1+this.calculateMinDiff(tabWeekHours[i][j].onDuty,tabWeekHours[i][j].clockIn)
                    }
                }

                if(tabWeekHours[i][j].clockOut==""){
                    heureNonEffectue2=heureNonEffectue2+0;
                }else{
                    if(this.calculateMinDiff(tabWeekHours[i][j].clockOut,tabWeekHours[i][j].offDuty)>0){
                        heureNonEffectue2=heureNonEffectue2+this.calculateMinDiff(tabWeekHours[i][j].clockOut,tabWeekHours[i][j].offDuty)
                    }
                }
            
         }
         this.tabx[i].heureNonEffectue=heureNonEffectue1+heureNonEffectue2
         this.tabx[i].heureEffectue=heureNormale-this.tabx[i].heureNonEffectue

         this.tabx[i].heureNonEffectue=this.calculateHourDiff(this.tabx[i].heureNonEffectue);
         this.tabx[i].heureEffectue=this.calculateHourDiff(this.tabx[i].heureEffectue);
        }


        this.tabx[i].heureSup=this.heureSup(tabWeekHours[i]);

        }



        console.log("**********************tabWeekHoursLength",tabWeekHours.length);
        console.log("**********************tab",this.tabx);

        return this.tabx
    }

    public obj2;
    public tabxMonth;

    public statMonth(tabMonthHours){
        this.tabxMonth=[];
        this.obj2={};

        for(let i=0;i<tabMonthHours.length;i++){
            this.obj2={};

        if(tabMonthHours[i].length==1){
            this.obj2.nom=tabMonthHours[i]
            this.tabxMonth.push(this.obj2)
        }else{
            this.obj2.nom= tabMonthHours[i][0].name
            this.tabxMonth.push(this.obj2)
        }

            var absence=0
            for(var j=0;j<tabMonthHours[i].length;j++){
                if(tabMonthHours[i][j].clockIn==""||tabMonthHours[i][j].clockOut==""){
                    absence=absence+1;
                }
        }

        this.tabxMonth[i].absence=absence;

        }

        return this.tabxMonth;
    }

}
