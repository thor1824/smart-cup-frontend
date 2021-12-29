import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {TempReading, TempService} from "../../services/temp.service";
import {AuthService} from "../../services/auth.service";

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


  constructor(
    private tempService: TempService,
    private auth: AuthService
  ) {
  }

  ngOnInit(): void {
    const sub = this.auth.user$.subscribe(x => {
      if (!!x.devices && x.devices.length > 0) {
        const dId = x.devices[0];
        this.tempService.getNewestTemp(dId).subscribe(x => this.handleNewTemp(x))
        this.tempService.getThisMonthTemp(dId).subscribe()
      } else {
        this.noDevice = true;
      }
    });
  }

  public handleNewTemp(reading: TempReading) {
    const newValue = reading.value;
    const oldValue = this.temperatur;
    this.temperatur = newValue;
    this.animateTempUp(newValue, oldValue).then();
    return;
  }

  public async animateTempUp(newValue: number, oldValue: number) {
    this.currentTask++;
    const thisTask = this.currentTask
    const s = parseFloat(this.shownValueBehavior.value)
    oldValue = oldValue !== s ? s: oldValue
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
