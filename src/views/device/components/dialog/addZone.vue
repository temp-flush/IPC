<template>
  <Modal v-bind="modalAttrs" :title="$t('routes.device.zone.action.add')">
    <div class="p-5 overflow-y-auto max-h-xl">
      <SpTable
        :data-source="tableData"
        :columns="tableCols"
        v-if="modelValue"
        v-model:select-keys="selectKeys"
      />
    </div>
  </Modal>
</template>
<script lang="ts">
  import { computed, defineComponent, ref } from 'vue';
  import { Modal } from 'ant-design-vue';
  export { useDialog } from '/@/components/SpModal/useSpModal';
  import useSpModal, { genModalProps } from '/@/components/SpModal/useSpModal';
  import SpTable from '/@/components/SpTable/index.vue';

  export type DataType = never;
  const modalProps = genModalProps<DataType>(Object);

  import { useDeviceStoreWithOut } from '/@/store/modules/device';
  import { useI18n } from '/@/utils/hooks/web/useI18n';
  import { filterDeviceType } from '/@/utils/hooks/web/useDevice';

  export default defineComponent({
    components: {
      Modal,
      SpTable,
    },
    props: modalProps,
    setup(props) {
      const selectKeys = ref([11] as number[]);
      const { modalAttrs } = useSpModal(props, {
        open(data: DataType) {},
        async done() {
          return tableData.value.filter((item) => selectKeys.value.includes(item.id));
        },
      });
      const deviceStore = useDeviceStoreWithOut();
      const tableData = computed(() => deviceStore.listTerminal);
      const { t } = useI18n();
      const tableCols = [
        { dataIndex: 'name', title: t('routes.device.detect.form.name'), width: 120 },
        {
          dataIndex: 'type',
          title: t('routes.device.detect.form.type'),
          width: 60,
          formatter: filterDeviceType,
        },
        {
          dataIndex: 'id',
          title: t('routes.device.detect.form.id'),
          width: 50,
        },
      ];
      return {
        modalAttrs,
        tableData,
        tableCols,
        selectKeys,
      };
    },
  });
</script>
