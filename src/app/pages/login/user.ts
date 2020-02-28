    export class User{
        _id: string;
        userName: string;
        name: string;
        secondName:string;
        password:string;
        adresse:string;
        tel:number;
        profil:string;

        constructor(_id:string,userName:string,name:string,secondName:string,adresse:string,tel:number,password:string,profil:string){
            this._id = _id;
            this.userName = userName;
            this.name = name;
            this.secondName = secondName;
            this.password = password;
            this.adresse = adresse;
            this.profil = profil;
            this.tel = tel;
        }
    }