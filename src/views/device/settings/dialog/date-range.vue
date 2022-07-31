<template>
  <Modal v-bind="modalAttrs" :title="$t('routes.device.setting.dateRange.title')">
    <div class="p-5">
      <Form :model="formState" ref="refForm" :labelCol="{ span: 4 }" :wrapperCol="{ span: 16 }">
        <SpFieldSet :legend="$t('routes.device.setting.dateRange.form.range')">
          <SpFormItem :label="$t('routes.device.setting.dateRange.form.start')" name="startDate">
            <DatePicker
              v-model:value="formState.startDate"
              :disabled-date="maxDate"
              valueFormat="YYYY-MM-DD"
            />
          </SpFormItem>
          <SpFormItem
            :label="$t('routes.device.setting.dateRange.form.end')"
            name="endDate"
            valueFormat="YYYY-MM-DD"
          >
            <DatePicker v-model:value="formState.endDate" :disabled-date="minDate" />
          </SpFormItem>
        </SpFieldSet>
        <SpFieldSet :legend="$t('routes.device.setting.dateRange.form.rules')">
          <div class="flex">
            <SpFormItem name="holiday" class="flex-1" hide-label>
              <SpFormSelect v-model:value="formState.holiday" :options="optionsHoliday" />
            </SpFormItem>
            <SpFormItem name="summerTime" class="flex-1" hide-label>
              <SpFormSelect v-model:value="formState.summerTime" :options="optionsSummerTime" />
            </SpFormItem>
          </div>
        </SpFieldSet>
      </Form>
    </div>
  </Modal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Form, Modal, DatePicker } from 'ant-design-vue';
  import SpFormItem from '/@/components/SpForm/SpFormItem.vue';
  import SpFormSelect from '/@/components/SpForm/SpFormSelect.vue';
  import useSpForm from '/@/components/SpForm/useSpForm';
  import useSpModal, { genModalProps } from '/@/components/SpModal/useSpModal';
  import { useI18n } from '/@/utils/hooks/web/useI18n';
  export { useDialog } from '/@/components/SpModal/useSpModal';
  import SpFieldSet from '/@/components/SpFieldSet/index.vue';
  import type { Moment } from 'moment';
  import moment from 'moment';

  const initData = {
    startDate: '',
    endDate: '',
    holiday: 'on',
    summerTime: '',
  };
  export type DataType = typeof initData;
  const modalProps = genModalProps<DataType>(Object);
  export default defineComponent({
    components: {
      Modal,
      Form,
      SpFormItem,
      SpFormSelect,
      DatePicker,
      SpFieldSet,
    },
    props: modalProps,
    setup(props) {
      const { formState, refForm, getForm, updateForm } = useSpForm({ ...initData } as DataType);
      const { t } = useI18n();
      const optionsHoliday = [
        { value: 'on', label: t('routes.device.setting.dateRange.form.holidayOn') },
        { value: 'off', label: t('routes.device.setting.dateRange.form.holidayOff') },
      ];

      const optionsSummerTime = new Array(5).fill(0).map((item, index) => ({
        value: index + 1,
        label: `${t('routes.device.setting.dateRange.form.summerTime')}+${index + 1}`,
      }));

      const { modalAttrs } = useSpModal(props, {
        open: updateForm,
        async done() {
          const formData = await getForm();
          console.log(props)
          props.onDone(formData.startDate)
        },
      });
      const maxDate = (current: Moment) => {
        return current && current > moment(formState.value.endDate).endOf('day');
      };
      const minDate = (current: Moment) => {
        return current && current < moment(formState.value.startDate).endOf('day');
      };

      return {
        refForm,
        formState,
        modalAttrs,
        optionsSummerTime,
        optionsHoliday,
        maxDate,
        minDate,
      };
    },
  });
</script>
