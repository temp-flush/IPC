<template>
  <SettingPanel :data-source="tableData" :columns="tableCols" :groups="[3]">
    <template #default="{ index, model }: ScopeType<typeof tableData>">
      <SpFormItem>
        <div>{{ tableData[index].key }}</div>
      </SpFormItem>
      <SpFormItem v-if="index < 2" :name="`${model}.${index}.active`">
        <Switch
          v-model:checked="tableData[index].active"
          checked-children="on"
          un-checked-children="off"
        />
      </SpFormItem>
      <div v-else></div>
      <SpFormItem v-if="!!tableData[index].message">
        <div>{{ tableData[index].message }}</div>
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
  import { reactive } from 'vue';

  const tableData = reactive([
    { key: 'FAULT-AMP', active: true, status: 'ok' },
    { key: 'FAULT-SP Line', active: true, message: 'FAULT-SP Line_Low Impediance', status: 'ok' },
    { message: 'FAULT-SP Line_to GND', status: 'ok' },
    { key: 'Bizz', active: true },
  ]);
  const tableCols = [
    { title: t('routes.monitor.setting.fault.form.item'), width: 200 },
    { title: '', width: 400 },
    { title: '', width: 400 },
    { title: t('routes.monitor.setting.fault.form.status'), width: 400 },
  ];
</script>
<style scoped lang="less"></style>
