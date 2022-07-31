<template>
  <div class="flex">
    <div class="flex-1">
      <SpFormInput readonly :value="value" />
    </div>
    <div class="w-4 ml-2 text-left">
      <Icon icon="carbon:clear" @click="onClear" v-if="!!value" />
    </div>
    <div class="w-20 ml-3">
      <SpUpload v-bind="$attrs" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Icon } from '/@/components/Icon';

  export default defineComponent({
    inheritAttrs: false,
  });
</script>
<script setup lang="ts">
  import { SpFormInput } from '/@/components/SpForm/SpFormItem.vue';
  import SpUpload from './index.vue';

  const props = defineProps({
    value: { type: null },
  });
  const emit = defineEmits(['update:value']);
  function onClear() {
    emit('update:value', '');
  }
</script>

<style scoped></style>
