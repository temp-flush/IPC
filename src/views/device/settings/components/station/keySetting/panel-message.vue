<template>
  <SettingPanel :data-source="tableData" :columns="tableCols" :groups="[1]">
    <template #default="{ index, model }: ScopeType<typeof tableData>">
      <SpFormItem v-if="index === 0" :name="`${model}.${index}.message`">
        <span class="text-[red] mr-3 inline-block align-middle">{{ tableData[0].key }}</span>
        <Switch
          checked-children="on"
          un-checked-children="off"
          v-model:checked="tableData[0].message"
        />
      </SpFormItem>
      <SpFormItem v-if="index > 0">
        <div>{{ tableData[index].key }}</div>
      </SpFormItem>
      <SpFormItem v-if="index > 0" :name="`${model}.${index}.message`">
        <SpUploadInput :disabled="!tableData[0].message" v-model:value="tableData[index].message" />
      </SpFormItem>
    </template>
  </SettingPanel>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import SettingPanel from '/@/components/SpCard/setting.vue';
  import type { ScopeType } from '/@/components/SpCard/setting.vue';
  import { Divider, Switch } from 'ant-design-vue';

  // table
  const { t } = useI18n();
  import { useI18n } from '/@/utils/hooks/web/useI18n';
  import SpFormItem from '/@/components/SpForm/SpFormItem.vue';
  import SpUploadInput from '/@/components/SpUpload/input.vue';

  const Keys = [t('routes.device.setting.keySetting.from.control'), 'A', 'B', 'C'];
  const tableData = ref(
    new Array(4)
      .fill(0)
      .map((item, index) => ({ key: index ? `Key_${Keys[index]}` : Keys[index], message: `` })),
  );
  const tableCols = [
    { title: 'Keys', width: 200 },
    { title: 'Messages', width: 400 },
  ];
</script>
<style scoped lang="less"></style>
