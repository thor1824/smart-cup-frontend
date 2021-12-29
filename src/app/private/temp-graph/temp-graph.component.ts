import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Decimation,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  Title,
  Tooltip
} from "chart.js";
import {takeWhile} from "rxjs/operators";
import {TempService} from "../../services/temp.service";
import {AuthService} from "../../services/auth.service";

declare var $: any;

@Component({
  selector: 'app-temp-graph',
  templateUrl: './temp-graph.component.html',
  styleUrls: ['./temp-graph.component.scss']
})
export class TempGraphComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('chart') chart: any;
  /*
    asyncData: Subject<TempReading[]> = new Subject<TempReading>();
    asyncData$ = this.asyncData.asObservable();
  */
  bars!: any;
  colorArray: any;
  private loaded: boolean = false;
  public noDevice: boolean = false;

  constructor(
    private tempService: TempService,
    private auth: AuthService
  ) {
  }

  ngOnInit(): void {
    this.loaded = false;
  }

  ngAfterViewInit(): void {
    this.createBarChart();
    this.gettingAsyncConnection();
  }

  ionViewWillEnter() {

  }

  ionViewWillLeave() {

  }


  private createBarChart() {
    Chart.register(BarElement, BarController, CategoryScale, RadarController, LineController, PolarAreaController, RadialLinearScale, ArcElement, Decimation, Filler, Legend, Title, Tooltip, LinearScale, LineElement, LineController, PointElement);

    this.bars = new Chart(this.chart.nativeElement, {
      type: 'line',
      data: {
        /*labels: [],*/
        datasets: [{
          label: 'Temperature in Celsius',
          backgroundColor: '#1eee00', // array should have same number of elements as number of dataset
          borderColor: '#1eee00',// array should have same number of elements as number of dataset
          data: [],
          borderWidth: 1,
          pointRadius: 0,
        }]

      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
          }
        }
      }
    });

  }

  click() {
  }

  addDataToChart(data: any, label: string) {
    const maxShown = 10;
    if (this.bars.config._config.data.datasets[0].data.length >= maxShown) {
      this.bars.config._config.data.labels.splice(maxShown - 1, 1);
      this.bars.config._config.data.datasets[0].data.splice(maxShown - 1, 1);
    }
    this.bars.config._config.data.labels.push(label);
    this.bars.config._config.data.datasets[0].data.push(data);
    this.bars.update();
  }

  gettingAsyncConnection() {
    const sub = this.auth.user$.subscribe(x => {
      if (!!x.devices && x.devices.length > 0) {
        const dId = x.devices[0];
        this.tempService.getThisMonthTemp(dId).pipe(takeWhile(() => !this.loaded)).subscribe(resp => {
          if (!resp || resp.length <= 0) {
            return;
          }
          this.loaded = true;
          for (const tempReading of resp.reverse()) {

            this.addDataToChart(tempReading.value, tempReading.timestamp.toDateString())
          }
        });

        this.tempService.getNewestTemp(dId).subscribe(value => {
          if (!this.loaded) {
            return;
          }
          this.addDataToChart(value.value, value.timestamp.toDateString())
        })
      } else {
        this.noDevice = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.bars.destroy()
  }
}
