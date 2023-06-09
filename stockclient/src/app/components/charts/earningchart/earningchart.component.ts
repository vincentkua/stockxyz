import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-earningchart',
  templateUrl: './earningchart.component.html',
  styleUrls: ['./earningchart.component.css']
})
export class EarningchartComponent implements AfterViewInit{

  chartlabel : string[] = []
  chartrevenue : number[] = []
  chartgrossprofit: number[] = []
  chartnetprofit : number[] = []

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
      { data: [], label: 'Revenue'  },
      { data: [], label: 'Gross Profit'},
      { data: [], label: 'Net Profit'}
    ]
  };

  ngAfterViewInit(): void {
    // Get Price Chart Data
    this.stockSvc.getEarningChartdata(this.market , this.ticker)
    .then(v => {
      console.log('>>> Resolved: ', v)
      console.info('chartlabel: ', v['chartlabel'])
      console.info('chartrevenue: ', v['chartrevenue'])
      console.info('chartgrossprofit: ', v['chartgrossprofit'])
      console.info('chartnetprofit: ', v['chartnetprofit'])
      this.chartlabel = v['chartlabel']
      this.chartrevenue = v['chartrevenue']
      this.chartgrossprofit = v['chartgrossprofit']
      this.chartnetprofit = v['chartnetprofit']
      this.ChartData.labels = this.chartlabel;
      this.ChartData.datasets[0].data = this.chartrevenue;
      this.ChartData.datasets[1].data = this.chartgrossprofit;
      this.ChartData.datasets[2].data = this.chartnetprofit;
      this.chart?.update();
    }).catch(err => {
      console.error('>>> error: ', err)
      // alert("Price Chart Data Not Found...")
    })
  }



}
