<template>
  <FormItem ref="formItem" class="sp-form-item" :rules="rulesMerge" :label="hideLabel ? '' : label">
    <slot></slot>
    <template #label>
      <slot name="label"></slot>
    </template>
  </FormItem>
</template>
<script lang="ts">
  export { default as SpFormInput } from './SpFormInput.vue';
  export { default as SpFormSelect } from './SpFormSelect.vue';
  export default defineComponent({ name: 'SpFormItem' });
</script>
<script lang="ts" setup>
  import { computed, defineComponent, provide, useSlots } from 'vue';
  import { FormItem } from 'ant-design-vue';
  import { RuleItem } from 'asyncValidator';

  const actionMap = {
    select: '选择',
    input: '输入',
  } as any;

  const props = defineProps({
    rules: { type: [Object, Array] as PropType<RuleItem | RuleItem[]> },
    label: { type: String },
    hideLabel: { type: Boolean },
    action: { type: String as PropType<'select' | 'input'> },
    required: { type: Boolean, default: () => undefined },
  });

  // placeholder
  const slots = useSlots();
  const placeholder = computed(() => {
    const ruleList = [props.rules].flat().filter(Boolean);
    const requiredMessage = props.required && ruleList.length && ruleList[0]?.message;
    if (requiredMessage) return requiredMessage;
    // console.log((slots as any)?.default());

    const tagType =
      props.action ??
      // ((this
      //   .$scopedSlots as any)?.default?.() as VNode).componentOptions?.tag?.toLowerCase()
      (slots as any)?.default()[0]?.type?.name?.toLowerCase();
    const actionType = tagType && Object.keys(actionMap).find((item) => tagType.includes(item));

    return `请${actionMap[actionType ?? 'select']}` + (props.label ?? '');
  });
  provide('placeholder', placeholder.value);

  // rules
  const rulesMerge = computed(() => {
    const ruleList = [props.rules].flat().filter(Boolean);

    // 如果 required 必填
    if (props.required !== undefined) {
      ruleList.length === 0 && ruleList.unshift({ required: props.required });
      const { message = placeholder.value, required = props.required, ...item } = ruleList[0] ?? {};
      ruleList[0] = { ...item, message, required };
    }

    return ruleList.map((item = {} as RuleItem) => {
      const { trigger = 'change', message: msg, ...other } = item;
      const message = msg ?? (item.required !== undefined ? placeholder.value : msg);
      return { ...other, trigger, message };
    });
  });

  // const refFormItem = ref<InstanceType<typeof FormItem>>();
  // watch(rulesMerge, () => {
  //   // nextTick(() => refFormItem.value?.validate('change'));
  // });
</script>

<style lang="less" scoped></style>
