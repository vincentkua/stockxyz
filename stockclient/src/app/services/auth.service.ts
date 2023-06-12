import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  islogin : boolean = false
  email : string = ""

  constructor() { }

  signinUser(loginrequest : any){
    // call restserver and check for credential
    this.email = loginrequest["email"]
    this.islogin = true
  }

  signupUser(loginrequest : any){
    // call restserver , check if exist and then add new user
    
  }
}
