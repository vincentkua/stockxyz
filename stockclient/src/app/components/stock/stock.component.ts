import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Stock } from 'src/app/models/models';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  stock : Stock = {
    id: 0,
    market: '',
    ticker: '',
    stockName: '',
    lastprice: 0,
    epslyr: 0,
    epsttm: 0,
    pelyr: 0,
    pettm: 0,
    dps: 0,
    divyield: 0,
    pb: 0
  }
  market : string = ""
  ticker : string = ""


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



}
