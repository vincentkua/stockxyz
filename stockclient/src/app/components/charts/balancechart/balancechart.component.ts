import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-balancechart',
  templateUrl: './balancechart.component.html',
  styleUrls: ['./balancechart.component.css']
})
export class BalancechartComponent implements AfterViewInit{

  chartlabel : string[] = []
  chartasset : number[] = []
  chartliability: number[] = []
  chartdebt : number[] = []

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
      }
    },
    
    plugins: {
      
      tooltip:{
        position:"average"
      },
      legend: {
        display: true,
      },
      datalabels: {
        display: true,
        anchor: 'end',
        align: 'end'
      }
    }
  };

  ChartPlugins = [
    DataLabelsPlugin
  ];

  ChartData: ChartData<'line'>= {
    labels: [],
    datasets: [
      { data: [], label: 'Asset'  },
      { data: [], label: 'Liability'},
      { data: [], label: 'Debt'}
    ]
  };

  ngAfterViewInit(): void {
    this.stockSvc.getBalanceChartdata(this.market , this.ticker)
    .then(v => {
      console.log('>>> Balance Chart : ', v)
      this.chartlabel = v['chartlabel']
      this.chartasset = v['chartasset']
      this.chartliability = v['chartliability']
      this.chartdebt = v['chartdebt']
      this.ChartData.labels = this.chartlabel;
      this.ChartData.datasets[0].data = this.chartasset;
      this.ChartData.datasets[1].data = this.chartliability;
      this.ChartData.datasets[2].data = this.chartdebt;
      this.chart?.update();
    }).catch(err => {
      console.error('>>> error: ', err)
      // alert("Price Chart Data Not Found...")
    })
  }



}
