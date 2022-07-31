<template>
  <LayoutSetting v-model:value="activeKey">
    <template #tabs>
      <SpRadioButton value="soundChannel" :disabled="!enabledsSettings.has('soundChannel')">
        {{ $t('routes.device.settings.soundChannel') }}
      </SpRadioButton>
      <SpRadioButton value="keySetting" :disabled="!enabledsSettings.has('keySetting')">
        {{ $t('routes.device.settings.keySetting') }}
      </SpRadioButton>
      <SpRadioButton value="audioFile" :disabled="!enabledsSettings.has('audioFile')">
        {{ $t('routes.device.settings.audioFile') }}
      </SpRadioButton>
      <SpRadioButton
        value="gpiEventSetting"
        class="float-right"
        :disabled="!enabledsSettings.has('gpiEventSetting')"
      >
        {{ $t('routes.device.settings.gpiEventSetting') }}
      </SpRadioButton>
      <SpRadioButton
        value="timerSetting"
        class="float-right"
        :disabled="!enabledsSettings.has('timerSetting')"
      >
        {{ $t('routes.device.settings.timerSetting') }}
      </SpRadioButton>
    </template>
    <component :is="ActiveSettingCom" />
  </LayoutSetting>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import LayoutSetting, { SpRadioButton } from '/@/layouts/setting/index.vue';

  const activeKey = ref<SettingType>('soundChannel');

  // active-device
  import useSetting, { SettingType } from './utils/useSettings';
  const { ActiveSettingCom, enabledsSettings } = useSetting(activeKey);
</script>
<style lang="less" scoped></style>
