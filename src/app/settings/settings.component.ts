import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public interval = 0;
  public intervalString = '';
  constructor() { }

  ngOnInit(): void {
    this.SetIntervalAtStart();
  }

  public OnIonChange() {
    // Send To Backend

    this.SetCurrentInterval(this.interval);
  }

  private SetIntervalAtStart() {
    // Real interval at some point
    this.interval = 2.5;
    this.SetCurrentInterval(this.interval);
  }

  private SetCurrentInterval(interval: number) {
    this.intervalString = interval + ' seconds';
  }


}
