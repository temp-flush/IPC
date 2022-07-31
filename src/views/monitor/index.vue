<template>
  <SpContainer class="flex h-full">
    <SpContainer class="bg-white rounded-2xl p-3 w-90">
      <SpTable
        ref="refTable"
        :columns="tableCols"
        :data-source="tableData"
        :pagination="false"
        select-type="none"
        v-model="selectKeys"
        :select-keys-disabled="(record) => !record.onlineStatus"
        :rowClassName="tableRowClassName"
      >
        <template #name="{ record }">
          <div class="flex">
            <div class="mr-2"><Icon class="mt-1" :icon="`d-${record.type}|img`" size="16" /></div>
            <div class="flex-1">
              {{ record.name }}
            </div>
          </div>
        </template>
        <template #status="{ record }">
          <Icon icon="status-net|svg" v-if="record.onlineStatus" />
        </template>
      </SpTable>
    </SpContainer>
    <div class="flex-1 ml-3">
      <Settings />
    </div>
  </SpContainer>
</template>

<script setup lang="ts">
  import { computed, provide, ref, watchEffect } from 'vue';
  import { Icon } from '/@/components/Icon';
  import SpTable, { Expose as SpTableExpose } from '/@/components/SpTable/index.vue';
  import Settings from './components/settings.vue';

  // table
  const { t } = useI18n();
  import { useDeviceStoreWithOut } from '/@/store/modules/device';
  import { useI18n } from '/@/utils/hooks/web/useI18n';
  const deviceStore = useDeviceStoreWithOut();
  const tableData = computed(() => deviceStore.listControl);
  const tableCols = [
    {
      dataIndex: 'name',
      title: t('routes.device.detect.form.name'),
      width: 30,
      slots: { customRender: 'name' },
    },
    {
      dataIndex: 'onlineStatus',
      title: t('routes.device.detect.form.onlineStatus'),
      width: 14 * 2,
      slots: { customRender: 'status' },
      align: 'center',
    },
  ];
  const refTable = ref<SpTableExpose>();
  const tableRowClassName = (record, index) => 'cursor-pointer';
  const selectKeys = ref<number[]>([]);

  // settings
  watchEffect(() => {
    selectKeys.value = [tableData.value.find((item: any) => item.onlineStatus)?.id].filter(
      Boolean,
    ) as any;
  });
  const activeDevice = computed(() =>
    tableData.value.find((item) => item.id === selectKeys.value[0]),
  );
  provide('active-device', activeDevice);
</script>
<style scoped></style>
