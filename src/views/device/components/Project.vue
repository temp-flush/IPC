<template>
  <SpContainer class="flex flex-col h-full p-4">
    <template #header="{ spRef }">
      <div :ref="spRef" class="flex">
        <div class="flex space-x-3 mr-3 px-3 w-90">
          <Icon
            icon="filter-control|img"
            @click="switchType('control')"
            :class="{ active: isControl }"
            class="!h-8.5 !w-10"
          />
          <Icon
            icon="filter-terminal|img"
            @click="switchType('terminal')"
            :class="{ active: !isControl }"
            class="!h-8.5 !w-10"
          />
          <div id="sider-metra" class="flex-1"></div>
        </div>
        <div class="flex-1 px-6">
          <div class="grid grid-cols-10">
            <div class="col-span-9">
              <Form :label-col="{ span: 1 }" :wrapper-col="{ span: 8 }">
                <SpFormItem
                  v-if="!isShowSettings"
                  :label="$t('routes.device.terminal.tree.title')"
                  label-align="left"
                  class="last:mb-0"
                >
                  <SpFormInput value="某某某项目" />
                </SpFormItem>
                <SpFormItem
                  v-else
                  :label="$t('routes.device.setting.label')"
                  label-align="left"
                  class="last:mb-0"
                >
                  <div id="active-device-name">{{ activeDeviceName }}</div>
                </SpFormItem>
              </Form>
            </div>
            <div class="text-right">
              <Icon
                icon="settings|svg"
                @click="toggleSettings(true)"
                size="24"
                v-if="!isShowSettings"
              />
              <Icon v-else icon="return|svg" @click="toggleSettings(false)" size="24" />
            </div>
          </div>
        </div>
      </div>
    </template>
    <SpContainer class="flex-1 mt-3" v-if="isMounted">
      <keep-alive>
        <component v-model:device-name="activeDeviceName" :is="ComContent" />
      </keep-alive>
    </SpContainer>
  </SpContainer>
</template>

<script setup lang="ts">
  import { Icon } from '/@/components/Icon';
  import ListControl from './control/index.vue';
  import ListTerminal from './terminal/index.vue';
  import { computed, onMounted, provide, ref } from 'vue';
  import SpContainer from '/@/components/SpContainer/index.vue';

  const isMounted = ref(false);
  onMounted(() => {
    isMounted.value = true;
  });

  const isControl = computed(() => filterType.value === 'control');
  const ComContent = computed(() => (isControl.value ? ListControl : ListTerminal));
  const filterType = ref('control');
  const switchType = (type) => {
    filterType.value = type;
    toggleSettings(false);
  };
  provide('filter-type', filterType);

  // settings
  const isShowSettings = ref(false);
  const toggleSettings = (value: boolean) => {
    isShowSettings.value = value;
  };
  provide('is-show-settings', isShowSettings);

  // form
  import { Form } from 'ant-design-vue';
  import SpFormInput from '/@/components/SpForm/SpFormInput.vue';

  const activeDeviceName = ref('');
</script>
<style scoped></style>
