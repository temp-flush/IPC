<template>
  <Modal v-bind="modalAttrs" :title="$t('routes.device.setting.gpo.dialog.title')">
    <div class="p-5 overflow-y-auto max-h-xl">
      <SpTable
        ref="refTable"
        :data-source="tableRequest"
        :columns="tableCols"
        v-model:select-keys="selectKeys"
        :select-keys-disabled="unselectable"
      >
        <template #action="{ record }">
          <Switch
            v-if="selectKeys.includes(record.id)"
            checked-children="on"
            un-checked-children="off"
            v-model:checked="editableData[record.id].status"
          />
        </template>
      </SpTable>
    </div>
  </Modal>
</template>
<script lang="ts">
  import { computed, defineComponent, reactive, ref, toRaw, UnwrapRef, watchEffect } from 'vue';
  import { Modal, Switch } from 'ant-design-vue';
  export { useDialog } from '/@/components/SpModal/useSpModal';
  import useSpModal, { genModalProps } from '/@/components/SpModal/useSpModal';
  import SpTable, { useSpTable } from '/@/components/SpTable/index.vue';
  import type { RecordType } from '/@/components/SpTable/index.vue';

  export type DataType = string;
  const modalProps = genModalProps<DataType>(String);

  import { useI18n } from '/@/utils/hooks/web/useI18n';
  import { deviceGpoGet } from '/@/serveices';
  import { cloneDeep } from 'lodash-es';
  import { GPO_TYPE } from '../utils/enum';

  export default defineComponent({
    components: {
      Modal,
      SpTable,
      Switch,
    },
    props: modalProps,
    setup(props) {
      const { modalAttrs } = useSpModal(props, {
        open(data: DataType) {},
        async done() {
          return selectKeys.value.map((id) => toRaw(editableData)[id]);
        },
      });
      const { t } = useI18n();

      const { tableRequest, refTable, tableCols, selectKeys, tableData } = useSpTable({
        request: deviceGpoGet,
        cols: [
          {
            dataIndex: 'gpo',
            title: t('routes.device.setting.gpo.form.gpo'),
            width: 58,
          },
          {
            dataIndex: 'name',
            title: t('routes.device.setting.gpo.form.name'),
            width: 72,
          },
          {
            dataIndex: 'status',
            title: t('routes.device.setting.gpo.form.action'),
            width: 60,
            slots: { customRender: 'action' },
          },
        ] as const,
      });
      type ScopeType = {
        record: RecordType<typeof tableCols> & { type: GPO_TYPE };
        text: string;
      };
      const editableData: UnwrapRef<Record<string, ScopeType['record']>> = reactive({});

      watchEffect(() => {
        selectKeys.value.forEach((key) => {
          if (!(key in editableData)) {
            editableData[key] = cloneDeep(
              (tableData.value as ScopeType['record'][]).filter((item) => key === item.id)[0],
            );
            editableData[key].status = false;
          }
        });
      });

      function unselectable(record: ScopeType['record']) {
        return record.type === GPO_TYPE.STATUS;
      }

      return {
        modalAttrs,
        tableRequest,
        refTable,
        tableCols,
        selectKeys,
        editableData,
        unselectable,
      };
    },
  });
</script>
