import { computed, defineAsyncComponent, h, inject, Ref } from 'vue';
import { DeviceItem } from '/#/store';
import { DEVICE_TYPE } from '/@/enums/deviceEnum';

// PAGE
export type SettingType = 'inputControl' | 'audioFileSend' | 'speakerControl' | 'gpiControl';

const terminal = {
  inputControl: defineAsyncComponent(() => import('../inputControl/index.vue')),
  audioFileSend: defineAsyncComponent(() => import('../audioFileSend/index.vue')),
  speakerControl: defineAsyncComponent(() => import('../speakerControl/index.vue')),
  gpiControl: defineAsyncComponent(() => import('../gpiControl/index.vue')),
} as { [key in SettingType]: any };

const exception = {
  noDevice() {
    return h('div', 'CAN NOT FOUND THE DEVICE');
  },
  noSetting() {
    return h('div', 'CAN NOT FOUND THE SETTING PART');
  },
};

import { useDeviceStoreWithOut } from '/@/store/modules/device';
export default function useSetting(activeSettings: Ref<SettingType>) {
  const deviceStore = useDeviceStoreWithOut();

  const ActiveSettingCom = computed(
    () =>
      terminal[activeSettings.value] ||
      (deviceStore.listGroups.length ? exception.noSetting : exception.noDevice),
  );

  const enabledsSettings = computed(() => new Set(Object.keys(terminal)));
  return {
    ActiveSettingCom,
    enabledsSettings,
  };
}

export function useSettingForm(activeSettings: Ref<SettingType>) {
  const activeDevice = inject<Ref<DeviceItem>>('active-device');
  const settingsCom = computed(() => {
    switch (activeDevice?.value.type) {
      case DEVICE_TYPE.TERMINAL:
        return terminal[activeSettings.value];
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
