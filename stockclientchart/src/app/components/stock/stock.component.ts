import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Stock } from 'src/app/models/models';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})

export class StockComponent implements OnInit , AfterViewInit {
  stock : Stock = {
    id: 0,
    market: '',
    ticker: '',
    stockName: '',
    description: '',
    lastprice: 0,
    targetprice:0,
    epsttm: 0,
    pettm: 0,
    dps: 0,
    divyield: 0,
    bookvalue : 0,
    pb: 0
  }
  market : string = ""
  ticker : string = ""
  pricechartmode : string = "default"


  constructor(private activatedRoute : ActivatedRoute , private stockSvc : StockService , private router: Router){}


  ngOnInit(): void {
      this.activatedRoute.params.subscribe(
        (params)=>{
          const marketticker = params['ticker']
          const [market, ticker] = marketticker.split(':');
          this.market = market
          this.ticker = ticker
          this.getFundamental()

        }
      )
  }
  
  ngAfterViewInit(): void {
    
  }

  getFundamental(){
    this.stockSvc.getStock(this.market , this.ticker)
    .then(v => {
      console.info('resolved: ', v)
      this.stock = v;
    }).catch(err => {
      console.error('>>> error: ', err)
    })


  }

  naveditpage(){
    this.router.navigate(['/edit/'+this.market + ":" + this.ticker])
  }

  navinvestingnote(){
    window.open("https://www.investingnote.com/stocks/" + this.market + ":" + this.ticker, "_blank");
  }

  navtradingview(){
    window.open("https://www.tradingview.com/symbols/" + this.market + "-" + this.ticker, "_blank");
  }

  navsgx(){
    window.open("https://investors.sgx.com/_security-types/stocks/" + this.ticker, "_blank");
  }

  navsgdividends(){
    window.open("https://www.dividends.sg/view/" + this.ticker, "_blank");
  }
  
  togglepricechartmode(){
    if(this.pricechartmode == "default"){
      this.pricechartmode = "tradingview"
    }else{
      this.pricechartmode = "default"
    }
  }

  navyahoofinance(){
    let path = this.ticker;
    if (!(this.market == "NASDAQ" || this.market == "NYSE")){
      if(this.market == "SGX"){path = this.ticker + ".SI"}
      if(this.market == "HKEX"){path = this.ticker + ".HK"}
    }
    window.open("https://sg.finance.yahoo.com/quote/" + path + "/key-statistics", "_blank");
  }

  fundamentalApi(){
    this.stockSvc.getFundamentalApi(this.market , this.ticker)
    .then(v => {
      console.info('resolved: ', v)
      this.getFundamental()
    }).catch(err => {
      console.error('>>> error: ', err)
    })

  }

  priceApi(){
    this.stockSvc.getPriceApi(this.market , this.ticker)
    .then(v => {
      console.info('resolved: ', v)
      this.getFundamental()
    }).catch(err => {
      console.error('>>> error: ', err)
    })

  }

  webscraper(){
    this.stockSvc.getByWebScraper(this.market , this.ticker)
    .then(v => {
      console.info('resolved: ', v)
      this.getFundamental()
    }).catch(err => {
      console.error('>>> error: ', err)
    })

  }



}
