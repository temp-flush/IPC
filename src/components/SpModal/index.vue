<template>
  <Modal v-bind="modalAttrs">
    <slot></slot>
  </Modal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { ref, nextTick, inject, computed } from 'vue';
  import type { PropType } from 'vue';
  import { Modal } from 'ant-design-vue';
  import { ModalProps, genModalProps } from './useSpModal';

  export { ModalProps, genModalProps };
  export function genModalAttrs({ data, ...modalAttrs }: ModalProps) {
    return { modalAttrs };
  }

  export default defineComponent({
    name: 'SpModal',
    components: { Modal },
    props: {
      modelValue: { type: Boolean, required: true, default: false },
      // eslint-disable-next-line vue/prop-name-casing
      'onUpdate:modelValue': { type: Function as PropType<(value: boolean) => any> },
      onDone: { type: Function as PropType<(data: any) => any> },
      open: { type: Function },
      save: { type: Function },
    },
    emits: ['done', 'update:modelValue'],
    setup(props, { emit, attrs }) {
      const resetSelf = inject('resetSelf', function () {
        throw new Error('expect be wrapped by component "Resetable"');
      });

      const loading = ref(true);

      const modalAttrs = computed(() => {
        return {
          ...attrs,
          ref: 'dialog',
          width: '500',
          closable: false,
          maskClosable: false,
          visible: props.modelValue,
          loading: loading.value,
          onOk: modalOk,
          onCancel: modalClose,
          onVisibleChange: (value: boolean) => {
            value ? props.open?.() : nextTick(() => resetSelf());
          },
        };
      });

      function modalChangeLoading() {
        loading.value = false;
        nextTick(() => (loading.value = true));
      }

      async function modalOk() {
        modalChangeLoading();
        await props.save?.();
        modalClose();
      }

      function modalClose(data?: any) {
        // 给父页面传递参数
        data && emit('done', data);
        emit('update:modelValue', false);
      }
      return {
        modalAttrs,
      };
    },
  });
</script>
