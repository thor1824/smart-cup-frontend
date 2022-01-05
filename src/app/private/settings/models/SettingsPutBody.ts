export interface SettingsPutBody {
  iotDeviceId: string;
  interval: number;
  prefMinTemp: number;
}

export interface Settings {
  iot_id: string;
  interval: number;
  prefMinTemp: number;
}

export interface SensorConfig {
  SensorId: string
  Interval: number
}
