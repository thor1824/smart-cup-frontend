import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/services/device.service';
import { HistoryService } from 'src/app/services/history.service';
import {BaseEvent} from "./models/BaseEvent";

@Component({
  selector: 'app-event-feed',
  templateUrl: './event-feed.component.html',
  styleUrls: ['./event-feed.component.scss']
})
export class EventFeedComponent implements OnInit {
  history: BaseEvent[] = [];

  constructor(private historyService: HistoryService, private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.GetHistory();
  }

   GetHistory() {
    return this.historyService.GetHistory(this.deviceService.SelectedDeviceId).subscribe(a => {
      this.history = a;
    });
  }

}
