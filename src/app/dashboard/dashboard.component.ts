import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {TempReading, TempService} from "../services/temp.service";

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


  constructor(
    private tempService: TempService
  ) {
  }

  ngOnInit(): void {
    this.tempService.getNewestTemp().subscribe(x => this.handleNewTemp(x))
    this.tempService.getThisMonthTemp().subscribe()
  }

  public handleNewTemp(reading: TempReading) {
    const newValue = reading.value;
    const oldValue = this.temperatur;
    this.temperatur = newValue;
    this.animateTempUp(newValue, oldValue).then();
    return;
  }

  public async animateTempUp(newValue: number, oldValue: number) {
    console.log({newValue, oldValue})
    this.currentTask++;
    const thisTask = this.currentTask
    const s = parseFloat(this.shownValueBehavior.value)
    oldValue = oldValue !== s ? s: oldValue
    if (newValue > oldValue) {
      for (let i = oldValue; i < newValue; i = i + 0.1) {
        this.shownValueBehavior.next(i.toFixed(1));
        await delay(10);
        if (thisTask !== this.currentTask) {
          console.log("escape");
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
        console.log("escape");
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
