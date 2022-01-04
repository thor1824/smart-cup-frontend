import { Component, OnInit } from '@angular/core';
import {DeviceService} from "../../services/device.service";
import {EventFeedService} from "../../services/event-feed.service";
import {MetricsService} from "../../services/metrics.service";
import {Observable} from "rxjs";
import {Metrics} from "./models/Metrics";

@Component({
  selector: 'app-metric-feed',
  templateUrl: './metric-feed.component.html',
  styleUrls: ['./metric-feed.component.scss']
})
export class MetricFeedComponent implements OnInit {

  filled!: Metrics;
  sipped!: Metrics;
  intake!: Metrics;

  constructor(private device: DeviceService,
              private mFeed: MetricsService) { }

  ngOnInit(): void {
    const sub = this.device.selectedDeviceId$.subscribe(id => {
      this.mFeed.getFilled(id).subscribe(filled => console.log(filled))
      this.mFeed.getIntake(id).subscribe(intake => this.intake = intake);
      this.mFeed.getSipped(id).subscribe(sipped => this.sipped = sipped);
    });
  }



}
