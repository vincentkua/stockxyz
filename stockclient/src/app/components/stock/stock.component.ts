import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Stock } from 'src/app/models/models';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})

export class StockComponent implements OnInit , AfterViewInit {
  pricechartform !:FormGroup

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


  constructor(private activatedRoute : ActivatedRoute , private stockSvc : StockService , private router: Router , private fb:FormBuilder){}


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

      this.pricechartform= this.fb.group({
        pricelabel : this.fb.control<string>("" , Validators.required),
        pricedata : this.fb.control<string>("",Validators.required),
      })
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
  
  togglepricechartmode(mode : string){
    this.pricechartmode = mode
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
      alert(v)
      this.getFundamental()
    }).catch(err => {
      console.error('>>> error: ', err)
      alert("Failed to get fundamental data api")
    })
  }

  priceApi(){
    this.stockSvc.getPriceApi(this.market , this.ticker)
    .then(v => {
      console.info('resolved: ', v)
      this.getFundamental()
    }).catch(err => {
      console.error('>>> error: ', err)
      alert("Failed to get price api")
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

  updatePriceChartData(){
    const pricelabel : string = this.pricechartform.value["pricelabel"]
    const pricedata : string = this.pricechartform.value["pricedata"]

    this.stockSvc.updatePriceChart(this.market , this.ticker , pricelabel , pricedata)
    .then(v => {
      console.info('resolved: ', v)
      this.togglepricechartmode("default");
    }).catch(err => {
      console.error('>>> error: ', err)
      alert("Failed to update the Chart !!!")
    })
  }



}
