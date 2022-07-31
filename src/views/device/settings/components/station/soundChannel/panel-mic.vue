<template>
  <SettingPanel :data-source="tableData" :columns="tableCols">
    <template #default="{ record, index, model }: ScopeType<typeof tableData>">
      <SpFormItem>
        <div v-if="index === 0">{{ record.input }}</div>
      </SpFormItem>
      <SpFormItem :name="`${model}.${index}.name`">
        <SpFormInput v-if="index === 0" v-model:value="record.name" />
      </SpFormItem>
      <SpFormItem :name="`${model}.${index}.class`">
        <div :class="{ 'text-[red]': index === 0 }" class="pr-4">{{ record.class }}</div>
      </SpFormItem>
      <SpFormItem :name="`${model}.${index}.priority`">
        <ComSelectGeneral
          v-if="record.class === settingsClass.GENERAL"
          v-model:value="record.priority"
        />
        <ComSelectEmergency v-else v-model:value="record.priority" />
      </SpFormItem>
      <SpFormItem :name="`${model}.${index}.priorityControl`">
        <div>{{ record.priorityControl }}</div>
      </SpFormItem>
      <SpFormItem :name="`${model}.${index}.chime`">
        <SpFormSelect v-if="index === 1" v-model:value="record.chime" :options="optionsChime" />
      </SpFormItem>
    </template>
  </SettingPanel>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import SettingPanel from '/@/components/SpCard/setting.vue';
  import type { ScopeType } from '/@/components/SpCard/setting.vue';
  import { ComSelectEmergency, ComSelectGeneral } from '../../../utils/ComSelector';
  import { CLASS as settingsClass } from '../../../utils/enum';

  // form

  import { CHIME_LIST } from '../../../utils/enum';
  import SpFormSelect from '/@/components/SpForm/SpFormSelect.vue';
  const optionsChime = CHIME_LIST;

  // table
  const { t } = useI18n();
  import { useI18n } from '/@/utils/hooks/web/useI18n';
  import SpFormItem, { SpFormInput } from '/@/components/SpForm/SpFormItem.vue';

  const tableData = ref([
    {
      input: 'MIC',
      name: 'MIC',
      class: 'EMERGENCY',
      priority: 8, // G9
      priorityControl: 'LIFO',
      chime: '',
    },
    {
      input: '',
      name: '',
      class: 'GENERAL',
      priority: 10, // G11
      priorityControl: 'LIFO',
      chime: '1-tone',
    },
  ]);
  const tableCols = [
    { dataIndex: 'input', title: 'Input', width: 200 },
    { dataIndex: 'name', title: 'Name', width: 200 },
    { dataIndex: 'class', title: 'Class', width: 200 },
    { dataIndex: 'priority', title: 'Priority', width: 200 },
    { dataIndex: 'priorityControl', title: 'Priority Control', width: 150 },
    { dataIndex: 'chime', title: 'START CHIME', width: 'auto' },
  ];
</script>
<style scoped lang="less"></style>
