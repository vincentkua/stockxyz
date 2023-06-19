import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-cashflowchart',
  templateUrl: './cashflowchart.component.html',
  styleUrls: ['./cashflowchart.component.css']
})
export class CashflowchartComponent implements AfterViewInit{

  chartlabel : string[] = []
  chartoperating : number[] = []
  chartinvesting: number[] = []
  chartfinancing: number[] = []

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
      
      x: {
      },
      y: {
        position:'right'
      }
    },    
    plugins: {
      
      tooltip:{
        position:"nearest" 
      },
      legend: {
        display: true,
      },
      datalabels: {
        display: false,
        anchor: 'end',
        align: 'end'
      }
    },
    interaction:{
      mode: 'index',
      axis: 'y'
  }
  };

  ChartPlugins = [
    DataLabelsPlugin
  ];

  ChartData: ChartData<'line'>= {
    labels: [],
    datasets: [
      { data: [], label: 'Operating'},
      { data: [], label: 'Investing'},
      { data: [], label: 'Financing'},
    ]
  };

  ngAfterViewInit(): void {
    this.stockSvc.getCashflowChartdata(this.market , this.ticker)
    .then(v => {
      console.log('>>> Cashflow Chart : ', v)
      this.chartlabel = v['chartlabel']
      this.chartoperating = v['chartoperating']
      this.chartinvesting = v['chartinvesting']
      this.chartfinancing = v['chartfinancing']
      this.ChartData.labels = this.chartlabel;
      this.ChartData.datasets[0].data = this.chartoperating;
      this.ChartData.datasets[1].data = this.chartinvesting;
      this.ChartData.datasets[2].data = this.chartfinancing;
      this.chart?.update();
    }).catch(err => {
      console.error('>>> error: ', err)
      // alert("Price Chart Data Not Found...")
    })
  }



}