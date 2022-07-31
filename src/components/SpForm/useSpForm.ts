import { Form, message } from 'ant-design-vue';
import { ref, reactive, toRaw, unref } from 'vue';
import { useI18n } from '/@/utils/hooks/web/useI18n';

export default function <T extends Record<string, any>>(initFormState: T) {
  const refForm = ref<InstanceType<typeof Form>>();
  const formState = ref(initFormState);
  /**
   * get formData
   * @param  {String|Boolean}  formName                 el-from[ref] | validation=false
   * @param  {Boolean|{message:String}} validation      是否显示校验结果
   * @return {Object}                                   formData
   */
  async function getForm(validation: boolean | { message: string } = true): Promise<T> | never {
    const { t } = useI18n();

    if (!refForm.value) {
      throw new Error('Form 元素没找到');
    }
    console.log(formState.value);
    try {
      await (refForm.value as any).validate();
      return toRaw(unref(formState));
    } catch (error) {
      // console.log(111, error);

      const errMessage =
        (typeof validation === 'object' && validation.message) || t('component.form.invalid');

      validation && message.error(errMessage);
      throw new Error(errMessage);
    }
  }

  function resetForm() {
    formState.value = { ...initFormState };
  }
  function updateForm(data) {
    if (data) {
      formState.value = { ...data };
    }
  }

  return { getForm, refForm, formState, resetForm, updateForm };
}
