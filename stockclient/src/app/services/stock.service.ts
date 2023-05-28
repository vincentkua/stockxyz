import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { Stock } from '../models/models';

const URL = "http://localhost:8080/api"


@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http:HttpClient) { }


  getStocks(searchstring : string) : Promise<any>{
    const GETSTOCKSURL = URL + "/stocks"
    const params = new HttpParams().set("search", searchstring)
    return lastValueFrom(
      this.http.get<any>(GETSTOCKSURL, { params })
      .pipe(
        map((v:any)=>{
          const stocks = v['stocks'] as Stock[]
          return stocks
        })
      )
    )
  }

  getStock(market:string , ticker:string) : Promise<any>{
    const GETSTOCKURL = URL + "/stock"
    const params = new HttpParams()
    .set("market", market)
    .set("ticker", ticker)

    return lastValueFrom(
      this.http.get<any>(GETSTOCKURL, { params })
    )

  }

  addStocks(stock : Stock) : Promise<any> {
    const ADDSTOCKURL = URL + "/stocks"
    const payload: any = { stock }
    return lastValueFrom(
      this.http.post<any>(ADDSTOCKURL, payload)
      .pipe(
        map((v:any)=>{
          const status = v['status'] as string
          return status
        })
      )
    )
  }


  updateStock(stock : Stock) : Promise<any> {
    const UPDATESTOCKURL = URL + "/update"
    const payload: any = { stock }
    return lastValueFrom(
      this.http.post<any>(UPDATESTOCKURL, payload)
      .pipe(
        map((v:any)=>{
          const status = v['status'] as string
          return status
        })
      )
    )
  }



}
