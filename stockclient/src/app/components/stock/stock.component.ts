import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Stock } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})

export class StockComponent implements OnInit , AfterViewInit {
  email : string = ""
  roles : string = ""
  rootpage : string = ""
  validated : boolean = false

  pricechartform !:FormGroup
  earningchartform !:FormGroup
  balancechartform !:FormGroup
  epsdpschartform !:FormGroup
  cashflowchartform !:FormGroup
  stock !: Stock
  market : string = ""
  ticker : string = ""
  pricechartmode : string = "default"
  earningchartmode : string = "default"
  balancechartmode : string = "default"
  epsdpschartmode : string = "default"
  cashflowchartmode : string = "default"


  constructor(private activatedRoute : ActivatedRoute , private stockSvc : StockService , private router: Router , private fb:FormBuilder , private authSvc : AuthService){}

  ngOnInit(): void {
    this.checkAndValidateToken();
    this.getUserRootPage();
  }

  getUserRootPage(){
    const rootpage = localStorage.getItem('rootpage');
    if (rootpage == null){
      this.rootpage = "all"
    }else{
      this.rootpage = rootpage
    }
  }

  checkAndValidateToken(): void {
    const token = localStorage.getItem('jwtToken');


    if (token) {
      console.log('>>> Validating JWT Token...');
      this.authSvc
        .validateJWT(token)
        .then(() => {
          console.log('>>> JWT Token verified... Getting Email and role....');
          this.parseAndProcessToken(token);
        })
        .catch((err) => {
          console.log('>>> Error :', err);
          alert(err.error.status);
          this.handleInvalidToken();
        });
    } else {
      this.handleMissingToken();
    }
  }

  parseAndProcessToken(token: string): void {
    this.authSvc
      .parseJWT(token)
      .then((result) => {
        console.log('>>> ', result);
        this.email = result.email;
        this.roles = result.role;
        this.validated = true;
        this.loadalldata();
      })
      .catch((err) => {
        console.log('>>> Error:', err);
        this.handleInvalidToken();
      });
  }

  handleInvalidToken(): void {
    localStorage.removeItem('jwtToken');
    alert('Invalid JWT ... Rerouting to Login Page...');
    this.router.navigate(['/login']);
  }

  handleMissingToken(): void {
    alert('JWT not found ... Rerouting to Login Page...');
    this.router.navigate(['/login']);
  }

  loadalldata(){
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

    this.epsdpschartform= this.fb.group({
      epsdpslabel : this.fb.control<string>("" , Validators.required),
      epsdata : this.fb.control<string>("",Validators.required),
      dpsdata : this.fb.control<string>("",Validators.required),
    })

    this.cashflowchartform= this.fb.group({
      cashflowlabel : this.fb.control<string>("" , Validators.required),
      operatingdata : this.fb.control<string>("",Validators.required),
      investingdata : this.fb.control<string>("",Validators.required),
      financingdata : this.fb.control<string>("",Validators.required),
    })
  }
  
  ngAfterViewInit(): void {
    
  }

  getFundamental(){
    this.stockSvc.getStock(this.market , this.ticker)
    .then(v => {
      console.info('>>> Stock Fundamental : ', v)
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
    if(this.pricechartmode == "edit"){

      this.stockSvc.getPriceChartdata(this.market , this.ticker)
      .then(v => {
        console.log('>>> Price Chart : ', v)
        const labels = v['pricechartlabel']
        const prices = v['pricechartdata']
        const labelsstring : string  = labels.join(' ');
        const pricesstring : string  = prices.join(' ');

        this.pricechartform= this.fb.group({
          pricelabel : this.fb.control<string>(labelsstring , Validators.required),
          pricedata : this.fb.control<string>(pricesstring,Validators.required),
        })
      }).catch(err => {
        console.error('>>> error: ', err)
      })
    }
  }

  toggleearningchartmode(mode : string){
    this.earningchartmode = mode

    if(this.earningchartmode == "edit"){

      this.stockSvc.getEarningChartdata(this.market , this.ticker)
      .then(v => {
        console.log('>>> Earning Chart : ', v)
        const labels = v['chartlabel'].join(' ');
        const revenues = v['chartrevenue'].join(' ');
        const chartgrossprofits = v['chartgrossprofit'].join(' ');
        const chartnetprofits = v['chartnetprofit'].join(' ');

        this.earningchartform= this.fb.group({
          earninglabel : this.fb.control<string>(labels , Validators.required),
          revenuedata : this.fb.control<string>(revenues,Validators.required),
          grossprofitdata : this.fb.control<string>(chartgrossprofits,Validators.required),
          netprofitdata : this.fb.control<string>(chartnetprofits,Validators.required),
        })
      }).catch(err => {
        console.error('>>> error: ', err)
      })
    }
  }

  togglebalancechartmode(mode : string){
    this.balancechartmode = mode

    if(this.balancechartmode == "edit"){

      this.stockSvc.getBalanceChartdata(this.market , this.ticker)
      .then(v => {
        console.log('>>> Balance Chart : ', v)
        const chartlabel = v['chartlabel'].join(' ');
        const chartasset = v['chartasset'].join(' ');
        const chartliability = v['chartliability'].join(' ');
        const chartdebt = v['chartdebt'].join(' ');

        this.balancechartform= this.fb.group({
          balancelabel : this.fb.control<string>(chartlabel , Validators.required),
          assetdata : this.fb.control<string>(chartasset,Validators.required),
          liabilitydata : this.fb.control<string>(chartliability,Validators.required),
          debtdata : this.fb.control<string>(chartdebt,Validators.required),
        })
      }).catch(err => {
        console.error('>>> error: ', err)
      })
    }

  }

  toggleepsdpschartmode(mode : string){
    this.epsdpschartmode = mode

    if(this.epsdpschartmode == "edit"){

      this.stockSvc.getEpsDpsChartdata(this.market , this.ticker)
      .then(v => {
        console.log('>>> EPSDPS Chart : ', v)
        const chartlabel = v['chartlabel'].join(' ');
        const charteps = v['charteps'].join(' ');
        const chartdps = v['chartdps'].join(' ');

        this.epsdpschartform= this.fb.group({
          epsdpslabel : this.fb.control<string>(chartlabel , Validators.required),
          epsdata : this.fb.control<string>(charteps,Validators.required),
          dpsdata : this.fb.control<string>(chartdps,Validators.required),
        })
      }).catch(err => {
        console.error('>>> error: ', err)
      })
    }
  }

  togglecashflowchartmode(mode : string){
    this.cashflowchartmode = mode

    if(this.cashflowchartmode == "edit"){

      this.stockSvc.getCashflowChartdata(this.market , this.ticker)
      .then(v => {
        console.log('>>> Cashflow Chart : ', v)
        const chartlabel = v['chartlabel'].join(' ');
        const chartoperating = v['chartoperating'].join(' ');
        const chartinvesting = v['chartinvesting'].join(' ');
        const chartfinancing = v['chartfinancing'].join(' ');

        this.cashflowchartform= this.fb.group({
          cashflowlabel : this.fb.control<string>(chartlabel , Validators.required),
          operatingdata : this.fb.control<string>(chartoperating,Validators.required),
          investingdata : this.fb.control<string>(chartinvesting,Validators.required),
          financingdata : this.fb.control<string>(chartfinancing,Validators.required),
        })
      }).catch(err => {
        console.error('>>> error: ', err)
      })
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
      console.info('Stock: ', v)
      alert(v)
      this.getFundamental()
    }).catch(err => {
      console.error('>>> error: ', err)
      alert("Failed to get fundamental data api")
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

  updateEpsDpsChartData(){
    const epsdpslabel : string = this.epsdpschartform.value["epsdpslabel"]
    const epsdata : string = this.epsdpschartform.value["epsdata"]
    const dpsdata : string = this.epsdpschartform.value["dpsdata"]

    this.stockSvc.updateEpsDpsChart(this.market , this.ticker , epsdpslabel , epsdata , dpsdata)
    .then(v => {
      console.info('resolved: ', v)
      this.toggleepsdpschartmode("default");
    }).catch(err => {
      console.error('>>> error: ', err)
      alert("Failed to update Balance Chart !!!")
    })
  }

  updateCashflowChartData(){
    const cashflowlabel : string = this.cashflowchartform.value["cashflowlabel"]
    const operatingdata : string = this.cashflowchartform.value["operatingdata"]
    const investingdata : string = this.cashflowchartform.value["investingdata"]
    const financingdata : string = this.cashflowchartform.value["financingdata"]

    this.stockSvc.updateCashflowChart(this.market , this.ticker , cashflowlabel , operatingdata , investingdata , financingdata)
    .then(v => {
      console.info('resolved: ', v)
      this.togglecashflowchartmode("default");
    }).catch(err => {
      console.error('>>> error: ', err)
      alert("Failed to update Cash Flow Chart !!!")
    })
  }

  logout (){
    localStorage.removeItem('jwtToken') 
    this.router.navigate(['/login'])
  }



}
