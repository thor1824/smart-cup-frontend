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


  constructor(public eventFeed: EventFeedService, private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.deviceService.selectedDeviceId$.subscribe(id => {
      console.log(id);
      this.eventFeed.GetEventFeed(id).subscribe(a => {
      });
    });
  }

}
