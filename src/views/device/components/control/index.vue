<template>
  <SpContainer class="flex h-full" :re-calc="isShowFilter">
    <SpContainer class="bg-white rounded-2xl p-3" :class="{ 'w-90': isShowSettings }">
      <SpTable
        ref="refTable"
        :columns="tableCols"
        :data-source="tableData"
        :pagination="false"
        select-type="none"
        :select-keys="isShowSettings ? selectKeys : undefined"
        @update:select-keys="selectKeys = $event"
        :select-keys-disabled="(record) => record.onlineStatus"
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
    <div class="flex-1 ml-3" v-if="isShowSettings">
      <SettingsContent />
    </div>
  </SpContainer>
</template>

<script lang="ts">
  import { computed, defineComponent, provide, Ref, watch, watchEffect } from 'vue';
  export default defineComponent({
    name: 'ListDeviceControl',
  });
</script>
<script setup lang="ts">
  import { Icon } from '/@/components/Icon';
  import { inject, ref } from 'vue';
  import SpTable, { Expose as SpTableExpose } from '/@/components/SpTable/index.vue';

  const filterType = inject<Ref<string>>('filter-type');
  const isShowFilter = computed(() => filterType?.value === 'control');

  // table
  const { t } = useI18n();
  import { useDeviceStoreWithOut } from '/@/store/modules/device';
  import { filterDeviceType } from '/@/utils/hooks/web/useDevice';
  import { useI18n } from '/@/utils/hooks/web/useI18n';
  const deviceStore = useDeviceStoreWithOut();
  const tableData = computed(() => deviceStore.listControl);
  console.log(tableData)
  const tableCols = computed(() => {
    const cols = [
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
    ] as any[];
    !isShowSettings?.value &&
      cols.push(
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
      );
    return cols;
  });
  const refTable = ref<SpTableExpose>();
  const tableRowClassName = (record, index) => (isShowSettings?.value ? 'cursor-pointer' : null);
  const selectKeys = ref<number[]>([]);
  // todo remove
  // watchEffect(() => {
  //   tableData.value.length && toggleSettings(true);
  // });

  // settings
  import SettingsContent from '../../settings/index.vue';
  const isSS = inject<Ref<boolean>>('is-show-settings');
  const isShowSettings = computed(() => isShowFilter.value && isSS?.value);
  watchEffect(() => {
    selectKeys.value = isShowSettings?.value
      ? ([tableData.value.find((item: any) => item.onlineStatus)?.id].filter(Boolean) as any)
      : [];
  });
  const activeDevice = computed(() =>
    tableData.value.find((item) => item.id === selectKeys.value[0]),
  );
  provide('active-device', activeDevice);
  const emit = defineEmits(['update:device-name']);
  watchEffect(() => {
    emit('update:device-name', activeDevice.value?.name);
  });
</script>
<style scoped></style>
