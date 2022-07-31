<template>
  <SettingPanel :data-source="tableData" :columns="tableCols">
    <template #default="{ record, index, model }: ScopeType<typeof tableData>">
      <SpFormItem>{{ record.gpi }}</SpFormItem>
      <SpFormItem :name="`${model}.${index}.name`">
        <SpFormInput v-model:value="record.name" />
      </SpFormItem>
    </template>
  </SettingPanel>
</template>

<script setup lang="ts">
  import { ref,inject,Ref } from 'vue';
  import SettingPanel from '/@/components/SpCard/setting.vue';
  import type { ScopeType } from '/@/components/SpCard/setting.vue';
  import { DeviceItem } from '/#/store';
  // table
  const { t } = useI18n();
  import { useI18n } from '/@/utils/hooks/web/useI18n';
  import SpFormItem, { SpFormInput } from '/@/components/SpForm/SpFormItem.vue';
  const activeDevice = inject<Ref<DeviceItem>>('active-device');~
  console.log(activeDevice)
  activeDevice.value.configDesc.gpi.forEach(v=>{
    v.gpi = v.id
    v.value = v.id
  })
  const tableData = ref(activeDevice.value.configDesc.gpi)

  // const tableData = ref(
  //   new Array(8).fill(0).map((item, index) => ({
  //     gpi: `GPI_${index + 1}`,
  //     name: `GPI_${index + 1}`,
  //   })),
  // );
  const tableCols = [
    { title: 'GPI', width: 100 },
    { title: 'Name', width: 'auto' },
  ];
</script>
<style scoped lang="less"></style>
