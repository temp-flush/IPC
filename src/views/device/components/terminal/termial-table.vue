<template>
  <SpTable ref="refTable" :columns="tableCols" :data-source="tableData" :pagination="false">
    <template #name="{ record }">
      <div class="flex">
        <div class="mr-2"><Icon class="mt-1" :icon="`tree-zone|svg`" size="16" /></div>
        <div class="flex-1">
          {{ record.name }}
        </div>
      </div>
    </template>
    <template #transfer="{ record }">
      <div class="cursor-pointer inline-block" @click="idChecked(record)">
        [<span :class="{ 'opacity-0': !idsGroup.has(record.id) }"> &lt; </span>]
      </div>
    </template>
  </SpTable>
</template>

<script setup lang="ts">
  import { Icon } from '/@/components/Icon';

  const props = defineProps({
    group: { type: Object },
  });

  // add zone
  import { message } from 'ant-design-vue';
  const idsGroup = ref(new Map());
  function idChecked(record: DeviceItem) {
    console.log(props.group, record);

    if (!props.group || props.group?.type === DEVICE_TYPE.TERMINAL) {
      return message.warn(t('routes.device.zone.tip.add'));
    }
    !idsGroup.value.has(record.id)
      ? idsGroup.value.set(record.id, '')
      : idsGroup.value.delete(record.id);
  }
  // table
  import SpTable from '/@/components/SpTable/index.vue';
  import { useDeviceStoreWithOut } from '/@/store/modules/device';
  import { DEVICE_TYPE } from '/@/enums/deviceEnum';
  import { computed, ref } from 'vue';
  import { DeviceItem } from '/#/store';
  const deviceStore = useDeviceStoreWithOut();
  const tableData = computed(() => deviceStore.listTerminal);
  import { useI18n } from '/@/utils/hooks/web/useI18n';
  import { filterDeviceType } from '/@/utils/hooks/web/useDevice';
  const { t } = useI18n();
  const tableCols = [
    {
      dataIndex: 'name',
      title: t('routes.device.detect.form.name'),
      width: 30,
      slots: { customRender: 'name' },
    },
    {
      dataIndex: 'type',
      title: t('routes.device.detect.form.type'),
      width: 30,
      formatter: filterDeviceType,
    },
    { dataIndex: 'id', title: t('routes.device.detect.form.id'), width: 30 },
    { dataIndex: 'ip', title: t('routes.device.detect.form.ip'), width: 30 },
    { dataIndex: 'mac', title: t('routes.device.detect.form.mac'), width: 44 },
    { dataIndex: 'version', title: t('routes.device.detect.form.version'), width: 44 },
    {
      dataIndex: 'transfer',
      title: t('routes.device.detect.form.transfer'),
      width: 30,
      align: 'center',
      slots: { customRender: 'transfer' },
    },
  ];
</script>
<style scoped></style>
