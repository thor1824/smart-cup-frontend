import { Component, OnInit } from '@angular/core';
import {DeviceService} from "../../services/device.service";
import {EventFeedService} from "../../services/event-feed.service";

@Component({
  selector: 'app-metric-feed',
  templateUrl: './metric-feed.component.html',
  styleUrls: ['./metric-feed.component.scss']
})
export class MetricFeedComponent implements OnInit {

  constructor(private device: DeviceService,
              private eFeed: EventFeedService) { }

  ngOnInit(): void {

    const sub = this.device.selectedDeviceId$.subscribe(id => {
      this.eFeed.getFilled(id).subscribe();
      this.eFeed.getIntake(id).subscribe();
      this.eFeed.getSpilled(id).subscribe();
    });

  }

}
