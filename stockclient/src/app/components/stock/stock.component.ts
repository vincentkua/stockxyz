import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  market : string = ""
  ticker : string = ""

  constructor(private activatedRoute : ActivatedRoute){}


  ngOnInit(): void {
      this.activatedRoute.params.subscribe(
        (params)=>{
          const marketticker = params['ticker']
          const [market, ticker] = marketticker.split(':');
          this.market = market
          this.ticker = ticker

        }
      )
  }

}
