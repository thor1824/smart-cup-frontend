export interface BaseEvent {
    id : string;
    timestamp: Date;
    code: string
  }

export interface SipEvent extends BaseEvent{
  sipVolume: string;
}

export interface SettingsChangedEvent extends BaseEvent {
}
