<template>
  <Modal v-bind="modalAttrs" :title="$t('routes.device.zone.action.add')">
    <div class="p-5 overflow-y-auto max-h-xl">
      <SpTree
        :selectable="!multiple"
        :checkable="multiple"
        @Load="onLoadData"
        :data-srouce="dataList"
        v-model:checkedKeys="checkedKeys"
      />
    </div>
  </Modal>
</template>
<script lang="ts">
  import { defineComponent, ref, toRaw, unref, computed } from 'vue';
  import { Modal } from 'ant-design-vue';
  export { useDialog } from '/@/components/SpModal/useSpModal';
  import useSpModal, { genModalProps } from '/@/components/SpModal/useSpModal';

  import SpTree from '/@/components/SpTree/index.vue';

  export type DataType = string;
  const modalProps = genModalProps<DataType>(String);

  import { useRequest } from '/@/utils/hooks/core/useRequest';
  import { deviceGroupGet, deviceGroupInfo } from '/@/serveices';

  export default defineComponent({
    components: {
      Modal,
      SpTree,
    },
    props: { ...modalProps, multiple: { type: Boolean } },
    setup(props) {
      const { modalAttrs } = useSpModal(props, {
        open(data: DataType) {},
        async done() {
          return toRaw(unref(checkedKeys.value));
        },
      });

      // tree
      let {
        data: dataList,
        loading,
        run: deviceGroupGetRun,
      } = useRequest<any[]>(deviceGroupGet, { autoRun: true, isTree: true });
      console.log(dataList);
      console.log(dataList.value)
      const checkedKeys = ref<string[]>([]);
      const onLoadData = (treeNode) => {
        let allChild = [];
        const allId = JSON.parse(treeNode.dataRef.ownArea);
        treeNode.dataRef.children = [];
        if (allId.length) {
          allId.length &&
            allId.forEach((id) => {
              allChild.push(deviceGroupInfo(id));
            });
          Promise.all(allChild).then((res) => {
            treeNode.dataRef.children = [];
            console.log(res);
            res.forEach((item) => {
              item.data = {
                id: item.id,
                name: item.name,
              };
              item.key = item.id;
              item.parentId = treeNode.dataRef.id;
              item.title = item.name;
              const { type, id } = item.data;
              item.selectable = isShowSettings?.value
                ? type === DEVICE_TYPE.TERMINAL
                : type !== DEVICE_TYPE.TERMINAL;
              treeNode.dataRef.children = [...treeNode.dataRef.children, item];
            });
            dataList.value = [...(dataList.value ?? [])];
          });
        } else {
          return new Promise((resolve) => {
            if (treeNode.dataRef.children) {
              resolve();
              return;
            }
          });
        }
        console.log(treeNode.dataRef);
      };
      return {
        modalAttrs,
        dataList,
        checkedKeys,
        onLoadData,
      };
    },
  });
</script>
