<template>
  <SettingPanel :data-source="tableData" :columns="tableCols">
    <template #default="{ index, model }: ScopeType<typeof tableData>">
      <SpFormItem>
        <div v-if="index === 0">{{ tableData[index].input }}</div>
      </SpFormItem>
      <SpFormItem :name="`${model}.${index}.typeValue`">
        <div class="text-left">
          <Radio v-model:checked="tableData[index].typeValue">{{ tableData[index].type }}</Radio>
        </div>
      </SpFormItem>
      <SpFormItem
        :name="`${model}.${index}.priority`"
        v-if="index === 1"
        :label="$t('routes.device.setting.terminal.form.priority')"
      >
        <ComSelectGeneral v-model:value="tableData[index].priority" />
      </SpFormItem>
      <SpFormItem :name="`${model}.${index}.volume`" v-if="index === 1">
        <SpFormInput number v-model:value="tableData[index].volume" />
      </SpFormItem>
      <SpFormItem :name="`${model}.${index}.file`" v-if="index === 1">
        <SpUploadInput v-model:value="tableData[index].file" />
      </SpFormItem>
    </template>
  </SettingPanel>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import SettingPanel from '/@/components/SpCard/setting.vue';
  import type { ScopeType } from '/@/components/SpCard/setting.vue';
  import { ComSelectGeneral } from '../../utils/ComSelector';
  import { Button, Radio } from 'ant-design-vue';

  // form

  // table
  const { t } = useI18n();
  import { useI18n } from '/@/utils/hooks/web/useI18n';
  import SpFormItem, { SpFormInput } from '/@/components/SpForm/SpFormItem.vue';
  import SpUploadInput from '/@/components/SpUpload/input.vue';

  const tableData = ref([
    {
      input: 'GPI',
      type: 'EMG',
      typeValue: false,
      priority: '',
      volume: '',
      file: '',
    },
    {
      input: '',
      type: 'Audio file',
      typeValue: true,
      priority: 7, // G8
      volume: '80',
      file: '',
    },
  ]);
  const tableCols = [
    { title: 'GPI', width: 200 },
    { title: 'Type', width: 200 },
    { title: 'Priority', width: 200 },
    { title: 'Volume', width: 200 },
    { title: 'file', width: 'auto' },
  ];
</script>
<style scoped lang="less"></style>
