import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/services/device.service';
import { EventFeedService } from 'src/app/services/event-feed.service';
import {BaseEvent} from "./models/BaseEvent";

@Component({
  selector: 'app-event-feed',
  templateUrl: './event-feed.component.html',
  styleUrls: ['./event-feed.component.scss']
})
export class EventFeedComponent implements OnInit {
  events: BaseEvent[] = [];

  constructor(private eventFeed: EventFeedService, private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.GetHistory();
  }

   GetHistory() {
    return this.eventFeed.GetEventFeed(this.deviceService.SelectedDeviceId).subscribe(a => {
      console.log(a);
      this.events = a.sort((a,b) => a.timestamp.valueOf() - b.timestamp.valueOf());
    });
  }

}
