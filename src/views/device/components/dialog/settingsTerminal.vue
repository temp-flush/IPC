<template>
  <Modal v-bind="modalAttrs" :title="$t('routes.device.project.form.title')">
    <div class="p-5 overflow-y-auto max-h-xl">
      <div class="space-x-3 text-center">
        <Button @click="modalClose('group')">
          <template #icon><Icon icon="carbon:volume-up-filled-alt" /></template
          >{{ $t('routes.device.dialog.terminal.action.group') }}
        </Button>
        <Button @click="modalClose('area')">
          <template #icon><Icon icon="carbon:volume-down-filled-alt" /></template
          >{{ $t('routes.device.dialog.terminal.action.area') }}
        </Button>
      </div>
    </div>
  </Modal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Icon } from '/@/components/Icon';
  import { Modal, Button } from 'ant-design-vue';
  export { useDialog } from '/@/components/SpModal/useSpModal';
  import useSpModal, { genModalProps } from '/@/components/SpModal/useSpModal';
  export type DataType = 'group' | 'area';
  const modalProps = genModalProps<DataType>(String);
  export default defineComponent({
    components: {
      Button,
      Modal,
      Icon,
    },
    props: modalProps,
    setup(props) {
      const { modalAttrs, modalClose } = useSpModal(props);

      return { modalAttrs, modalClose };
    },
  });
</script>
