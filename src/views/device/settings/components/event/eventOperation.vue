<template>
  <SpFormSelect
    class="w-full"
    v-if="!!optionsOperation"
    v-model:value="operation"
    :options="optionsOperation"
  />
</template>
<script lang="ts" setup>
  const props = defineProps({
    command: { type: String as PropType<EventCommand>, required: false },
  });
  import { computed, ref, watch } from 'vue';
  import type { EventCommand } from '../../utils/enum';
  // 1/repeat-1/repeat all
  const optionsMusic = [
    { value: '1', label: '1' },
    { value: 'repeat-1', label: 'repeat-1' },
    { value: 'repeat-all', label: 'repeat-all' },
  ];
  // 1/2 times/repeat-1
  const optionsMessage = [
    { value: '1', label: '1' },
    { value: '2 times', label: '2 times' },
    { value: 'repeat-1', label: 'repeat-1' },
  ];
  // MUTE/UNMUTE/10%-100%
  const optionsZone = [
    { value: 'MUTE', label: 'MUTE' },
    { value: 'UNMUTE', label: 'UNMUTE' },
  ].concat(
    new Array(10)
      .fill(0)
      .map((item, index) => ({ value: `${(index + 1) * 10}%`, label: `${(index + 1) * 10}%` })),
  );
  const optionsSwitch = [
    { value: 'on', label: 'on' },
    { value: 'off', label: 'off' },
  ];
  const emit = defineEmits(['update:value']);
  // form
  import SpFormSelect from '/@/components/SpForm/SpFormSelect.vue';
  const operation = ref('');
  watch(operation, () => {
    console.log(operation.value);
    // operation.value = '';
    emit('update:value', operation.value);
  });
  const optionsOperation = computed(() => {
    switch (props.command) {
      case 'serverMusicSending':
        return optionsMusic;
      case 'serverMessageSending':
        return optionsMessage;
      case 'zonesControl':
        return optionsZone;
      case 'bgmInput':
      case 'generalInput':
        return optionsSwitch;
      default:
        return '';
    }
  });
</script>
<style lang="less" scoped></style>
