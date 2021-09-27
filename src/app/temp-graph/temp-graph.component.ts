import {Component, OnInit, ViewChild} from '@angular/core';
import {
  Chart,
  BarElement,
  BarController,
  CategoryScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
  PolarAreaController,
  RadialLinearScale,
  ArcElement,
  RadarController
} from "chart.js";
import {async, Subject} from "rxjs";
declare var $:  any;

@Component({
  selector: 'app-temp-graph',
  templateUrl: './temp-graph.component.html',
  styleUrls: ['./temp-graph.component.scss']
})
export class TempGraphComponent implements OnInit {
  @ViewChild('chart') chart: any;

  asyncData: Subject<any> = new Subject<any>();
  asyncData$ = this.asyncData.asObservable();

  bars!: any;
  colorArray: any;
  constructor() { }

  ngOnInit(): void {

  }

  ionViewWillEnter() {
    this.createBarChart()
    this.gettingAsyncConnection();
  }


  private createBarChart() {
    Chart.register(BarElement, BarController, CategoryScale, RadarController, LineController, PolarAreaController, RadialLinearScale, ArcElement, Decimation, Filler, Legend, Title, Tooltip, LinearScale, LineElement, LineController, PointElement);
    this.bars = new Chart(this.chart.nativeElement, {
      type: 'line',
      data: {
        labels: ['Red','Blue', 'Green'],
        datasets: [{
          label: 'Temperature in Celsius',
          backgroundColor: '#ddee44', // array should have same number of elements as number of dataset
          borderColor: '#ddee44',// array should have same number of elements as number of dataset
          data: [1,0.70,0.25],
          fill: 'origin',
         borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      }
    });
  }

  click(){
    this.asyncData.next({
      date: new Date().toDateString(),
      temp: Math.random()
    });
  }

  addDataToChart(data: any,label: string){

    this.bars.config._config.data.labels.push(label);
    this.bars.config._config.data.datasets[0].data.push(data);
    this.bars.update();
  }

  gettingAsyncConnection(){
    this.asyncData$.subscribe(resp => this.addDataToChart(resp.temp, resp.date));
  }
}
