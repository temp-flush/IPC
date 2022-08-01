<template>
  <div>
    <SpFormInput v-model:value="weeks" dialog @focus="dOpenAddWeek({ days: weeks })" />
    <Resetable>
      <DialogAddWeek v-bind="dPropsAddWeek" v-model:checked="props.value" />
    </Resetable>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';

  const emit = defineEmits(['update:value']);
  const props = defineProps({
    value: {
      type: String,
      require: true,
    },
  });
  console.log(props);
  // form
  import SpFormInput from '/@/components/SpForm/SpFormInput.vue';
  const weeks = ref();
  // dialog addWeek
  import { useDialog, Resetable } from '/@/components/SpModal/useSpModal';
  import DialogAddWeek, {
    DataType as DDTypeAddWeek,
  } from '/@/views/device/settings/dialog/add-week.vue';

  const { dialogOpen: dOpenAddWeek, dialogProps: dPropsAddWeek } = useDialog<DDTypeAddWeek>(
    (result: DDTypeAddWeek) => {
      console.log(JSON.stringify(result.days));
      weeks.value = result.days;
      emit('update:value', JSON.stringify(result.days));
    },
  );
</script>
<style lang="less" scoped></style>
