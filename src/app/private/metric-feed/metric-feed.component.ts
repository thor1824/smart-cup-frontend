import { Component, OnInit } from '@angular/core';
import {DeviceService} from "../../services/device.service";
import {EventFeedService} from "../../services/event-feed.service";
import {MetricsService} from "../../services/metrics.service";
import {Observable} from "rxjs";
import {DecimalPipe} from "@angular/common";
import {Metrics} from "./models/Metrics";

@Component({
  selector: 'app-metric-feed',
  templateUrl: './metric-feed.component.html',
  styleUrls: ['./metric-feed.component.scss']
})
export class MetricFeedComponent implements OnInit {

  filledVolume: number = 0;
  sippedVolume: number = 0;
  intakeVolume: number = 0;

  constructor(private device: DeviceService,
              private mFeed: MetricsService) { }

  ngOnInit(): void {
    const sub = this.device.selectedDeviceId$.subscribe(id => {
        this.filledVolume = 0;
        this.intakeVolume = 0;
        this.sippedVolume = 0;
      this.mFeed.getFilled(id).subscribe(filled => {
        console.log(filled)
        filled.forEach((value: Metrics) => {
          this.filledVolume += parseFloat(value.data.volumeFilled.toFixed())
        });
      });
      this.mFeed.getIntake(id).subscribe(intake => {
        intake.forEach((value: Metrics) => {
          this.intakeVolume += parseFloat(value.data.volumeFilled.toFixed())
        });
      });
      this.mFeed.getSipped(id).subscribe(sipped => {
        sipped.forEach((value: Metrics) => {
          this.sippedVolume += parseFloat(value.data.volumeFilled.toFixed())
        });
      })},
        error => {}, () => {this.print()});
  }

  print(){
    console.log(this.sippedVolume);
    console.log(this.filledVolume);
    console.log(this.intakeVolume);
  }



}
