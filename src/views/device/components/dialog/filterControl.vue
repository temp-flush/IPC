<template>
  <Modal v-bind="modalAttrs" :title="$t('routes.device.project.form.title')">
    <div class="p-5 overflow-y-auto max-h-xl">
      <CheckboxGroup v-model:value="checkedList" class="w-full">
        <List item-layout="horizontal" :data-source="dataList">
          <template #renderItem="{ item }">
            <ListItem>
              <div class="flex items-center gap-2 w-full px-2">
                <Checkbox :value="item.id" />
                <Icon icon="carbon:volume-up-filled" />
                <div
                  class="
                    flex-1
                    overflow-ellipsis
                    whitespace-nowrap
                    text-left
                    overflow-hidden
                    min-w-0
                  "
                >
                  {{ item.name }}
                </div>
              </div>
            </ListItem>
          </template>
        </List>
      </CheckboxGroup>
    </div>
  </Modal>
</template>
<script lang="ts">
  import { defineComponent, ref, toRaw } from 'vue';
  import { Icon } from '/@/components/Icon';
  import { Modal, List, ListItem, CheckboxGroup, Checkbox } from 'ant-design-vue';
  export { useDialog } from '/@/components/SpModal/useSpModal';
  import useSpModal, { genModalProps } from '/@/components/SpModal/useSpModal';
  import { DeviceItem } from '/#/store';
  import { useDeviceStoreWithOut } from '/@/store/modules/device';

  export type DataType = DeviceItem;
  const modalProps = genModalProps<DataType>(Object);
  export default defineComponent({
    components: {
      Icon,
      List,
      ListItem,
      Modal,
      CheckboxGroup,
      Checkbox,
    },
    props: modalProps,
    setup(props) {
      const deviceStore = useDeviceStoreWithOut();
      const dataList = deviceStore.listControl;
      const { modalAttrs } = useSpModal(props, {
        open(data = []) {
          checkedList.value = data.map((item) => item.id);
        },
        done() {
          const ids = toRaw(checkedList.value);
          return dataList?.filter((item) => ids.includes(item.id!));
        },
      });

      const checkedList = ref<number[]>([]);

      return { modalAttrs, dataList, checkedList };
    },
  });
</script>
