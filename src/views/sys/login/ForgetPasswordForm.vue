<template>
  <template v-if="getShow">
    <!-- <LoginFormTitle class="enter-x" /> -->
    <Form
      class="p-4 enter-x"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
      :model="formData"
      :rules="getFormRules"
      ref="formRef"
    >
      <FormItem name="account" label="用户名称" class="">
        <Input
          size="large"
          v-model:value="formData.account"
          :placeholder="t('sys.login.userName')"
        />
      </FormItem>

      <FormItem name="sys" label="输入新密码" class="enter-x">
        <Input size="large" v-model:value="formData.sys" :placeholder="t('sys.login.mobile')" />
      </FormItem>
      <FormItem name="ensureSys" label="再次输入密码" class="enter-x">
        <Input size="large" v-model:value="formData.ensureSys" :placeholder="t('sys.login.mobile')" />
      </FormItem>

      <!-- <FormItem class="enter-x">
        <Button type="primary" size="large" block @click="handleReset" :loading="loading">
          {{ t('common.resetText') }}
        </Button>
        <Button size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </Button>
      </FormItem> -->
    </Form>
  </template>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed, unref } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Form, Input, Button } from 'ant-design-vue';
  import { CountdownInput } from '/@/components/CountDown';
  import { useI18n } from '/@/utils/hooks/web/useI18n';
  import { useLoginState, useFormRules, LoginStateEnum } from './useLogin';

  const FormItem = Form.Item;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    account: '',
    sys: '',
    ensureSys: '',
    sms: '',
  });

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD);

  async function handleReset() {
    const form = unref(formRef);
    console.log(form.getFieldsValue());
    if (!form) return;
    await form.resetFields();
  }
  defineExpose({
    handleReset,
  });
</script>
