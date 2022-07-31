<template>
  <Modal v-bind="modalAttrs" :title="$t('routes.device.setting.week.form.title')">
    <div class="p-5">
      <Form :model="formState" ref="refForm" :labelCol="{ span: 0 }">
        <SpFieldSet :legend="$t('routes.device.setting.week.panel.repeat')">
          <div class="clearfix">
            <SpFormItem class="float-left whitespace-nowrap !mr-2" name="everyDay">
              <Checkbox v-model:checked="formState.everyDay">{{
                $t('routes.device.setting.week.form.everyDay')
              }}</Checkbox>
            </SpFormItem>
            <SpFormItem class="float-left whitespace-nowrap" name="repeat">
              <Checkbox v-model:checked="formState.repeat">{{
                $t('routes.device.setting.week.form.repeat')
              }}</Checkbox>
            </SpFormItem>
          </div>
          <SpFormItem
            name="days"
            required
            hide-label
            :label="$t('routes.device.setting.week.form.days')"
            :rules="{ type: 'array' }"
          >
            <CheckboxGroup v-model:value="formState.days" :options="weekDays" />
          </SpFormItem>
        </SpFieldSet>
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
        { label: t('routes.device.setting.week.form.sun'), value: 'sun' },
        { label: t('routes.device.setting.week.form.mon'), value: 'mon' },
        { label: t('routes.device.setting.week.form.tue'), value: 'tue' },
        { label: t('routes.device.setting.week.form.wed'), value: 'wed' },
        { label: t('routes.device.setting.week.form.thu'), value: 'thu' },
        { label: t('routes.device.setting.week.form.fri'), value: 'fri' },
        { label: t('routes.device.setting.week.form.sat'), value: 'sat' },
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
