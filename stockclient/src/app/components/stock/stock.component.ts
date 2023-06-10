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
  earningchartform !:FormGroup
  balancechartform !:FormGroup
  stock !: Stock
  market : string = ""
  ticker : string = ""
  pricechartmode : string = "default"
  earningchartmode : string = "default"
  balancechartmode : string = "default"


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

      this.earningchartform= this.fb.group({
        earninglabel : this.fb.control<string>("" , Validators.required),
        revenuedata : this.fb.control<string>("",Validators.required),
        grossprofitdata : this.fb.control<string>("",Validators.required),
        netprofitdata : this.fb.control<string>("",Validators.required),
      })

      this.balancechartform= this.fb.group({
        balancelabel : this.fb.control<string>("" , Validators.required),
        assetdata : this.fb.control<string>("",Validators.required),
        liabilitydata : this.fb.control<string>("",Validators.required),
        debtdata : this.fb.control<string>("",Validators.required),
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

  toggleearningchartmode(mode : string){
    this.earningchartmode = mode
  }

  togglebalancechartmode(mode : string){
    this.balancechartmode = mode
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

  updateEarningChartData(){
    const earninglabel : string = this.earningchartform.value["earninglabel"]
    const revenuedata : string = this.earningchartform.value["revenuedata"]
    const grossprofitdata : string = this.earningchartform.value["grossprofitdata"]
    const netprofitdata : string = this.earningchartform.value["netprofitdata"]

    this.stockSvc.updateEarningChart(this.market , this.ticker , earninglabel , revenuedata , grossprofitdata , netprofitdata)
    .then(v => {
      console.info('resolved: ', v)
      this.toggleearningchartmode("default");
    }).catch(err => {
      console.error('>>> error: ', err)
      alert("Failed to update Price Chart !!!")
    })
  }

  updateBalanceChartData(){
    const balancelabel : string = this.balancechartform.value["balancelabel"]
    const assetdata : string = this.balancechartform.value["assetdata"]
    const liabilitydata : string = this.balancechartform.value["liabilitydata"]
    const debtdata : string = this.balancechartform.value["debtdata"]

    this.stockSvc.updateBalanceChart(this.market , this.ticker , balancelabel , assetdata , liabilitydata , debtdata)
    .then(v => {
      console.info('resolved: ', v)
      this.togglebalancechartmode("default");
    }).catch(err => {
      console.error('>>> error: ', err)
      alert("Failed to update Balance Chart !!!")
    })
  }



}
