<template>
  <Modal v-bind="modalAttrs" :title="activeTitle">
    <div class="max-h-xl p-5 overflow-y-auto">
      <component :is="activeForm" :ref="childRef" />
    </div>
  </Modal>
</template>
<script lang="ts">
  import { computed, defineComponent, ref, nextTick, onMounted } from 'vue';
  import { Modal, Button } from 'ant-design-vue';
  export { useDialog } from '/@/components/SpModal/useSpModal';
  import useSpModal, { genModalProps } from '/@/components/SpModal/useSpModal';
  import { DeviceItem } from '/#/store';
  import ForgetPasswordForm from '/@/views/sys/login/ForgetPasswordForm.vue';
  import UserList from '/@/views/user/index.vue';
  import { useI18n } from '/@/utils/hooks/web/useI18n';
  import { LoginStateEnum, useLoginState } from '/@/views/sys/login/useLogin';
  export type DataType = DeviceItem;
  const modalProps = genModalProps<Partial<DataType>>(Object);
  export default defineComponent({
    components: {
      Modal,
      Button,
      ForgetPasswordForm,
      UserList,
    },
    props: {
      type: { type: String as PropType<'password' | 'users'> },
      ...modalProps,
    },
    setup(props) {
      let itemRef = ref();
      const childRef = el => {
        if (el) {
          itemRef = el
        }
      };
      // props 为type
      const { modalAttrs } = useSpModal(props, {
        open(data: any) {},
        async done() {
          if (activeForm.value == 'ForgetPasswordForm') {
            console.log(2222222222222, activeForm.value, itemRef?.handleReset());
          }
        },
        sonFn: () => {
          return itemRef;
        },
      });
      // useSpModal moadal属性
      const { setLoginState, getLoginState } = useLoginState();
      const transferDataSource = ref<any[]>([]);
      const { t } = useI18n();
      const activeForm = computed(() => {
        switch (props.type) {
          case 'password':
            setLoginState(LoginStateEnum.RESET_PASSWORD);
            return 'ForgetPasswordForm';
          default:
            return 'UserList';
        }
      });
      const activeTitle = computed(() => {
        switch (props.type) {
          case 'password':
            return t('sys.login.forgetFormTitle');
          default:
            return t('routes.user.title');
        }
      });
      return {
        transferDataSource,
        modalAttrs,
        activeForm,
        activeTitle,
        childRef,
      };
    },
  });
</script>
