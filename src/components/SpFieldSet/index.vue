<template>
  <div class="border border-black border-opacity-50 relative p-4 siblings:mt-6">
    <div class="absolute p-2 -top-5 bg-[#eeeeef]">{{ legend }}</div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'SpFieldSet',
    props: {
      legend: { type: String, required: true },
    },
    setup(props) {},
  });
</script>
