<template>
  <SpContainer class="w-full">
    <template #header="{ spRef }">
      <div class="setting-header" :ref="spRef">
        <div class="flex-1">
          <RadioGroup class="space-x-4 w-full clearfix" v-bind="$attrs">
            <slot name="tabs"></slot>
          </RadioGroup>
        </div>
        <div class="space-x-6 pt-2 pl-18">
          <Icon icon="settings-export|svg" size="28" />
          <Icon icon="settings-import|svg" size="28" />
        </div>
      </div>
    </template>
    <SpContainer class="px-5 pt-3 overflow-y-auto relative" full>
      <div v-if="sticky" class="bg-[#b9bec3] h-3 -mx-5 -mt-3 w-auto -top-3 z-1 sticky"></div>
      <slot></slot>
    </SpContainer>
  </SpContainer>
</template>
<script lang="ts">
  import { defineComponent, h } from 'vue';
  export const SpRadioButton = function (props, context: { attrs: any; slots: any }) {
    return h(
      RadioButton,
      { ...context.attrs, class: 'radio-button ' + (context.attrs.class ?? '') },
      context.slots,
    );
  };
  Object.defineProperty(SpRadioButton, 'name', { writable: true, value: 'SpRadioButton' });
  export default defineComponent({
    inheritAttrs: false,
    props: {
      sticky: { type: Boolean, default: true },
    },
  });
</script>

<script lang="ts" setup>
  import { RadioButton, RadioGroup } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';

  // active-settings
  // provide('active-setting', activeKey);
</script>

<style lang="less">
  .radio-button {
    @apply border-solid rounded-md h-auto bg-[#606B70] text-lg w-auto py-1 px-14 !border-l !border-[#C2B8B9] !text-white before:hidden !important;

    &.ant-radio-button-wrapper-checked {
      @apply bg-primary-active !border-gray-300 !important;
    }

    &.ant-radio-button-wrapper-disabled {
      @apply bg-[#EEEEEF] !border-gray-300 !text-[#b9bec3] !important;
    }
  }
</style>

<style lang="less" scoped>
  .setting-header {
    @apply bg-white flex min-w-[800px] w-full py-6 px-18;
    box-shadow: 0 3px 0 0 rgb(0 0 0 / 10%), 0 2px 4px -2px #606b70;
  }
</style>
