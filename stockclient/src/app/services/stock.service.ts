import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { Stock } from '../models/models';

// const URL = "http://127.0.0.1:8080/api"
// const URL = "https://stockxyz-production.up.railway.app/api"
const URL = "/api"


@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http:HttpClient) { }


  getStocks(searchstring: string): Promise<any> {
    const GETSTOCKSURL = URL + "/stocks";
    const params = new HttpParams()
      .set("search", searchstring);
  
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set("Authorization", `Bearer ${jwtToken}`);
  
    return lastValueFrom(
      this.http.get<any>(GETSTOCKSURL, { params, headers }).pipe(
        map((v: any) => {
          const stocks = v['stocks'] as Stock[];
          return stocks;
        })
      )
    );
  }

  getWatchlist(searchstring : string ) : Promise<any>{
    const GETSTOCKSURL = URL + "/watchlist"
    const params = new HttpParams()
    .set("search", searchstring)

    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set("Authorization", `Bearer ${jwtToken}`);

    return lastValueFrom(
      this.http.get<any>(GETSTOCKSURL, { params , headers  })
      .pipe(
        map((v:any)=>{
          const stocks = v['stocks'] as Stock[]
          return stocks
        })
      )
    )
  }

  getPortfolio(searchstring : string ) : Promise<any>{
    const GETSTOCKSURL = URL + "/portfolio"
    const params = new HttpParams()
    .set("search", searchstring)
  
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set("Authorization", `Bearer ${jwtToken}`);

    return lastValueFrom(
      this.http.get<any>(GETSTOCKSURL, { params ,headers })
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
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set("Authorization", `Bearer ${jwtToken}`);
    const payload: any = { 
      market : market ,
      ticker : ticker ,
      pricechartlabel : pricechartlabel,
      pricechartdata: pricechartdata  
    }

    return lastValueFrom(
      this.http.post<any>(POSTPRICECHARTURL,payload , {headers})
    )
  }  

  updateEarningChart(market:string , ticker:string , label : string , revenue : string , grossprofit : string  , netprofit : string  ) : Promise<any>{
    const POSTEARNINGCHARTURL = URL + "/earningchart"

    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set("Authorization", `Bearer ${jwtToken}`);

    const payload: any = { 
      market : market ,
      ticker : ticker ,
      label : label,
      revenue: revenue ,
      grossprofit : grossprofit ,
      netprofit : netprofit
    }

    return lastValueFrom(
      this.http.post<any>(POSTEARNINGCHARTURL,payload ,{headers})
    )
  }  

  updateBalanceChart(market:string , ticker:string , label : string , asset : string , liability : string  , debt : string  ) : Promise<any>{
    const POSTURL = URL + "/balancechart"

    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set("Authorization", `Bearer ${jwtToken}`);

    const payload: any = { 
      market : market ,
      ticker : ticker ,
      label : label,
      asset: asset ,
      liability : liability ,
      debt : debt
    }

    return lastValueFrom(
      this.http.post<any>(POSTURL,payload , {headers})
    )
  }  

  updateEpsDpsChart(market:string , ticker:string , label : string , eps : string , dps : string   ) : Promise<any>{
    const POSTURL = URL + "/epsdpschart"
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set("Authorization", `Bearer ${jwtToken}`);

    const payload: any = { 
      market : market ,
      ticker : ticker ,
      label : label,
      eps: eps ,
      dps : dps 
    }
    return lastValueFrom(
      this.http.post<any>(POSTURL,payload , {headers})
    )
  }  

  updateCashflowChart(market:string , ticker:string , label : string , operating : string , investing : string , financing : string  ) : Promise<any>{
    const POSTURL = URL + "/cashflowchart"
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set("Authorization", `Bearer ${jwtToken}`);

    const payload: any = { 
      market : market ,
      ticker : ticker ,
      label : label,
      operating: operating ,
      investing : investing ,
      financing : financing  
    }
    return lastValueFrom(
      this.http.post<any>(POSTURL,payload , {headers})
    )
  }  

  addStocks(stock : Stock) : Promise<any> {
    const ADDSTOCKURL = URL + "/stocks"
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set("Authorization", `Bearer ${jwtToken}`);
    const payload: any = { stock }
    return lastValueFrom(
      this.http.post<any>(ADDSTOCKURL, payload, {headers})
      .pipe(
        map((v:any)=>{
          const status = v['status'] as string
          return status
        })
      )
    )
  }

  addWatchlist(stockid : number) : Promise<any> {
    const ADDURL = URL + "/addwatchlist"
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set("Authorization", `Bearer ${jwtToken}`);
    const payload: any = { 
      stockid : stockid
    }
    return lastValueFrom(
      this.http.post<any>(ADDURL, payload , { headers: headers })
    )
  }

  addPortfolio(stockid : number ) : Promise<any> {
    const ADDURL = URL + "/addportfolio"
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set("Authorization", `Bearer ${jwtToken}`);
    const payload: any = { 
      stockid : stockid
    }
    return lastValueFrom(
      this.http.post<any>(ADDURL, payload , { headers: headers })
    )
  }

  removeWatchlist(watchlistid : number , email : string) : Promise<any> {
    const REMOVEURL = URL + "/removewatchlist"
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set("Authorization", `Bearer ${jwtToken}`);
    const payload: any = { 
      watchlistid : watchlistid 
    }
    return lastValueFrom(
      this.http.post<any>(REMOVEURL, payload , {headers : headers})
    )
  }

  removePortfolio(portfolioid : number ) : Promise<any> {
    const REMOVEURL = URL + "/removeportfolio"
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set("Authorization", `Bearer ${jwtToken}`);

    const payload: any = { 
      portfolioid : portfolioid 
    }
    return lastValueFrom(
      this.http.post<any>(REMOVEURL, payload , {headers : headers})
    )
  }

  deleteStock(id : number ){
    const DELETEURL = URL + "/delete/" + id 
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set("Authorization", `Bearer ${jwtToken}`);
    return lastValueFrom(
      this.http.delete<any>(DELETEURL, {headers : headers})
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
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set("Authorization", `Bearer ${jwtToken}`);
    const payload: any = { stock }
    return lastValueFrom(
      this.http.post<any>(UPDATESTOCKURL, payload, {headers : headers})
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
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set("Authorization", `Bearer ${jwtToken}`);
    const params = new HttpParams()
    .set("market", market)
    .set("ticker", ticker)

    return lastValueFrom(
      this.http.get<any>(GETSTOCKAPIURL, { params ,headers })
      .pipe(
        map((v:any)=>{
          const status = v['status'] as string
          return status
        })
      )
    )

  }


}
