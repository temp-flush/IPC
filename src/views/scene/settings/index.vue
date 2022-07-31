<template>
  <LayoutSetting v-model:value="activeKey">
    <template #tabs>
      <SpRadioButton value="inputControl">
        {{ $t('routes.scene.settings.inputControl') }}
      </SpRadioButton>
      <SpRadioButton value="audioFileSend">
        {{ $t('routes.scene.settings.audioFileSend') }}
      </SpRadioButton>
      <SpRadioButton value="speakerControl">
        {{ $t('routes.scene.settings.speakerControl') }}
      </SpRadioButton>
      <SpRadioButton value="gpiControl">
        {{ $t('routes.scene.settings.gpiControl') }}
      </SpRadioButton>
    </template>
    <component :is="ActiveSettingCom" />
  </LayoutSetting>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import LayoutSetting, { SpRadioButton } from '/@/layouts/setting/index.vue';
  import useSetting, { SettingType } from './utils/useSettings';

  const activeKey = ref<SettingType>('inputControl');

  // active-scene
  const { ActiveSettingCom } = useSetting(activeKey);
</script>
<style lang="less" scoped></style>
