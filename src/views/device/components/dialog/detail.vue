<template>
  <Modal v-bind="modalAttrs" :title="$t('routes.device.detect.form.title')">
    <div class="p-5">
      <Form :model="formState" ref="refForm" :labelCol="{ span: 4 }" :wrapperCol="{ span: 16 }">
        <SpFormItem :label="$t('routes.device.detect.form.name')" name="name" required>
          <SpFormInput v-model:value="formState.name" />
        </SpFormItem>
        <SpFormItem :label="$t('routes.device.detect.form.type')" name="type">
          <SpFormInput v-model:value="formState.type" />
        </SpFormItem>
        <SpFormItem :label="$t('routes.device.detect.form.id')" name="id">
          <SpFormInput v-model:value="formState.id" />
        </SpFormItem>
        <SpFormItem :label="$t('routes.device.detect.form.mac')" name="mac">
          <SpFormInput v-model:value="formState.network.mac" />
        </SpFormItem>
        <SpFormItem :label="$t('routes.device.detect.form.version')" name="version">
          <SpFormInput v-model:value="formState.version" />
        </SpFormItem>
        <SpFieldSet :legend="'IP'">
          <SpFormItem
            name="ip_mode"
            :label="$t('routes.device.detect.form.dhcp')"
            hide-label
          >
            <RadioGroup v-model:value="formState.network.ip_mode">
              <Radio value="static">{{ $t('routes.device.detect.form.dhcpFalse') }}</Radio>
              <Radio :value="true">{{ $t('routes.device.detect.form.dhcpTrue') }}</Radio>
            </RadioGroup>
          </SpFormItem>
          <SpFormItem :label="$t('routes.device.detect.form.ip')" name="ip" v-if="formState.network.ip_mode == 'static'">
            <SpFormInput v-model:value="formState.network.ip" />
          </SpFormItem>
          <SpFormItem :label="$t('routes.device.detect.form.submask')" name="netmask"  v-if="formState.network.ip_mode == 'static'">
            <SpFormInput v-model:value="formState.network.netmask" />
          </SpFormItem>
          <SpFormItem :label="$t('routes.device.detect.form.gateway')" name="gateway" class="!mb-0"  v-if="formState.network.ip_mode == 'static'">
            <SpFormInput v-model:value="formState.network.gateway" />
          </SpFormItem>
        </SpFieldSet>
      </Form>
    </div>
  </Modal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Form, Modal, RadioGroup, Radio } from 'ant-design-vue';
  import SpFormItem, { SpFormInput } from '/@/components/SpForm/SpFormItem.vue';
  import useSpForm from '/@/components/SpForm/useSpForm';
  import useSpModal, { genModalProps } from '/@/components/SpModal/useSpModal';
  import { DeviceItem } from '/#/store';
  export { useDialog } from '/@/components/SpModal/useSpModal';
  import SpFieldSet from '/@/components/SpFieldSet/index.vue';

  export type DataType = DeviceItem;
  const modalProps = genModalProps<DataType>(Object);
  export default defineComponent({
    components: {
      Modal,
      Form,
      RadioGroup,
      Radio,
      SpFormItem,
      SpFormInput,
      SpFieldSet,
    },
    props: modalProps,
    setup(props) {
      const { formState, refForm, getForm, updateForm } = useSpForm({} as DataType);
      console.log(formState)
      const { modalAttrs } = useSpModal(props, {
        open: updateForm,
        done: getForm,
      });

      return { refForm, formState, modalAttrs };
    },
  });
</script>
