<template>
  <div class="space-y-5">
    <PanelPriority />
    <PanelEmergency />
    <PanelAudioFile />
    <PanelInput />
    <div class="flex gap-5">
      <PanelGpi class="w-118" />
      <PanelGpo class="flex-1" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import PanelPriority from './panel-priority.vue';
  import PanelEmergency from './panel-emergency.vue';
  import PanelAudioFile from './panel-audio-file.vue';
  import PanelInput from './panel-input.vue';
  import PanelGpi from './panel-gpi.vue';
  import PanelGpo from './panel-gpo.vue';
</script>
<style scoped lang="less"></style>
