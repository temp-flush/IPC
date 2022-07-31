import { computed, h, Ref, ref, shallowRef, unref } from 'vue';
import { RequestFunction } from '/#/axios';
import { Expose as SpTableExpose } from '/@/components/SpTable/index.vue';
import { useI18n } from '/@/utils/hooks/web/useI18n';
import { useMessage } from '/@/utils/hooks/web/useMessage';
export type ColType = Readonly<
  ({ dataIndex: string } | { key: string }) & {
    title: string;
    width: number;
    slots?: { customRender: string };
    [index: string]: any;
  }
>;
export type RecordType<
  T extends Readonly<Readonly<{ dataIndex?: string; [index: string]: any }>[]>,
> = {
  [key in NonNullable<T[number]['dataIndex']>]: any;
} & {
  id: number;
};
export default function useSpTable<T, P extends ColType>({
  cols,
  request,
  remove,
}: {
  request: T[] | RequestFunction;
  cols: Readonly<P[]>;
  remove?: RequestFunction;
}) {
  // table
  const refTable = ref<SpTableExpose>();
  function tableQuery(params?: any) {
    refTable.value?.query(params);
  }
  console.log(remove);
  // select
  const selectKeys = ref<number[]>([]);
  const { createConfirmRemove } = useMessage();
  async function onRemove(params: any) {
    params.selectKeys = selectKeys.value;
    console.log(params, selectKeys);
    await createConfirmRemove();
    await remove?.(params);
    tableQuery();
  }
  function onAdd() {
    // 添加
    tableData.value.unshift({
      id: -1,
      isNew: true,
    });
  }
  // type DateItem = T extends Array<any> ? T : RecordType<Readonly<P[]>>;
  // const tableData = Array.isArray(request) ? computed(() => request) : shallowRef<T[]>([]);
  // const tableRequest = (async (params: any) => {
  //   if (Array.isArray(request)) {
  //     return unref(tableData);
  //   } else {
  //     const data = await request<T[]>(params);
  //     (tableData as Ref<T[]>).value = data;
  //     return data;
  //   }
  // }) as RequestFunction<T[]>;

  type DateItem = T extends Array<any> ? T : RecordType<Readonly<P[]>>;
  const tableData = ref<DateItem[]>([]);
  const tableRequest = Array.isArray(request)
    ? ((async (params: any) => {
        (tableData as Ref<T[]>).value = unref(request);
        return unref(request);
      }) as RequestFunction<T[]>)
    : ((async (params: any) => {
        const data = await request<T[]>(params);
        (tableData as Ref<T[]>).value = data;
        return data;
      }) as RequestFunction<T[]>);

  return {
    onAdd,
    onRemove,
    refTable,
    selectKeys,
    tableQuery,
    tableCols: cols,
    tableRequest,
    tableData,
  };
}
