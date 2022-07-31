<template>
  <SettingPanel
    :data-source="tableData"
    :input-source="inputData"
    :columns="tableCols"
    :showSlot="true"
    :showInput="true"
  >
    <template #default="{ index, model }: ScopeType<typeof tableData>">
      <SpFormItem>{{ tableData[index].input }}</SpFormItem>
      <SpFormItem :name="`${model}.${index}.name`">
        <SpFormInput v-model:value="tableData[index].name" />
      </SpFormItem>
      <SpFormItem :name="`${model}.${index}.class`">
        <ComSelectClass v-model:value="tableData[index].class" />
      </SpFormItem>
      <SpFormItem :name="`${model}.${index}.channelPriority`">
        <ComSelectGeneral
          v-if="tableData[index].class === settingsClass.GENERAL"
          v-model:value="tableData[index].channelPriority"
        />
        <ComSelectBgm
          v-else
          v-model:value="tableData[index].channelPriority"
          :disabled-value="bgmDisabledValues"
        />
      </SpFormItem>
      <SpFormItem :name="`${model}.${index}.volume`">
        <SpFormInput v-model:value="tableData[index].volume" type="number" />
      </SpFormItem>
      <SpFormItem>{{ tableData[index].eq }}</SpFormItem>
    </template>
    <template #special="{ index, model }: ScopeType<typeof inputData>">
      <SpFormItem>{{ inputData[index].input }}</SpFormItem>
      <SpFormItem :name="`${model}.${index}.name`">
        <SpFormInput v-model:value="inputData[index].name" />
      </SpFormItem>
      <SpFormItem :name="`${model}.${index}.class`">
        <ComSelectClass v-model:value="inputData[index].class" />
      </SpFormItem>
      <SpFormItem :name="`${model}.${index}.channelPriority`">
        <ComSelectGeneral
          v-if="inputData[index].class === settingsClass.GENERAL"
          v-model:value="inputData[index].channelPriority"
        />
        <ComSelectBgm
          v-else
          v-model:value="inputData[index].channelPriority"
          :disabled-value="bgmDisabledValues"
        />
      </SpFormItem>
      <SpFormItem :name="`${model}.${index}.volume`">
        <SpFormInput v-model:value="inputData[index].volume" type="number" />
      </SpFormItem>
      <SpFormItem>{{ inputData[index].eq }}</SpFormItem>
    </template>
  </SettingPanel>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import SettingPanel from '/@/components/SpCard/setting.vue';
  import type { ScopeType } from '/@/components/SpCard/setting.vue';
  import { ComSelectClass, ComSelectGeneral, ComSelectBgm } from '../../../utils/ComSelector';
  import { CLASS as settingsClass } from '../../../utils/enum';
  import { bgmListGet } from '/@/serveices';
  const bgmDisabledValues = computed(() =>
    tableData.value
      .filter((item) => item.class === settingsClass.BGM)
      .map((item) => item.channelPriority),
  );

  // table
  const { t } = useI18n();
  import { useI18n } from '/@/utils/hooks/web/useI18n';
  import SpFormItem, { SpFormInput } from '/@/components/SpForm/SpFormItem.vue';
  const data = bgmListGet();
  console.log(data);
  const tableData = ref(
    new Array(1).fill(0).map((item, index) => ({
      input: `BGM Music`,
      name: `BGM Music`,
      class: settingsClass.BGM,
      channelPriority: index,
      volume: 80,
      eq: 'EQ',
    })),
  );
  const inputData = ref(
    new Array(1).fill(0).map((item, index) => ({
      input: `input1`,
      name: `input1`,
      class: settingsClass.BGM,
      channelPriority: index,
      volume: 80,
      eq: 'EQ',
    })),
  );
  const tableCols = [
    { title: 'BGM', width: 200 },
    { title: 'Name', width: 200 },
    { title: 'Class', width: 200 },
    { title: 'Channel', width: 200 },
    { title: 'Volume', width: 150 },
    { title: 'EQ', width: 'auto' },
  ];
</script>
<style scoped lang="less"></style>
