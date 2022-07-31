<template>
  <SettingPanel :data-source="tableData" :columns="tableCols" :showSlot="true">
    <template #default="{ record, index, model }: ScopeType<typeof tableData>">
      <SpFormItem>{{ record.audioFiles }}</SpFormItem>
      <SpFormItem :name="`${model}.${index}.name`">
        <SpFormInput v-model:value="record.name" />
      </SpFormItem>
      <SpFormItem :name="`${model}.${index}.class`">
        <div v-if="index === 0" class="pr-4">GENERAL</div>
        <ComSelectClass v-model:value="record.class" v-else />
      </SpFormItem>
      <SpFormItem :name="`${model}.${index}.priority`">
        <ComSelectGeneral
          v-if="record.class === settingsClass.GENERAL"
          v-model:value="record.priority"
        />
        <ComSelectBgm v-else v-model:value="record.priority" :disabled-value="bgmDisabledValues" />
      </SpFormItem>
      <SpFormItem :name="`${model}.${index}.volume`">
        <SpFormInput v-model:value="record.volume" type="number" />
      </SpFormItem>
      <SpFormItem>{{ record.eq }}</SpFormItem>
    </template>
    <template #action></template>
  </SettingPanel>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import SettingPanel from '/@/components/SpCard/setting.vue';
  import type { ScopeType } from '/@/components/SpCard/setting.vue';
  import { ComSelectClass, ComSelectGeneral, ComSelectBgm } from '../../../utils/ComSelector';
  import { CLASS as settingsClass } from '../../../utils/enum';
  const bgmDisabledValues = computed(() =>
    tableData.value.filter((item) => item.class === settingsClass.BGM).map((item) => item.priority),
  );

  // table
  const { t } = useI18n();
  import { useI18n } from '/@/utils/hooks/web/useI18n';
  import SpFormItem, { SpFormInput } from '/@/components/SpForm/SpFormItem.vue';

  const tableData = ref([
    {
      audioFiles: 'Main Message',
      name: 'Main Message',
      class: 'GENERAL',
      priority: 8, // G9
      volume: 100,
      eq: 'EQ',
    },
    {
      audioFiles: 'Main Music',
      name: 'Main Music',
      class: 'GENERAL',
      priority: 10, // G11
      volume: 100,
      eq: 'EQ',
    },
  ]);
  const tableCols = [
    { title: 'GENERAL', width: 200 },
    { title: 'Name', width: 200 },
    { title: 'Class', width: 200 },
    { title: 'Priority', width: 200 },
    { title: 'Volume', width: 150 },
    { title: 'EQ', width: 'auto' },
  ];
</script>
<style scoped lang="less"></style>
