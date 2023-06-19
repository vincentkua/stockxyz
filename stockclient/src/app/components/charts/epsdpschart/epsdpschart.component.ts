import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-epsdpschart',
  templateUrl: './epsdpschart.component.html',
  styleUrls: ['./epsdpschart.component.css']
})
export class EpsdpschartComponent implements AfterViewInit{

  chartlabel : string[] = []
  charteps : number[] = []
  chartdps: number[] = []

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
        display: true   
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
      { data: [], label: 'EPS'},
      { data: [], label: 'DPS'}
    ]
  };

  ngAfterViewInit(): void {
    this.stockSvc.getEpsDpsChartdata(this.market , this.ticker)
    .then(v => {
      console.log('>>> EPS/DPS Chart : ', v)
      this.chartlabel = v['chartlabel']
      this.charteps = v['charteps']
      this.chartdps = v['chartdps']
      this.ChartData.labels = this.chartlabel;
      this.ChartData.datasets[0].data = this.charteps;
      this.ChartData.datasets[1].data = this.chartdps;
      this.chart?.update();
    }).catch(err => {
      console.error('>>> error: ', err)
      // alert("Price Chart Data Not Found...")
    })
  }



}

