<template>
  <div>
    <SpFormInput v-model:value="gpo" v-if="showGpo" dialog @focus="dOpenAddGpo(gpo)" />
    <Resetable>
      <DialogAddGpo v-bind="dPropsAddGpo" />
    </Resetable>
  </div>
</template>
<script lang="ts" setup>
  const props = defineProps({
    command: { type: String as PropType<EventCommand>, required: false, default: '' },
  });
  console.log(props, props.value);
  import { computed, ref, watch } from 'vue';
  import type { EventCommand } from '../../utils/enum';
  const showCommands: EventCommand[] = [
    'serverMusicSending',
    'serverMessageSending',
    'generalInput',
    'zonesControl',
    'gpo',
    'stopServerSending',
  ];
  const showGpo = computed(() => {
    return !!props.command && showCommands.includes(props.command);
  });

  const emit = defineEmits(['update:value']);
  watch(
    () => props.command,
    () => {
      gpo.value = '';
      emit('update:value', gpo.value);
    },
  );

  // form
  import SpFormInput from '/@/components/SpForm/SpFormInput.vue';
  const gpo = ref('');

  // dialog addGpo
  import { useDialog, Resetable } from '/@/components/SpModal/useSpModal';
  import DialogAddGpo, {
    DataType as DDTypeAddGpo,
  } from '/@/views/device/settings/dialog/add-gpo.vue';
  const { dialogOpen: dOpenAddGpo, dialogProps: dPropsAddGpo } = useDialog<DDTypeAddGpo>(
    (result: DDTypeAddGpo) => {
      console.log(result);
      gpo.value = result[0].gpo;
      emit('update:value', result[0].gpo);
    },
  );
</script>
<style lang="less" scoped></style>
