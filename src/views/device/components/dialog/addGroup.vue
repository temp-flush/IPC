<template>
  <Modal v-bind="modalAttrs" :title="$t('routes.device.group.dialog.title')">
    <div class="p-5 overflow-y-auto max-h-xl">
      <Form :model="formState" ref="refForm" :labelCol="{ span: 4 }" :wrapperCol="{ span: 16 }">
        <SpFormItem label="areaId" name="areaId" required>
          <SpFormInput v-model:value="formState.areaId" placeholder="请输入areaId" />
        </SpFormItem>
        <SpFormItem :label="$t('routes.device.group.form.name')" name="name" required>
          <SpFormInput v-model:value="formState.name" />
        </SpFormItem>
      </Form>
    </div>
  </Modal>
</template>
<script lang="ts">
  import { defineComponent, ref, inject } from 'vue';
  import { Modal, Form } from 'ant-design-vue';
  export { useDialog } from '/@/components/SpModal/useSpModal';
  import useSpModal, { genModalProps } from '/@/components/SpModal/useSpModal';
  import useSpForm from '/@/components/SpForm/useSpForm';
  import SpFormItem, { SpFormInput } from '/@/components/SpForm/SpFormItem.vue';
  import { DeviceItem } from '/#/store';
  import { deviceGroupAdd, deviceGroupInfo, deviceGroupUpdate } from '/@/serveices';

  export type DataType = DeviceItem;
  const modalProps = genModalProps<Partial<DataType>>(Object);

  export default defineComponent({
    components: {
      Modal,
      Form,
      SpFormItem,
      SpFormInput,
    },
    props: modalProps,
    setup(props) {
      const selectedKeys = inject('selectedKeys');
      const { formState, refForm, getForm, updateForm } = useSpForm({ name: '', areaId: '' });
      const { modalAttrs } = useSpModal(props, {
        open(data: any) {
          updateForm(data);
        },
        async done() {
          const formData = await getForm();
          console.log(formData);
          formData.areaId = formData.areaId * 1;
          formData.ownArea = '[]';
          formData.ownDevice = '[]';
          const realData = await deviceGroupAdd(formData);
          console.log(selectedKeys);
          const newData = await deviceGroupInfo(selectedKeys.value);
          console.log(newData, realData);
          newData.ownArea = JSON.stringify([...JSON.parse(newData.ownArea), realData.id]);
          console.log(newData);
          await deviceGroupUpdate(selectedKeys.value, {ownArea: newData.ownArea});
          return formData;
        },
      });

      const transferDataSource = ref<any[]>([]);

      return {
        transferDataSource,
        modalAttrs,
        formState,
        refForm,
      };
    },
  });
</script>
