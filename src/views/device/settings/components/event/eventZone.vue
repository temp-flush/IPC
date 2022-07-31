<template>
  <div>
    <SpFormInput v-model:value="zones" v-if="showZone" dialog @focus="dOpenAddZone(zones)" />
    <Resetable>
      <DialogAddZone v-bind="dPropsAddZone" :multiple="multiple" />
    </Resetable>
  </div>
</template>
<script lang="ts" setup>
  const props = defineProps({
    command: { type: String as PropType<EventCommand>, required: false, default: '' },
    multiple: { type: Boolean },
  });
  import { computed, ref, watch } from 'vue';
  import type { EventCommand } from '../../utils/enum';
  const showCommands: EventCommand[] = [
    'serverMusicSending',
    'serverMessageSending',
    'zonesControl',
    'generalInput',
  ];
  const showZone = computed(() => {
    return !!props.command && showCommands.includes(props.command);
  });

  const emit = defineEmits(['update:value']);
  watch(
    () => props.command,
    () => {
      emit('update:value', zones.value);
    },
  );

  // form
  import SpFormInput from '/@/components/SpForm/SpFormInput.vue';
  const zones = ref('');

  // dialog addZone
  import { useDialog, Resetable } from '/@/components/SpModal/useSpModal';
  import DialogAddZone, {
    DataType as DDTypeAddZone,
  } from '/@/views/device/settings/dialog/add-zone.vue';
  const { dialogOpen: dOpenAddZone, dialogProps: dPropsAddZone } = useDialog<DDTypeAddZone>(
    (result: DDTypeAddZone) => {
      zones.value = result;
      console.log(result);
      emit('update:value', result);
    },
  );
</script>
<style lang="less" scoped></style>
