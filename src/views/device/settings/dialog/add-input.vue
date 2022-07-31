<template>
  <Modal v-bind="modalAttrs" class="specialM" title="Setting">
    <div class="p-5">
      <Form :model="formState" ref="refForm" :labelCol="{ span: 2 }">
        <SpFormItem name="days" hide-label :label="$t('routes.device.setting.week.form.days')">
          <CheckboxGroup class="group" v-model:value="formState.days" :options="weekDays" />
        </SpFormItem>
      </Form>
    </div>
  </Modal>
</template>
<script lang="ts">
  import { defineComponent, watchEffect, watch } from 'vue';
  import { Form, Modal, CheckboxGroup, Checkbox } from 'ant-design-vue';
  import SpFormItem from '/@/components/SpForm/SpFormItem.vue';
  import useSpForm from '/@/components/SpForm/useSpForm';
  import useSpModal, { genModalProps } from '/@/components/SpModal/useSpModal';
  import { useI18n } from '/@/utils/hooks/web/useI18n';
  export { useDialog } from '/@/components/SpModal/useSpModal';
  import SpFieldSet from '/@/components/SpFieldSet/index.vue';

  const initData = {
    everyDay: false,
    repeat: false,
    days: [] as string[],
  };
  export type DataType = typeof initData;
  const modalProps = genModalProps<DataType>(Object);
  export default defineComponent({
    components: {
      Modal,
      Form,
      CheckboxGroup,
      Checkbox,
      SpFormItem,
      SpFieldSet,
    },
    props: modalProps,
    setup(props) {
      const { formState, refForm, getForm, updateForm } = useSpForm({
        ...initData,
      } as DataType);

      const { modalAttrs } = useSpModal(props, {
        open: updateForm,
        done: getForm,
      });
      const { t } = useI18n();
      const weekDays = [
        { label: 'input1', value: 'input1' },
        { label: 'input2', value: 'input2' },
        { label: 'input3', value: 'input3' },
        { label: 'input4', value: 'input4' },
      ];

      watch(
        () => formState.value.days.length,
        () => {
          formState.value.everyDay = formState.value.days.length === 7;
        },
      );
      watch(
        () => formState.value.everyDay,
        () => {
          if (formState.value.everyDay) {
            formState.value.days = weekDays.map((item) => item.value);
          } else {
            formState.value.days = [];
          }
        },
      );

      return { refForm, formState, modalAttrs, weekDays };
    },
  });
</script>
<style lang="less">
  .specialM .group {
    display: flex;
    flex-direction: column;
    margin-left: 20%;
    margin-top: 2%;
  }
  .specialM .ant-modal-title {
    color: white !important;
  }
  .specialM .group > label {
    margin-bottom: 6px;
  }
</style>
