<template>
  <SettingPanel :data-source="tableData" :columns="tableCols">
    <template #default="{ index, model }: ScopeType<typeof tableData>">
      <SpFormItem>
        <div>{{ tableData[index].key }}</div>
      </SpFormItem>
      <SpFormItem :name="`${model}.${index}.message`">
        <SpUploadInput v-model:value="tableData[index].message" />
      </SpFormItem>
      <SpFormItem
        v-if="index === 0"
        :labelCol="{ span: 8 }"
        :name="`${model}.${index}.delay`"
        :label="$t('routes.device.setting.terminal.form.delay')"
        :rules="{ type: 'number' }"
      >
        <SpFormInput suffix="s" v-model:value="tableData[index].delay" />
      </SpFormItem>
    </template>
  </SettingPanel>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import SettingPanel from '/@/components/SpCard/setting.vue';
  import type { ScopeType } from '/@/components/SpCard/setting.vue';
  import SpUploadInput from '/@/components/SpUpload/input.vue';

  // table
  const { t } = useI18n();
  import { useI18n } from '/@/utils/hooks/web/useI18n';
  import SpFormItem, { SpFormInput } from '/@/components/SpForm/SpFormItem.vue';

  const Keys = ['ALERT', 'EVAC', 'RESET'];
  const tableData = ref(
    new Array(3).fill(0).map((item, index) => ({
      key: Keys[index],
      message: ``,
      delay: 60,
    })),
  );
  const tableCols = [
    { title: 'Emergency Voice Setting', width: 100 },
    { title: '', width: 400 },
    { title: '', width: 200 },
  ];
</script>
<style scoped lang="less">
  :deep(.ant-card-head) {
    background-color: #f00 !important;
  }

  :deep(.ant-input-affix-wrapper) {
    padding-top: 0;
    padding-bottom: 0;

    background-color: #b9bec3;
  }
</style>
