<template>
  <Select @select="changeS" :placeholder="placeholder" v-bind="attrs">
    <slot></slot>
  </Select>
</template>
<script lang="ts">
  export default defineComponent({
    name: 'SpFormSelect',
  });
</script>
<script lang="ts" setup>
  import { Select } from 'ant-design-vue';
  import { defineComponent, inject } from 'vue';
  const placeholder = inject<string | undefined>('placeholder', '');
  import { useAttrs } from '/@/utils/hooks/core/useAttrs';
  const attrs = useAttrs() as any;
  const emit = defineEmits(['update:value']);
  const changeS = (v) => {
    emit('update:value', v);
  };
</script>
