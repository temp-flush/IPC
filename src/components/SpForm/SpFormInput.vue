<template>
  <component
    :is="attrs.type === 'number' ? InputNumber : Input"
    :placeholder="placeholder"
    v-bind="attrs"
    @focus="onFocusSp"
  />
</template>
<script lang="ts">
  export default defineComponent({
    name: 'SpFormInput',
  });
</script>
<script lang="ts" setup>
  import { Input, InputNumber } from 'ant-design-vue';
  import { defineComponent, inject } from 'vue';
  import { useAttrs } from '/@/utils/hooks/core/useAttrs';
  const attrs = useAttrs() as any;
  // console.log(attrs);

  const props = defineProps({
    onFocus: { type: Function },
    dialog: { type: Boolean },
  });

  function onFocusSp(event: any) {
    props.onFocus?.(event);
    props.dialog && event.target?.blur?.();
  }

  const placeholder = inject<string | undefined>('placeholder', '');
</script>
