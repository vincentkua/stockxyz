import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';

// const APIURL = "http://127.0.0.1:8080/api"
// const APIURL = "https://stockxyz-production.up.railway.app/api"
const APIURL = "/api"

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http : HttpClient) { }

  
  sendNotification(newnotification : any){
    const POSTURL = APIURL + "/notification"

    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set("Authorization", `Bearer ${jwtToken}`);

    const payload: any = { 
      title : newnotification["title"] ,
      content : newnotification["content"] 
    }

    return lastValueFrom(
      this.http.post<any>(POSTURL,payload, {headers})
    )
    
  }

  getNotification(){
    const GETURL = APIURL + "/notification"

    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set("Authorization", `Bearer ${jwtToken}`);

    return lastValueFrom(
      this.http.get<any>(GETURL, {headers})
    )
    
  }

  clearNotification(){
    const DELETEURL = APIURL + "/deletenotification"
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set("Authorization", `Bearer ${jwtToken}`);
    return lastValueFrom(
      this.http.delete<any>(DELETEURL, {headers})
      .pipe(
        map((v:any)=>{
          const status = v['status'] as string
          return status
        })
      )
    )
    
  }

  
}
