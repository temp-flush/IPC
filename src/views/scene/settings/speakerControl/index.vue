<template>
  <SpCard thin :title="$t('routes.scene.setting.speakerControl.title')">
    <div class="flex py-15 px-[20%]">
      <div class="flex-1 text-center">
        <div class="space-y-3 mb-6">
          <Button class="!bg-[#57585a] !w-16" size="small" :disabled="localValue">
            <template #icon> <Icon icon="bx:bx-up-arrow" color="#fff" /> </template>
          </Button>
          <div class="m-auto bg-[#b9bec3] w-30">90</div>
          <Button class="!bg-[#57585a] !w-16" size="small" :disabled="localValue">
            <template #icon> <Icon icon="bx:bx-down-arrow" color="#fff" /> </template>
          </Button>
        </div>
        <Button @click="switchLocal" class="w-30 !bg-[green]">LOCAL</Button>
      </div>
      <div class="flex-1 text-center">
        <div class="space-y-3 mb-6">
          <Button class="!bg-[#57585a] !w-16" size="small" :disabled="volumnValue">
            <template #icon> <Icon icon="bx:bx-up-arrow" color="#fff" /> </template>
          </Button>
          <div class="m-auto bg-[#b9bec3] w-30">90</div>
          <Button class="!bg-[#57585a] !w-16" size="small" :disabled="volumnValue">
            <template #icon> <Icon icon="bx:bx-down-arrow" color="#fff" /> </template>
          </Button>
        </div>
        <Button @click="switchVolumn" class="w-30 !bg-[red]">MUTE</Button>
      </div>
    </div>
  </SpCard>
</template>

<script setup lang="ts">
  import { Button } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';

  import { ref } from 'vue';
  const localValue = ref(false);
  function switchLocal() {
    localValue.value = !localValue.value;
  }
  const volumnValue = ref(false);
  function switchVolumn() {
    volumnValue.value = !volumnValue.value;
  }
</script>
<style scoped lang="less"></style>
