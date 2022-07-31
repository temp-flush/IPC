<template>
  <Table
    :columns="tableColumns"
    :data-source="tableData"
    :pagination="pagination"
    :scroll="{ x: '100%', y: pagination ? 'max-content' : maxHeight ?? true }"
    :row-key="rowKey"
    :row-selection="
      !selectKeys
        ? null as any
        : {
            selectedRowKeys: selectKeys,
            onChange: onSelectChange,
            columnWidth:selectType==='none'?0: '24px',
            fixed: true,
            type: selectType==='none'?'radio':selectType,
            hideDefaultSelections:selectType!=='checkbox',
            getCheckboxProps(record){
              return {hidden:selectType==='none',disabled:selectKeysDisabled?.(record)}
            }
          }
    "
    :customRow="
      (record) => ({
        onClick: () => onRowClick(record),
        class:
          selectKeys && selectKeysDisabled?.(record) ? 'cursor-not-allowed grayscale filter' : '',
      })
    "
  >
    <template #[slot]="scope" v-for="slot in slotsKey" :key="slot">
      <slot :name="slot" v-bind="scope"></slot>
    </template>
  </Table>
</template>
<script lang="ts">
  import { createTextVNode, defineComponent, useSlots, watchEffect } from 'vue';
  export default defineComponent({
    name: 'SpTable',
  });
  export type Expose = {
    query: (args?: Record<string, any | undefined> & { page?: number }) => void;
  };
  export { default as useSpTable } from './useSpTable';
  export type { RecordType } from './useSpTable';
</script>
<script lang="ts" setup>
  import { computed, defineEmits } from 'vue';
  import { useRequest } from '/@/utils/hooks/core/useRequest';
  import { Table } from 'ant-design-vue';
  import { RequestFunction } from '/#/axios';
  import useScrollContainer from '/@/utils/hooks/web/useScrollContainer';
  import { ColType } from './useSpTable';

  const props = defineProps({
    columns: { type: Array as PropType<Readonly<ColType[]>>, default: () => [], required: true },
    dataSource: {
      type: [Array, Function] as PropType<RequestFunction | any[]>,
      default: () => [],
      required: true,
    },
    // loading: { type: Boolean },
    pagination: { type: Boolean, default: false },
    rowKey: { type: String, default: 'id' },
    selectKeysDisabled: { type: Function as PropType<(record: any) => boolean> },
    selectKeys: { type: Array as PropType<number[]> },
    selectType: { type: String as PropType<'checkbox' | 'radio' | 'none'>, default: 'checkbox' },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:selectKeys': { type: Function as PropType<(value: number[]) => any> },
  });

  const {
    data: tableData,
    run,
    loading,
  } = useRequest<any[]>(
    async function <P>(
      args = {} as Record<string, any | undefined> & { page?: number },
    ): Promise<P> {
      const { page, ...params } = args;
      const data =
        typeof props.dataSource === 'function'
          ? await props.dataSource(params)
          : Array.isArray(props.dataSource)
          ? props.dataSource.slice(0)
          : props.dataSource;
      return data;
    },
    { autoRun: false },
  );
  watchEffect(() => {
    if (props.dataSource) run();
  });
  defineExpose({ query: run });

  const tableColumns = computed(() => {
    return props.columns.map(({ formatter, ...item }) => {
      const customRender = formatter && (({ text }) => createTextVNode(formatter(text)));
      return {
        customRender,
        ...item,
      };
    });
  });
  const slotsKey = Object.keys(useSlots());

  // select
  function onSelectChange(ids: number[]) {
    props['onUpdate:selectKeys']?.(ids);
  }
  function onRowClick(record: any) {
    if (props.selectType !== 'none') return;
    !props.selectKeysDisabled?.(record) && onSelectChange([record[props.rowKey]]);
  }

  // max-height
  const { contentHeight: maxHeight } = useScrollContainer({ offset: 31 });
</script>
<style lang="less" scoped>
  :deep(.ant-table-thead > tr > th) {
    overflow: hidden;

    white-space: nowrap;
    text-overflow: ellipsis;

    background-color: #b9bec3;
  }

  /* prettier-ignore */
  :deep(.ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td),
  :deep(.ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td),
  :deep(.ant-table-thead > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td),
  :deep(.ant-table-tbody > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td ) {
    background-color: #dcdddd;
  }

  :deep(.ant-table-tbody > tr.cursor-not-allowed:hover > td) {
    background-color: transparent !important;
  }

  :deep(.ant-table-thead > tr > th),
  :deep(.ant-table-tbody > tr > td) {
    padding-top: 4px;
    padding-bottom: 4px;
  }
</style>
