import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

const APIURL = "http://127.0.0.1:8080/api"
// const APIURL = "https://stockxyz-production.up.railway.app/api"
// const APIURL = "/api"

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
}
