import { computed, defineAsyncComponent, h, inject, Ref } from 'vue';
import { DeviceItem } from '/#/store';
import { DEVICE_TYPE } from '/@/enums/deviceEnum';

// PAGE
export type SettingType =
  | 'soundChannel'
  | 'keySetting'
  | 'audioFile'
  | 'gpiEventSetting'
  | 'timerSetting';

const can = {
  soundChannel: defineAsyncComponent(() => import('../components/can/soundChannel/index.vue')),
  audioFile: defineAsyncComponent(() => import('../components/can/audioFile/index.vue')),
  timerSetting: defineAsyncComponent(() => import('../components/can/timerSetting/index.vue')),
  gpiEventSetting: defineAsyncComponent(
    () => import('../components/can/gpiEventSetting/index.vue'),
  ),
} as { [key in SettingType]: any };
const expand = {
  soundChannel: defineAsyncComponent(() => import('../components/expand/soundChannel/index.vue')),
  gpiEventSetting: defineAsyncComponent(
    () => import('../components/expand/gpiEventSetting/index.vue'),
  ),
} as { [key in SettingType]: any };
const station = {
  soundChannel: defineAsyncComponent(() => import('../components/station/soundChannel/index.vue')),
  keySetting: defineAsyncComponent(() => import('../components/station/keySetting/index.vue')),
} as { [key in SettingType]: any };

export type SettingTypeTerminal = 'terminal';
const terminal = {
  terminal: defineAsyncComponent(() => import('../components/terminal/index.vue')),
} as { [key in SettingTypeTerminal]: any };

const exception = {
  noDevice() {
    return h('div', 'CAN NOT FOUND THE DEVICE');
  },
  noSetting() {
    return h('div', 'CAN NOT FOUND THE SETTING PART');
  },
};
export default function useSetting(activeSettings: Ref<SettingType | SettingTypeTerminal>) {
  const activeDevice = inject<Ref<DeviceItem>>('active-device');
  console.log(activeDevice);
  const deviceSettings = computed(() => {
    switch (activeDevice?.value?.type) {
      case DEVICE_TYPE.CALL_STATION:
        return station;
      case DEVICE_TYPE.BROADCAST_SERVER:
        return can;
      case DEVICE_TYPE.EXPAND:
        return expand;
      case DEVICE_TYPE.TERMINAL:
        return terminal;
      default:
        console.error(new Error(`设备类型 ${activeDevice?.value?.type} 不存在`));
        return exception;
    }
  });

  const ActiveSettingCom = computed(
    () =>
      deviceSettings.value[activeSettings.value] ||
      (activeDevice?.value ? exception.noSetting : exception.noDevice),
  );

  const enabledsSettings = computed(() => new Set(Object.keys(deviceSettings.value)));
  return {
    ActiveSettingCom,
    enabledsSettings,
  };
}

export function useSettingForm(activeSettings: Ref<SettingType>) {
  const activeDevice = inject<Ref<DeviceItem>>('active-device');
  const settingsCom = computed(() => {
    switch (activeDevice?.value.type) {
      case DEVICE_TYPE.CALL_STATION:
        return can[activeSettings.value];
      case DEVICE_TYPE.BROADCAST_SERVER:
        return can[activeSettings.value];
      case DEVICE_TYPE.TERMINAL:
        return can[activeSettings.value];
      default:
        throw new Error(`设备类型 ${activeDevice?.value.type} 不存在`);
    }
  });
  return settingsCom;
}

export type ScopeType<T extends any[]> = {
  record: T[number];
  index: number;
  model: string;
};
export {};
