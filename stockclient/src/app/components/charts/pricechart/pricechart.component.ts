import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-pricechart',
  templateUrl: './pricechart.component.html',
  styleUrls: ['./pricechart.component.css']
})
export class PricechartComponent implements AfterViewInit{

  pricechartlabels : string[] = []
  pricechartdata : number[] = []

  @Input()
  market : string = ""

  @Input()
  ticker : string = ""

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;


  constructor(private stockSvc:StockService){}

  ChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio:false,
    scales: {
      x: {},
      y: {
        position:'right'
        // min: 0 ,
        // max : 200
      }
    },
    
    plugins: {
      
      tooltip:{
        position:"average"
      },
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
        anchor: 'end',
        align: 'end'
      }
    }
  };

  ChartPlugins = [
    DataLabelsPlugin
  ];

  ChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      { data:[], label: 'Price' , fill : true , borderColor: "#084de0" , pointBorderColor:"#084de0", pointBackgroundColor:"#084de0", backgroundColor:"rgb(10,10,200,0.5)"  },
      // { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' , fill : true}
    ]
  };

  ngAfterViewInit(): void {
    // Get Price Chart Data
    this.stockSvc.getPriceChartdata(this.market , this.ticker)
    .then(v => {
      console.info('labels: ', v['labels'])
      console.info('pricedata: ', v['pricedata'])
      this.pricechartlabels = v['labels']
      this.pricechartdata = v['pricedata']
      this.ChartData.labels = this.pricechartlabels;
      this.ChartData.datasets[0].data = this.pricechartdata;
      this.chart?.update();
    }).catch(err => {
      console.error('>>> error: ', err)
    })
  }

    // randomize(): void {
  //   this.ChartData.labels = ["6/3/2023","7/3/2023","8/3/2023","9/3/2023","10/3/2023"];
  //   this.ChartData.datasets[0].data = [
  //     Math.round(Math.random() * 100),
  //     Math.round(Math.random() * 100),
  //     Math.round(Math.random() * 100),
  //     Math.round(Math.random() * 100),
  //     Math.round(Math.random() * 100)];
  //   this.chart?.update();
  // }


}
