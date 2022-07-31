<template>
  <LayoutSetting v-model:value="activeKey">
    <template #tabs>
      <SpRadioButton value="terminal" :disabled="!enabledsSettings.has('terminal')">
        {{ $t('routes.device.settings.terminal') }}
      </SpRadioButton>
    </template>
    <component :is="ActiveSettingCom" />
  </LayoutSetting>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import LayoutSetting, { SpRadioButton } from '/@/layouts/setting/index.vue';

  const activeKey = ref<SettingTypeTerminal>('terminal');

  // active-device
  import useSetting, { SettingTypeTerminal } from './utils/useSettings';
  const { ActiveSettingCom, enabledsSettings } = useSetting(activeKey);
</script>
<style lang="less" scoped></style>
