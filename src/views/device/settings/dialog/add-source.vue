<template>
  <Modal v-bind="modalAttrs" :title="$t('routes.device.setting.source.dialog.title')">
    <div class="p-5 overflow-y-auto max-h-xl">
      <SpTable
        ref="refTable"
        :data-source="tableRequest"
        :columns="tableCols"
        v-model:select-keys="selectKeys"
        select-type="radio"
      />
    </div>
  </Modal>
</template>
<script lang="ts">
  import { computed, defineComponent, ref, toRaw, unref } from 'vue';
  import { Modal } from 'ant-design-vue';
  export { useDialog } from '/@/components/SpModal/useSpModal';
  import useSpModal, { genModalProps } from '/@/components/SpModal/useSpModal';
  import SpTable, { useSpTable } from '/@/components/SpTable/index.vue';

  export type DataType = string;
  const modalProps = genModalProps<DataType>(String);

  import { useI18n } from '/@/utils/hooks/web/useI18n';
  import { deviceAudioFileGet } from '/@/serveices';

  export default defineComponent({
    components: {
      Modal,
      SpTable,
    },
    props: modalProps,
    setup(props) {
      const { modalAttrs } = useSpModal(props, {
        open(data: DataType) {},
        async done() {
          return toRaw(unref(selectKeys.value));
        },
      });
      const { t } = useI18n();

      const { tableRequest, refTable, tableCols, selectKeys } = useSpTable({
        request: deviceAudioFileGet,
        cols: [
          {
            dataIndex: 'name',
            title: t('routes.device.setting.audioFile.form.name'),
            width: 72,
          },
          {
            dataIndex: 'size',
            title: t('routes.device.setting.audioFile.form.size'),
            width: 58,
          },
          {
            dataIndex: 'duration',
            title: t('routes.device.setting.audioFile.form.duration'),
            width: 60,
          },
        ],
      });
      return {
        modalAttrs,
        tableRequest,
        refTable,
        tableCols,
        selectKeys,
      };
    },
  });
</script>
