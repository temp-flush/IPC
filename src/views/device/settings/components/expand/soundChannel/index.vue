<template>
  <div class="space-y-5">
    <Form
      layout="inline"
      :model="formState"
      ref="refForm"
      :colon="false"
      size="small"
      hide-required-mark
    >
      <SpFormItem
        name="duration"
        required
        :rules="{ type: 'number' }"
        :labelCol="{ span: 10 }"
        :label="$t('routes.device.setting.expand.form.id')"
      >
        <SpFormInput size="small" number v-model:value="formState.id" @onChange="onIdChange" />
      </SpFormItem>
    </Form>
    <PanelInput />
    <div class="flex gap-5">
      <PanelGpi class="w-118" />
      <PanelGpo class="flex-1" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import PanelInput from '../../can/soundChannel/panel-input.vue';
  import PanelGpi from '../../can/soundChannel/panel-gpi.vue';
  import PanelGpo from '../../can/soundChannel/panel-gpo.vue';

  import { useI18n } from '/@/utils/hooks/web/useI18n';
  import { Form } from 'ant-design-vue';
  import { deviceExpandSave } from '/@/serveices';

  // form
  import useSpForm from '/@/components/SpForm/useSpForm';
  import SpFormInput from '/@/components/SpForm/SpFormInput.vue';
  const { formState, refForm, getForm, updateForm } = useSpForm<{ id?: number }>({
    id: undefined,
  });
  async function onIdChange() {
    const formData = await getForm();
    await deviceExpandSave(formData);
  }
</script>
<style scoped lang="less"></style>
