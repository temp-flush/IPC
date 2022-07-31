<template>
  <div>
    <Modal v-bind="modalAttrs" :visible="true" :footer="null" :title="$t('sys.login.loginButton')">
      <div class="max-h-xl p-5 overflow-y-auto">
        <LoginForm />
      </div>
    </Modal>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Modal } from 'ant-design-vue';
  export { useDialog } from '/@/components/SpModal/useSpModal';
  import useSpModal, { genModalProps } from '/@/components/SpModal/useSpModal';
  import { DeviceItem } from '/#/store';
  import LoginForm from '/@/views/sys/login/LoginForm.vue';

  export type DataType = DeviceItem;
  const modalProps = genModalProps<Partial<DataType>>(Object);

  export default defineComponent({
    components: {
      Modal,
      LoginForm,
    },
    props: {
      type: { type: String as PropType<'password' | 'users'> },
      ...modalProps,
    },
    setup(props) {
      const { modalAttrs } = useSpModal(props, {
        open(data: any) {},
        async done() {},
      });

      return {
        modalAttrs,
      };
    },
  });
</script>
