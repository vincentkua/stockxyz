import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

const APIURL = "http://127.0.0.1:8080/api"
// const APIURL = "https://stockxyz-production.up.railway.app/api"



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  validateJWT(jwtString : string){
    const VALIDATEURL = APIURL + "/validatejwt"

    const params = new HttpParams()
    .set("jwt", jwtString)
    
    return lastValueFrom(
      this.http.get<any>(VALIDATEURL,{params})
    )
  }

  parseJWT(jwtString : string){
    const PARSEURL = APIURL + "/parsejwt"

    const params = new HttpParams()
    .set("jwt", jwtString)
    
    return lastValueFrom(
      this.http.get<any>(PARSEURL,{params})
    )
  }

  signinUser(loginrequest : any){
    const CHECKUSERURL = APIURL + "/signin"

    const params = new HttpParams()
    .set("email", loginrequest["email"])
    .set("password", loginrequest["password"])
    
    return lastValueFrom(
      this.http.get<any>(CHECKUSERURL,{params})
    )
  }

  signupUser(signuprequest : any){
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
