<template>
  <SettingPanel :data-source="tableData" :columns="tableCols">
    <template #default="{ record, index, model }: ScopeType<typeof tableData>">
      <SpFormItem>{{ record.key }}</SpFormItem>
      <SpFormItem :name="`${model}.${index}.selection`">
        <EventZone
          v-if="tableData[record.id]"
          v-model:value="tableData[record.id].selection"
          command="serverMusicSending"
          :multiple="true"
        />
      </SpFormItem>
    </template>
  </SettingPanel>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import SettingPanel from '/@/components/SpCard/setting.vue';
  import type { ScopeType } from '/@/components/SpCard/setting.vue';
  import EventZone from '../../event/eventZone.vue';

  // table
  const { t } = useI18n();
  import { useI18n } from '/@/utils/hooks/web/useI18n';
  import SpFormItem from '/@/components/SpForm/SpFormItem.vue';

  const tableData = ref(
    new Array(8).fill(0).map((item, index) => ({
      id: index + 1,
      key: `Key_0${index + 1}`,
      selection: ``,
    })),
  );
  const tableCols = [
    { title: 'Keys', width: 200 },
    { title: 'Selection', width: 400 },
  ];
</script>
<style scoped lang="less"></style>
