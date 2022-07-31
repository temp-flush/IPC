<template>
  <SettingPanel :data-source="tableData" :columns="tableCols">
    <template #default="{ record, index, model }: ScopeType<typeof tableData>">
      <SpFormItem>{{ record.emergency }}</SpFormItem>
      <SpFormItem :name="`${model}.${index}.name`">
        <SpFormInput v-model:value="record.name" />
      </SpFormItem>
      <SpFormItem>{{ record.class }}</SpFormItem>
      <SpFormItem>{{ record.priority }}</SpFormItem>
    </template>
  </SettingPanel>
</template>

<script setup lang="ts">
  import { ref, inject, Ref } from 'vue';
  import SettingPanel from '/@/components/SpCard/setting.vue';
  import type { ScopeType } from '/@/components/SpCard/setting.vue';
    import { DeviceItem } from '/#/store';
  // table
  const { t } = useI18n();
  import { useI18n } from '/@/utils/hooks/web/useI18n';
  import SpFormItem, { SpFormInput } from '/@/components/SpForm/SpFormItem.vue';
  const activeDevice = inject<Ref<DeviceItem>>('active-device');
  console.log(activeDevice)
  activeDevice.value.configDesc.emergency.forEach(v=>{
    v.emergency = v.name
    v.class = 'EMERGENCY'
  })
  const tableData = ref(activeDevice?.value.configDesc.emergency)
  // const tableData = ref([
  //   {
  //     emergency: 'PAGE MIC/EXT EMG',
  //     name: 'PAGE MIC/EXT EMG',
  //     class: 'EMERGENCY',
  //     priority: 'E-1',
  //   },
  //   {
  //     emergency: 'RESET',
  //     name: 'RESET',
  //     class: 'EMERGENCY',
  //     priority: 'E-6',
  //   },
  //   {
  //     emergency: 'EVAC',
  //     name: 'EVAC',
  //     class: 'EMERGENCY',
  //     priority: 'E-7',
  //   },
  //   {
  //     emergency: 'ALERT',
  //     name: 'ALERT',
  //     class: 'EMERGENCY',
  //     priority: 'E-8',
  //   },
  // ]);
  const tableCols = [
    { title: 'Emergency', width: 200 },
    { title: 'Name', width: 200 },
    { title: 'Class', width: 200 },
    { title: 'Priority', width: 'auto' },
  ];
</script>
<style scoped lang="less">
  :deep(.ant-card-head) {
    background-color: #f00 !important;
  }
</style>
