import { AfterViewInit, Component, Input } from '@angular/core';
declare const TradingView: any; //For Trading View Module

@Component({
  selector: 'app-tradingview',
  templateUrl: './tradingview.component.html',
  styleUrls: ['./tradingview.component.css']
})
export class TradingviewComponent implements AfterViewInit {

  @Input()
  market : string = "NASDAQ"

  @Input()
  ticker : string = "AAPL"


  ngAfterViewInit(): void {
      new TradingView.widget(
        {
        "autosize": true,
        "symbol": this.market + ":" + this.ticker,
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "light",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "hide_top_toolbar": true,
        "hide_legend": false,
        "save_image": false,
        "container_id": "tradingview_7ada9"
      }
        );
  }


}
