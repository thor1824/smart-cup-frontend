import {Component, OnInit} from '@angular/core';
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

  constructor(
    private device: DeviceService,
    private mFeed: MetricsService,
    private eFeed: EventFeedService
  ) {
  }

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
        console.log(intake)
        intake.forEach((value: Metrics) => {
          this.intakeVolume += parseFloat((value.data as any).volumePoured.toFixed())
        });
      });
      this.mFeed.getSipped(id).subscribe(sipped => {
        console.log(sipped)
        sipped.forEach((value: Metrics) => {
          this.sippedVolume += parseFloat((value.data as any).volumeSipped.toFixed())
        });
      });
      this.eFeed.newestEvents$.subscribe(x => {
        if (x.eventType === 'sipped') {
          this.sippedVolume += parseFloat((x.data as any).volumeSipped.toFixed())
        } else if (x.eventType === 'filled') {
          this.filledVolume += parseFloat(x.data.volumeFilled.toFixed())
        } else if (x.eventType === 'poured') {
          this.intakeVolume += parseFloat((x.data as any).volumePoured.toFixed())
        }
      });
    }, error => {
    });
  }

  print() {
    console.log(this.sippedVolume);
    console.log(this.filledVolume);
    console.log(this.intakeVolume);
  }


}
