export interface Metrics {
  iot_id: string;
  timeStamp: Date;
  eventType: string;
  data: IEventData;
}

export interface IEventData{

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
