<template>
  <div>
    <SpFormSelect
      class="w-full"
      v-if="!!optionsSource?.length"
      v-model:value="source"
      :options="optionsSource"
    />
    <SpFormInput
      v-model:value="source"
      v-else-if="!!optionsSource"
      dialog
      @focus="dOpenAddSource(source)"
    />

    <Resetable>
      <DialogAddSource v-bind="dPropsAddSource" />
    </Resetable>
  </div>
</template>
<script lang="ts" setup>
  const props = defineProps({
    command: { type: String as PropType<EventCommand>, required: false, default: '' },
  });
  import { computed, ref, watch } from 'vue';
  import type { EventCommand } from '../../utils/enum';

  const emit = defineEmits(['update:value']);
  watch(
    () => props.command,
    () => {
      source.value = '';
      emit('update:value', source.value);
    },
  );

  // form
  import SpFormInput from '/@/components/SpForm/SpFormInput.vue';
  import SpFormSelect from '/@/components/SpForm/SpFormSelect.vue';
  const source = ref('');
  // Message/Music/All
  const optionsStop = [
    { value: 'Message', label: 'Message' },
    { value: 'Music', label: 'Music' },
    { value: 'All', label: 'All' },
  ];
  // Ch1-16/ALL
  const optionsBgm = [{ value: 'ALL', label: 'ALL' }].concat(
    new Array(16)
      .fill(0)
      .map((item, index) => ({ value: `Ch${(index + 1) * 10}`, label: `Ch${(index + 1) * 10}` })),
  );
  // Ch1-16/LOCAL/NC
  const optionsZone = [
    { value: 'LOCAL', label: 'LOCAL' },
    { value: 'NC', label: 'NC' },
  ].concat(
    new Array(16)
      .fill(0)
      .map((item, index) => ({ value: `Ch${index + 1}`, label: `Ch${index + 1}` })),
  );
  // INPUT_n
  const optionsGeneral = new Array(16)
    .fill(0)
    .map((item, index) => ({ value: `G${index + 1}`, label: `G${index + 1}` }));

  const optionsSource = computed(() => {
    switch (props.command) {
      case 'serverMusicSending':
      case 'serverMessageSending':
        return [];
      case 'stopServerSending':
        return optionsStop;
      case 'bgmInput':
        return optionsBgm;
      case 'zonesControl':
        return optionsZone;
      case 'generalInput':
        return optionsGeneral;
      default:
        return '';
    }
  });

  // dialog addSource
  import { useDialog, Resetable } from '/@/components/SpModal/useSpModal';
  import DialogAddSource, {
    DataType as DDTypeAddSource,
  } from '/@/views/device/settings/dialog/add-source.vue';
  const { dialogOpen: dOpenAddSource, dialogProps: dPropsAddSource } = useDialog<DDTypeAddSource>(
    (result: DDTypeAddSource) => {
      console.log(result);
      source.value = result[0];
      emit('update:value', result[0]);
    },
  );
</script>
<style lang="less" scoped></style>
