export interface SettingsPutBody {
  interval: number;
  iotDeviceId: string;
  sensorId: string
}

export interface Settings {
  iot_id: string;
  configs: SensorConfig[]
}

export interface SensorConfig {
  sensorId: string
  interval: number
}
