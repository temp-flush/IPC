<template>
  <div>
    <!-- <RangePicker v-model:value="formState.duration" /> -->
    <SpFormInput v-model:value="duration" dialog @focus="dOpenDateRange(duration)" />
    <Resetable>
      <DialogDateRange v-bind="dPropsDateRange" />
    </Resetable>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';

  const emit = defineEmits(['update:value']);

  // form
  import SpFormInput from '/@/components/SpForm/SpFormInput.vue';
  const duration = ref();

  // dialog DateRange
  import DialogDateRange, {
    DataType as DDTypeDateRange,
  } from '/@/views/device/settings/dialog/date-range.vue';
  import { useDialog, Resetable } from '/@/components/SpModal/useSpModal';
  const { dialogOpen: dOpenDateRange, dialogProps: dPropsDateRange } = useDialog<DDTypeDateRange>(
    (result) => {
      console.log(result);
      emit('update:value', result);
    },
  );
</script>
<style lang="less" scoped></style>
