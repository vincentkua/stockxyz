import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { Stock } from '../models/models';

const URL = "http://127.0.0.1:8080/api"


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

  getPriceChartdata(market:string , ticker:string) : Promise<any>{
    const GETPRICECHARTURL = URL + "/pricechart"
    const params = new HttpParams()
    .set("market", market)
    .set("ticker", ticker)

    return lastValueFrom(
      this.http.get<any>(GETPRICECHARTURL, { params })
    )
  }

  getEarningChartdata(market:string , ticker:string) : Promise<any>{
    const GETEARNINGCHARTURL = URL + "/earningchart"
    const params = new HttpParams()
    .set("market", market)
    .set("ticker", ticker)

    return lastValueFrom(
      this.http.get<any>(GETEARNINGCHARTURL, { params })
    )
  }

  getBalanceChartdata(market:string , ticker:string) : Promise<any>{
    const GETBALANCECHARTURL = URL + "/balancechart"
    const params = new HttpParams()
    .set("market", market)
    .set("ticker", ticker)

    return lastValueFrom(
      this.http.get<any>(GETBALANCECHARTURL, { params })
    )
  }

  getEpsDpsChartdata(market:string , ticker:string) : Promise<any>{
    const GETBALANCECHARTURL = URL + "/epsdpschart"
    const params = new HttpParams()
    .set("market", market)
    .set("ticker", ticker)

    return lastValueFrom(
      this.http.get<any>(GETBALANCECHARTURL, { params })
    )
  }

  getCashflowChartdata(market:string , ticker:string) : Promise<any>{
    const GETCASHFLOWURL = URL + "/cashflowchart"
    const params = new HttpParams()
    .set("market", market)
    .set("ticker", ticker)

    return lastValueFrom(
      this.http.get<any>(GETCASHFLOWURL, { params })
    )
  }

  updatePriceChart(market:string , ticker:string , pricechartlabel : string , pricechartdata : string ) : Promise<any>{
    const POSTPRICECHARTURL = URL + "/pricechart"

    const payload: any = { 
      market : market ,
      ticker : ticker ,
      pricechartlabel : pricechartlabel,
      pricechartdata: pricechartdata  
    }

    return lastValueFrom(
      this.http.post<any>(POSTPRICECHARTURL,payload)
    )
  }  

  updateEarningChart(market:string , ticker:string , label : string , revenue : string , grossprofit : string  , netprofit : string  ) : Promise<any>{
    const POSTEARNINGCHARTURL = URL + "/earningchart"

    const payload: any = { 
      market : market ,
      ticker : ticker ,
      label : label,
      revenue: revenue ,
      grossprofit : grossprofit ,
      netprofit : netprofit
    }

    return lastValueFrom(
      this.http.post<any>(POSTEARNINGCHARTURL,payload)
    )
  }  

  updateBalanceChart(market:string , ticker:string , label : string , asset : string , liability : string  , debt : string  ) : Promise<any>{
    const POSTURL = URL + "/balancechart"

    const payload: any = { 
      market : market ,
      ticker : ticker ,
      label : label,
      asset: asset ,
      liability : liability ,
      debt : debt
    }

    return lastValueFrom(
      this.http.post<any>(POSTURL,payload)
    )
  }  

  updateEpsDpsChart(market:string , ticker:string , label : string , eps : string , dps : string   ) : Promise<any>{
    const POSTURL = URL + "/epsdpschart"

    const payload: any = { 
      market : market ,
      ticker : ticker ,
      label : label,
      eps: eps ,
      dps : dps 
    }
    return lastValueFrom(
      this.http.post<any>(POSTURL,payload)
    )
  }  

  updateCashflowChart(market:string , ticker:string , label : string , operating : string , investing : string , financing : string  ) : Promise<any>{
    const POSTURL = URL + "/cashflowchart"

    const payload: any = { 
      market : market ,
      ticker : ticker ,
      label : label,
      operating: operating ,
      investing : investing ,
      financing : financing  
    }
    return lastValueFrom(
      this.http.post<any>(POSTURL,payload)
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

  deleteStock(id : number ){
    const DELETEURL = URL + "/delete/" + id 
    return lastValueFrom(
      this.http.post<any>(DELETEURL,null)
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

  getFundamentalApi(market:string , ticker:string) : Promise<any>{
    const GETSTOCKAPIURL = URL + "/fundamentalapi"
    const params = new HttpParams()
    .set("market", market)
    .set("ticker", ticker)

    return lastValueFrom(
      this.http.get<any>(GETSTOCKAPIURL, { params })
      .pipe(
        map((v:any)=>{
          const status = v['status'] as string
          return status
        })
      )
    )

  }

  getPriceApi(market:string , ticker:string){
    const GETSTOCKAPIURL = URL + "/priceapi"
    const params = new HttpParams()
    .set("market", market)
    .set("ticker", ticker)

    return lastValueFrom(
      this.http.get<any>(GETSTOCKAPIURL, { params })
    )
  }

  getByWebScraper(market:string , ticker:string){
    const GETSTOCKAPIURL = URL + "/webscraper"
    const params = new HttpParams()
    .set("market", market)
    .set("ticker", ticker)

    return lastValueFrom(
      this.http.get<any>(GETSTOCKAPIURL, { params })
    )
  }



}
