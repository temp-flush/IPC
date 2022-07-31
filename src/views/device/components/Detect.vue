<template>
  <SpContainer class="flex flex-col h-full p-4">
    <template #header="{ spRef }">
      <div :ref="spRef" class="flex px-3">
        <Icon
          class="!h-8.5 !w-10"
          icon="detect|img"
          @click="deviceDetectStart()"
          :active="loading"
          :disabled="loading"
        />
      </div>
    </template>
    <SpContainer class="flex-1">
      <SpContainer class="bg-white rounded-2xl mt-3 p-3">
        <SpTable :columns="tableCols" :data-source="tableData" :pagination="false">
          <template #name="{ record }">
            <div class="flex">
              <div class="mr-2"><Icon class="mt-1" :icon="`d-${record.type}|img`" size="16" /></div>
              <div class="flex-1">
                {{ record.name }}
              </div>
            </div>
          </template>
          <template #action="{ record }">
            <div class="space-x-4">
              <Icon icon="settings|svg" @click="dOpenDetail(record)" />
            </div>
          </template>
          <template #project="{ record }">
            <div>
              <Checkbox :checked="idsProject.has(record.id)" @change="idChecked($event, record)" />
            </div>
          </template>
        </SpTable>
      </SpContainer>
    </SpContainer>
    <Resetable>
      <DialogDetail v-bind="dPropsDetail" />
    </Resetable>
  </SpContainer>
</template>

<script setup lang="ts">
  import { Icon } from '/@/components/Icon';
  import { useRequest } from '/@/utils/hooks/core/useRequest';
  import { useI18n } from '/@/utils/hooks/web/useI18n';
  import SpTable from '/@/components/SpTable/index.vue';
  import { Checkbox } from 'ant-design-vue';

  import { useDeviceStoreWithOut } from '/@/store/modules/device';
  import { deviceAdd, deviceRemove, deviceUpdate } from '/@/serveices';
  const deviceStore = useDeviceStoreWithOut();
  const tableData = computed(() => deviceStore.listDetect);

  // project
  const idsProject = ref(new Set());
  function idChecked(value: any, record: DeviceItem) {
    console.log(value.target.checked, record.id);
    if (value.target.checked) {
      const { loading, run: deviceDetectStart } = useRequest(
        async () => {
          const data = await deviceAdd(record);
          deviceStore.getList();
          return data;
        },
        { autoRun: true },
      );
    } else {
      const { loading, run: deviceDetectStart } = useRequest(
        async () => {
          const data = await deviceRemove(record.id);
          deviceStore.getList();
          return data;
        },
        { autoRun: true },
      );
    }
    value.target.checked ? idsProject.value.add(record.id) : idsProject.value.delete(record.id);
  }

  // detect
  const { loading, run: deviceDetectStart } = useRequest(
    async () => {
      const data = await deviceDetect();
      deviceStore.getList();
      return data;
    },
    { autoRun: false },
  );

  /*
    - Name 名称
    - Type 类型
    - ID ID
    - IP IP
    - MAC MAC
    - Info 信息
  */
  import { deviceDetect } from '/@/serveices';
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
    { dataIndex: 'network.ip', title: t('routes.device.detect.form.ip'), width: 30 },
    { dataIndex: 'network.mac', title: t('routes.device.detect.form.mac'), width: 44 },
    { dataIndex: 'version', title: t('routes.device.detect.form.version'), width: 44 },
    {
      dataIndex: 'project',
      title: t('routes.device.detect.form.project'),
      width: 30,
      align: 'center',
      slots: { customRender: 'project' },
    },
    {
      dataIndex: 'info',
      title: t('routes.device.detect.form.info'),
      width: 14 * 2,
      align: 'center',
      slots: { customRender: 'action' },
    },
  ];

  // dialog detail
  import DialogDetail, { DataType as DDTypeDetail } from './dialog/detail.vue';
  const { dialogOpen: dOpenDetail, dialogProps: dPropsDetail } = useDialog<DDTypeDetail>(
    (result: DDTypeDetail) => {
      console.log(result);
      const { loading, run: deviceDetectStart } = useRequest(
        async () => {
          const data = await deviceUpdate(result);
          deviceStore.getList();
          return data;
        },
        { autoRun: true },
      );
    },
  );

  import { useDialog, Resetable } from '/@/components/SpModal/useSpModal';
  import { filterDeviceType } from '/@/utils/hooks/web/useDevice';
  import { computed, ref } from 'vue';
  import { DeviceItem } from '/#/store';
</script>
<style scoped></style>
