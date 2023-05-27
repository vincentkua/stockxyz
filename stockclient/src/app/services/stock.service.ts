import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { Stock } from '../models/models';

const URL = "http://localhost:8080/api/stocks"


@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http:HttpClient) { }


  getStocks(searchstring : string) : Promise<any>{
    const params = new HttpParams().set("search", searchstring)
    return lastValueFrom(
      this.http.get<any>(URL, { params })
      .pipe(
        map((v:any)=>{
          const stocks = v['stocks'] as Stock[]
          return stocks
        })
      )
    )
  }

  addStocks(stock : Stock) {
    const payload: any = { stock }
    return lastValueFrom(
      this.http.post<any>(URL, payload)
    )
  }



}
