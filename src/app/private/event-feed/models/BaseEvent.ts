import {IEventData} from "../../metric-feed/models/Metrics";

export interface BaseEvent {
    iot_id : string;
    timestamp: Date;
    eventType: string;
    data: IEventData;
  }

export interface SipEvent extends BaseEvent{
  sipVolume: string;
}

export interface SettingsChangedEvent extends BaseEvent {
}
