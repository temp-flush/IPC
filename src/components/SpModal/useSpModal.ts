/*********************************
 ************ Dialog *************
 *********************************/

import { ref, nextTick, watch, computed, inject, h } from 'vue';
import type { PropType } from 'vue';
import { Button } from 'ant-design-vue';
export { default as Resetable } from '/@/components/SpHelper/Resetable.vue';

export interface ModalProps<T = any> {
  data?: T;
  modelValue: boolean;
  'onUpdate:modelValue'?: (value: boolean) => any;
  onDone?: (data: T) => any;
}

export function genModalProps<T = any>(dataType?: any) {
  return {
    data: { type: dataType as PropType<T> },
    modelValue: { type: Boolean, required: true, default: false },
    'onUpdate:modelValue': { type: Function as PropType<(value: boolean) => any> },
    onDone: { type: Function as PropType<(data: T) => any> },
  };
}

export function useDialog<T = any>(onDone?: (data: any) => any) {
  const dialogProps = ref<ModalProps>({
    data: undefined,
    modelValue: false,
    'onUpdate:modelValue'(value: boolean) {
      dialogProps.value.modelValue = value;
    },
    onDone,
  });
  return {
    dialogProps,
    dialogOpen(data?: ModalProps<T>['data'], onDone?: (data: any) => any) {
      Object.assign(dialogProps.value, { data }, onDone && { onDone });
      console.log(111111111, data, onDone);
      dialogProps.value.modelValue = true;
    },
  };
}

// 点 ‘X’ 关闭时是否确认
export default function (
  modalProps: ModalProps,
  opts?: {
    open?: (data?: ModalProps['data']) => any;
    done?: () => any;
    sonFn?: () => any;
    silent?: boolean;
  },
) {
  const resetSelf = inject('resetSelf', function () {
    throw new Error('expect be wrapped by component "Resetable"');
  });
  const confirmLoading = ref(false);
  const modalAttrs = computed(() => {
    if (modalProps.type === 'users') {
      return {
        ref: 'dialog',
        width: 600,
        closable: false,
        maskClosable: false,
        visible: modalProps.modelValue,
        onOk: modalOk,
        confirmLoading: confirmLoading.value,
        onCancel: () => modalClose(),
        destroyOnClose: false,
        footer: h('div', { style: { display: 'flex' } }, [
          h('div', { style: { flex: 1, 'text-align': 'left' } }, [
            h(
              Button,
              {
                onClick: () => {
                  opts.sonFn()?.add();
                },
              },
              '增加',
            ),
            h(
              Button,
              {
                onClick: () => {
                  opts.sonFn()?.del();
                },
              },
              '删除',
            ),
          ]),
          h('div', { style: { flex: 1 } }, [
            h(
              Button,
              {
                onClick: () => {
                  modalClose();
                },
              },
              '取消',
            ),
            h(Button, '确定'),
          ]),
        ]),
      };
    } else {
      return {
        ref: 'dialog',
        width: 600,
        closable: false,
        maskClosable: false,
        visible: modalProps.modelValue,
        onOk: modalOk,
        confirmLoading: confirmLoading.value,
        onCancel: () => modalClose(),
        destroyOnClose: false,
      };
    }
  });

  watch(
    () => modalProps.modelValue,
    (value: boolean) => {
      value && opts?.open?.(modalProps.data);
      value || resetSelf();
    },
  );

  async function modalOk() {
    confirmLoading.value = true;
    try {
      const data = await opts?.done?.();
      modalClose(data);
    } finally {
      nextTick(() => (confirmLoading.value = false));
    }
  }

  function modalClose(data?: any) {
    // 给父页面传递参数
    data && modalProps.onDone?.(data);
    modalProps['onUpdate:modelValue']?.(false);
  }

  return {
    modalAttrs,
    modalClose,
    modalOk,
    confirmLoading,
  };
}
