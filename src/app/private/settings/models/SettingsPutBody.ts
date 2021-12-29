export interface SettingsPutBody {
  sensorConfigs: SensorConfig[]
  iotDeviceId: string;
}

export interface Settings {
  iot_id: string;
  configs: SensorConfig[]
}

export interface SensorConfig {
  SensorId: string
  Interval: number
}
