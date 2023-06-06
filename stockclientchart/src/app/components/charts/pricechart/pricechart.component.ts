import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-pricechart',
  templateUrl: './pricechart.component.html',
  styleUrls: ['./pricechart.component.css']
})
export class PricechartComponent {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

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

  ChartType: ChartType = 'line';

  ChartPlugins = [
    DataLabelsPlugin
  ];

  ChartData: ChartData<'line'> = {
    labels: [ "6/3/2023","7/3/2023","8/3/2023","9/3/2023","10/3/2023","13/3/2023","14/3/2023","15/3/2023","16/3/2023","17/3/2023","20/3/2023","21/3/2023","22/3/2023","23/3/2023","24/3/2023","27/3/2023","28/3/2023","29/3/2023","30/3/2023","31/3/2023","3/4/2023","4/4/2023","5/4/2023","6/4/2023","10/4/2023","11/4/2023","12/4/2023","13/4/2023","14/4/2023","17/4/2023","18/4/2023","19/4/2023","20/4/2023","21/4/2023","24/4/2023","25/4/2023","26/4/2023","27/4/2023","28/4/2023","1/5/2023","2/5/2023","3/5/2023","4/5/2023","5/5/2023","8/5/2023","9/5/2023","10/5/2023","11/5/2023","12/5/2023","15/5/2023","16/5/2023","17/5/2023","18/5/2023","19/5/2023","22/5/2023","23/5/2023","24/5/2023","25/5/2023","26/5/2023","30/5/2023","31/5/2023","1/6/2023","2/6/2023","5/6/2023" ],
    datasets: [
      { data: [ 153.830002,151.600006,152.869995,150.589996,148.5,150.470001,152.589996,152.990005,155.850006,155,157.399994,159.279999,157.830002,158.929993,160.25,158.279999,157.649994,160.770004,162.360001,164.899994,166.169998,165.630005,163.759995,164.660004,162.029999,160.800003,160.100006,165.559998,165.210007,165.229996,166.470001,167.630005,166.649994,165.020004,165.330002,163.770004,163.759995,168.410004,169.679993,169.589996,168.539993,167.449997,165.789993,173.570007,173.5,171.770004,173.559998,173.75,172.570007,172.070007,172.070007,172.690002,175.050003,175.160004,174.199997,171.559998,171.839996,172.990005,175.429993,177.300003,177.25,180.089996,180.949997,179.580002 ], label: 'Price' , fill : true , borderColor: "#084de0" , pointBorderColor:"#084de0", pointBackgroundColor:"#084de0", backgroundColor:"rgb(10,10,200,0.5)"  },
      // { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' , fill : true},
      // { data: [ 66, 77, 88, 99, 77, 66, 22 ], label: 'Series C' , fill : true}
    ]
  };

  // chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  //   console.log(event, active);
  // }

  // chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  //   console.log(event, active);
  // }

  randomize(): void {
    this.ChartData.labels = ["6/3/2023","7/3/2023","8/3/2023","9/3/2023","10/3/2023"];
    this.ChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100)];
    this.chart?.update();
  }


}
