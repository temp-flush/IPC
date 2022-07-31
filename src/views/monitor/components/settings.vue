<template>
  <LayoutSetting value="fault" :sticky="false">
    <template #tabs>
      <SpRadioButton value="fault">
        {{ $t('routes.monitor.settings.fault') }}
      </SpRadioButton>
    </template>
    <div class="space-y-5">
      <PanelNea />
      <PanelAs />
    </div>
  </LayoutSetting>
</template>
<script lang="ts" setup>
  import LayoutSetting, { SpRadioButton } from '/@/layouts/setting/index.vue';

  import PanelAs from './panel-as.vue';
  import PanelNea from './panel-nea.vue';
</script>
<style lang="less" scoped></style>
