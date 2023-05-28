import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Stock } from 'src/app/models/models';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  market : string = ""
  ticker : string = ""
  stockName : string = "xxx"
  lastprice : number = 0

  constructor(private activatedRoute : ActivatedRoute , private stockSvc : StockService){}


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
      const stock : Stock = v;
      this.stockName = stock.stockName
      this.lastprice = stock.lastprice
    }).catch(err => {
      console.error('>>> error: ', err)
    })


  }

}
