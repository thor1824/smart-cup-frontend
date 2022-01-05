import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {TempReading, TempService} from "../../services/temp.service";
import {AuthService} from "../../services/auth.service";
import {DeviceService} from "../../services/device.service";
import {EventFeedService} from "../../services/event-feed.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public value: string = '';
  public temperatur = 23.9;
  public shownValueBehavior = new BehaviorSubject<string>("" + this.temperatur);
  public shownValue$ = this.shownValueBehavior.asObservable();
  private currentTask = 0;
  public noDevice = false;
  private tempSub: Subscription = new Subscription();
  public tooCold: boolean = false;


  constructor(
    private tempService: TempService,
    private auth: AuthService,
    private device: DeviceService,
    private eFeed: EventFeedService
  ) {
  }

  ngOnInit(): void {

    const sub = this.device.selectedDeviceId$.subscribe(id => {
      console.log(id);
      if (!!id && id.length > 0) {
        this.noDevice = false;
        this.tempSub.unsubscribe();
        this.tempSub = new Subscription();
        const sub2 = this.tempService.getNewestTemp(id).subscribe(x => this.handleNewTemp(x))
        this.tempSub.add(sub2)
        const sub3 = this.tempService.getThisMonthTemp(id).subscribe()
        this.tempSub.add(sub3)

      } else {
        this.noDevice = true;
      }
    });
  }

  public handleNewTemp(reading: TempReading) {
    console.log(reading)
    const newValue = reading.value;
    const oldValue = this.temperatur;
    this.temperatur = newValue;
    this.tooCold = reading.tooCold;
    this.animateTempUp(newValue, oldValue).then();
    return;
  }

  public async animateTempUp(newValue: number, oldValue: number) {
    this.currentTask++;
    const thisTask = this.currentTask
    const s = parseFloat(this.shownValueBehavior.value)
    oldValue = oldValue !== s ? s : oldValue
    if (newValue > oldValue) {
      for (let i = oldValue; i < newValue; i = i + 0.1) {
        this.shownValueBehavior.next(i.toFixed(1));
        await delay(10);
        if (thisTask !== this.currentTask) {
          return;
        }
      }
      this.shownValueBehavior.next(newValue.toFixed(1));
      return;
    }

    for (let i = oldValue; i > newValue; i = i - 0.1) {
      this.shownValueBehavior.next(i.toFixed(1));
      await delay(10);
      if (thisTask !== this.currentTask) {
        return;
      }
    }
    this.shownValueBehavior.next(newValue.toFixed(1));
    //this.shownValueBehavior.next(newValue);
  }


}

async function delay(time: number) {
  await new Promise(f => setTimeout(f, time));
}
