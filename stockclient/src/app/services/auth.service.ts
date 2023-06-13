import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

const APIURL = "http://127.0.0.1:8080/api"
// const APIURL = "https://stockxyz-production.up.railway.app/api"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  islogin : boolean = false
  email : string = ""

  constructor(private http: HttpClient) { }

  signinUser(loginrequest : any){
    // call restserver and check for credential
    this.email = loginrequest["email"]
    this.islogin = true
  }

  signupUser(signuprequest : any){
    // call restserver and add new user if it is not existing
    const POSTURL = APIURL + "/signup"

    const payload: any = { 
      email : signuprequest["email"] ,
      password : signuprequest["password"] 
    }

    return lastValueFrom(
      this.http.post<any>(POSTURL,payload)
    )
    
  }
}
