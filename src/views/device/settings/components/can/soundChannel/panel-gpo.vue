<template>
<div>
    <SettingPanel :data-source="tableData" :columns="tableCols">
    <template #default="{ record, index, model }: ScopeType<typeof tableData>">
      <SpFormItem>{{ record.gpo }}</SpFormItem>
      <SpFormItem :name="`${model}.${index}.name`">
        <SpFormInput v-model:value="record.name" />
      </SpFormItem>
      <SpFormItem :name="`${model}.${index}.type`">
        <ComSelectGpoType v-model:value="record.type" />
      </SpFormItem>
      <SpFormItem
        :name="`${model}.${index}.value`"
        v-if="record.type === GPO_TYPE.STATUS"
        :label="$t('routes.device.setting.gpo.form.status')"
      >
        <ComSelectGpoStatus v-model:value="record.value" />
      </SpFormItem>
    </template>
  </SettingPanel>
</div>
</template>

<script setup lang="ts">
  import { computed, ref, inject, Ref } from 'vue';
  import SettingPanel from '/@/components/SpCard/setting.vue';
  import type { ScopeType } from '/@/components/SpCard/setting.vue';
  import { GPO_TYPE } from '../../../utils/enum';
  import { ComSelectGpoStatus, ComSelectGpoType } from '../../../utils/ComSelector';
  import { DeviceItem } from '/#/store';
  // table
  const { t } = useI18n();
  import { useI18n } from '/@/utils/hooks/web/useI18n';
  import SpFormItem, { SpFormInput } from '/@/components/SpForm/SpFormItem.vue';
  const activeDevice = inject<Ref<DeviceItem>>('active-device');
  console.log(activeDevice)
  activeDevice.value.configDesc.gpo.forEach(v=>{
    v.gpo = v.id
    v.type = GPO_TYPE.CONTROL
    v.value = v.id
  })
  const tableData = ref(activeDevice.value.configDesc.gpo)
  // const tableData = ref(
  //   new Array(8).fill(0).map((item, index) => ({
  //     gpo: `GPO_${index + 1}`,
  //     name: `GPO_${index + 1}`,
  //     type: GPO_TYPE.CONTROL,
  //     value: undefined,
  //   })),
  // );
  const tableCols = [
    { title: 'GPO', width: 100 },
    { title: 'Name', width: 300 },
    { title: '', width: 100 },
    { title: '', width: 'auto' },
  ];
</script>
<style scoped lang="less"></style>
