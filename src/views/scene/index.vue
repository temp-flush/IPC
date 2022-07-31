<template>
  <SpContainer class="h-full pt-10">
    <SpContainer class="h-full bg-[#b9bec3] p-5">
      <template #header="{ spRef }">
        <div :ref="spRef" class="flex">
          <div class="mr-3 px-3">
            <Icon icon="filter-terminal|img" :class="{ active: true }" class="!h-8.5 !w-10" />
          </div>
        </div>
      </template>
      <SpContainer class="flex">
        <SpContainer class="bg-white rounded-md px-3 pt-1">
          <template #header="{ spRef }">
            <div :ref="spRef" class="bg-[#b9bec3] m-2 py-1 px-4">
              <Checkbox class="mr-3">{{ $t('routes.device.terminal.tree.title') }}</Checkbox>
            </div>
          </template>
          <SpContainer full class="overflow-y-auto">
            <SpTree
              @select="onTreeSelect"
              :data-srouce="dataList"
              :selectedKeys="selectedKeys"
              v-model:checkedKeys="checkedKeys"
              v-model:expanded-keys="expandedKeys"
            />
          </SpContainer>
        </SpContainer>
        <div class="flex-1 ml-3">
          <Settings />
        </div>
      </SpContainer>
    </SpContainer>
  </SpContainer>
</template>

<script setup lang="ts">
  import Settings from './settings/index.vue';
  import { Checkbox } from 'ant-design-vue';
  import { computed, onMounted, provide, ref, watchEffect } from 'vue';
  import { DEVICE_TYPE } from '/@/enums/deviceEnum';
  import { Icon } from '/@/components/Icon';

  // tree
  import SpTree, { unpackTreeData } from '/@/components/SpTree/index.vue';

  import { useDeviceStoreWithOut } from '/@/store/modules/device';
  const deviceStore = useDeviceStoreWithOut();
  const dataList = computed(() => deviceStore.listGroups);

  const expandedKeys = ref<number[]>([]);
  const activeDeviceNode = ref();
  // console.log(activeDeviceNode)
  const selectedKeys = computed(() => [activeDeviceNode.value?.key].filter(Boolean));
  function onTreeSelect(keys: number[], { node }: any) {
    activeDeviceNode.value = node.dataRef;
  }

  // action
  const checkedKeys = ref([]);

  // settings
  const unpackDataList = computed(() => unpackTreeData(dataList.value ?? []));
  watchEffect(() => {
    activeDeviceNode.value = unpackDataList.value?.find(
      (item) => item.data?.type === DEVICE_TYPE.TERMINAL,
    );
  });
  const activeDevice = computed(() => activeDeviceNode.value?.data);
  provide('active-device', activeDevice);
  const emit = defineEmits(['update:device-name']);
  watchEffect(() => {
    emit('update:device-name', activeDevice.value?.name);
  });

  onMounted(() => {
    const keysSet = new Set(expandedKeys.value);
    let key = activeDeviceNode.value?.key;
    while (key) {
      keysSet.add(key);
      const node = unpackDataList.value?.find((item) => item.key === key);
      key = node?.parentId;
    }

    expandedKeys.value = Array.from(keysSet);
  });
</script>
<style scoped></style>
