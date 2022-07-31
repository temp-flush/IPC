// CLASS
export enum CLASS {
  GENERAL = 'GENERAL',
  BGM = 'BGM',
}
export const CLASS_LIST = [
  { value: CLASS.GENERAL, label: 'GENERAL' },
  { value: CLASS.BGM, label: 'BGM' },
];

// PRIORITY_GENERAL
export enum GENERAL {}
export const GENERAL_LIST = new Array(16)
  .fill(0)
  .map((item, index) => ({ value: index, label: `G${index + 1}` }));

// PRIORITY_BGM
export enum BGM {}
export const BGM_LIST = new Array(16)
  .fill(0)
  .map((item, index) => ({ value: index, label: `BGM${index + 1}` }));

// GPO
export enum GPO_TYPE {
  CONTROL = 'control',
  STATUS = 'status',
}

export enum GPO_STATUS {
  EMG = 'EMG',
  EMG_MIC = 'EMG MIC',
  EMG_EXT = 'EMG EXT',
  ALERT = 'ALERT',
  EVAC = 'EVAC',
  FAULT = 'FAULT',
}
export const GPO_STATUS_LIST = [
  { value: GPO_STATUS.EMG, label: 'EMG' },
  { value: GPO_STATUS.EMG_MIC, label: 'EMG_MIC' },
  { value: GPO_STATUS.EMG_EXT, label: 'EMG_EXT' },
  { value: GPO_STATUS.ALERT, label: 'ALERT' },
  { value: GPO_STATUS.EVAC, label: 'EVAC' },
  { value: GPO_STATUS.FAULT, label: 'FAULT' },
];

// EVENT
export const EVENT_COMMAND_LIST = [
  { value: 'serverMusicSending', label: 'Server Music Sending' },
  { value: 'serverMessageSending', label: 'Server Message Sending' },
  { value: 'stopServerSending', label: 'STOP Server sending' },
  { value: 'generalInput', label: 'General Input' },
  { value: 'bgmInput', label: 'BGM Input' },
  { value: 'zonesControl', label: 'Zones control' },
  { value: 'gpo', label: 'GPO' },
] as const;

export type EventCommand = typeof EVENT_COMMAND_LIST[number]['value'];

// GPI

export const KEY_FUNCTION_LIST = [
  { value: 'FaultAcknowledge', label: 'Fault Acknowledge' },
  { value: 'FaultReset', label: 'Fault Reset' },
  { value: 'timer0On', label: 'Timer0 ON' },
  { value: 'timer0Off', label: 'Timer0 OFF' },
];

// STATION
export const CHIME_LIST = [
  { value: '1-tone', label: '1-tone' },
  { value: '2-tone', label: '2-tone' },
  { value: '4-tone', label: '4-tone' },
  { value: 'None', label: 'None' },
];

// PRIORITY_BGM
export enum EMERGENCY {}
export const EMERGENCY_LIST = new Array(4)
  .fill(0)
  .map((item, index) => ({ value: index + 2, label: `E${index + 2}` }));
