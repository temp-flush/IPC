<template>
  <SettingPanel :data-source="tableData" :columns="tableCols">
    <template #default="{ record, index, model }: ScopeType<typeof tableData>">
      <SpFormItem>{{ record.priority }}</SpFormItem>
      <SpFormItem :name="`${model}.${index}.priorityControl`">
        <span v-if="index === 0">LIFO</span>
        <RadioGroup v-else v-model:value="record.priorityControl">
          <Radio value="FIFO">FIFO</Radio>
          <Radio value="LIFO">LIFO</Radio>
        </RadioGroup>
      </SpFormItem>
      <SpFormItem :name="`${model}.${index}.priorityExitControl`">
        <div class="grid grid-cols-10">
          <div class="mr-3 text-right col-span-5">
            {{
              index === 0 ? 'Emergency Mics Out of Control' : 'Audio file sending just before will'
            }}
          </div>
          <RadioGroup
            v-model:value="record.priorityExitControl"
            class="!flex !w-[180px] !text-left"
          >
            <Radio v-if="index === 0" value="Silence" class="flex-1">Silence</Radio>
            <Radio v-else value="Stop" class="flex-1">Stop</Radio>
            <Radio value="Keep On" class="flex-1">Keep On</Radio>
          </RadioGroup>
        </div>
      </SpFormItem>
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
  import SpFormItem from '/@/components/SpForm/SpFormItem.vue';
  import { RadioGroup, Radio } from 'ant-design-vue';
  const activeDevice = inject<Ref<DeviceItem>>('active-device');
  console.log(activeDevice)
  const tableData = ref([
    {
      priority: 'RESET/EVAC/ALERT',
      priorityControl: 'LIFO',
      priorityExitControl: 'Silence',
    },
    {
      priority: 'General source',
      priorityControl: 'LIFO',
      priorityExitControl: 'Stop',
    },
  ]);
  const tableCols = [
    { title: 'Priority', width: 200 },
    { title: 'Priority Control', width: 400 },
    { title: 'Priority Exit Control', width: 'auto' },
  ];
</script>
<style scoped lang="less">
  :deep(.ant-card-head) {
    background-color: #f08519 !important;
  }
</style>
