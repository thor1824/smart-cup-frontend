export interface Metrics {
  iot_id: string;
  volume: number;
  eventType: EventTypeENUM;
  timePeriod: TimePeriodENUM;
}

export enum EventTypeENUM{
  EVENT_SIPPED = "sipped",
  EVENT_FILLED = "filled",
  EVENT_POURED = "poured"
}

export enum TimePeriodENUM {
  DAY,
  MONTH ,
  WEEK
}
