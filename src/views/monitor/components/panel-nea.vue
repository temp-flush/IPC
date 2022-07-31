<template>
  <SettingPanel :data-source="tableData" :columns="tableCols" :groups="[3]">
    <template #default="{ index, model }: ScopeType<typeof tableData>">
      <SpFormItem>
        <div>{{ tableData[index].key }}</div>
      </SpFormItem>
      <SpFormItem :name="`${model}.${index}.active`">
        <Switch
          v-model:checked="tableData[index].active"
          checked-children="on"
          un-checked-children="off"
        />
      </SpFormItem>
      <SpFormItem
        v-if="index === 3"
        :name="`${model}.${index}.checkInterval`"
        label="Check Interval"
        :labelCol="{ span: 8 }"
      >
        <SpFormSelect v-model:value="tableData[index].checkInterval" :options="optionsInterval" />
      </SpFormItem>
      <div v-else></div>
      <SpFormItem v-if="index < 3">
        <div>{{ tableData[index].status }}</div>
      </SpFormItem>
    </template>
  </SettingPanel>
</template>

<script setup lang="ts">
  import SettingPanel from '/@/components/SpCard/setting.vue';
  import type { ScopeType } from '/@/components/SpCard/setting.vue';
  import { Switch } from 'ant-design-vue';

  // table
  const { t } = useI18n();
  import { useI18n } from '/@/utils/hooks/web/useI18n';
  import SpFormSelect from '/@/components/SpForm/SpFormSelect.vue';
  import { reactive } from 'vue';

  const optionsInterval = [
    { value: 0, label: '1 小时' },
    { value: 1, label: '1 天' },
    { value: 2, label: '1 周' },
  ];
  const tableData = reactive([
    { key: 'FAULT-Network', active: true, status: 'ok' },
    { key: 'FAULT-Equipment', active: true, status: 'ok' },
    { key: 'FAULT-AC Power', active: true, status: 'ok' },
    { key: 'Bizz', active: true, checkInterval: 0 },
  ]);
  const tableCols = [
    { title: t('routes.monitor.setting.fault.form.item'), width: 200 },
    { title: '', width: 400 },
    { title: '', width: 400 },
    { title: t('routes.monitor.setting.fault.form.status'), width: 400 },
  ];
</script>
<style scoped lang="less"></style>
