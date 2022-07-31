<template>
  <div class="flex h-full">
    <SpContainer class="bg-white rounded-lg mr-3 p-3 w-90" :re-calc="isShowFilter">
      <template #header="{ spRef }">
        <div :ref="spRef" class="bg-[#b9bec3] py-1 pl-2">
          <Checkbox class="mr-3">{{ $t('routes.device.terminal.tree.title') }}</Checkbox>
        </div>
      </template>
      <teleport to="#sider-metra">
        <div class="space-x-2 text-[0] float-right" v-if="isShowFilter && !isShowSettings">
          <!-- <Icon icon="carbon:edit" @click="dOpenGroup()" size="28" /> -->
          <Icon
            icon="tree-add-group|svg"
            class="!h-8.5 !w-14"
            @click="dOpenGroup()"
            :disabled="!activeIsGroup && dataList.length"
          />
          <Icon
            icon="tree-remove|svg"
            size="32"
            @click="onRemove"
            :disabled="!checkedKeys.length"
          />
        </div>
      </teleport>
      <SpContainer full class="overflow-y-auto">
        <SpTree
          @select="onTreeSelect"
          @Load="onLoadData"
          :data-srouce="dataList"
          :selectedKeys="selectedKeys"
          v-model:checkedKeys="checkedKeys"
          :checkable="!isShowSettings"
          v-model:expanded-keys="expandedKeys"
        />
      </SpContainer>
    </SpContainer>
    <div class="flex-1">
      <SettingsContent v-if="isShowSettings" />
      <SpContainer v-else class="bg-white rounded-2xl p-3" :re-calc="isShowFilter">
        <TerminalTable :group="activeDeviceNode?.data" />
      </SpContainer>
    </div>
    <Resetable>
      <DialogGroup v-bind="dPropsGroup" />
    </Resetable>
  </div>
</template>

<script setup lang="ts">
  import { deviceGroupGet, deviceZoneRemove, deviceGroupInfo } from '/@/serveices';
  import { useRequest } from '/@/utils/hooks/core/useRequest';
  import { useDialog, Resetable } from '/@/components/SpModal/useSpModal';
  import { Checkbox } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import TerminalTable from './termial-table.vue';
  import DialogGroup, { DataType as DDTypeGroup } from '../dialog/addGroup.vue';
  import { computed, inject, provide, Ref, ref, watch, watchEffect } from 'vue';
  import { DEVICE_TYPE } from '/@/enums/deviceEnum';
  import { useMessage } from '/@/utils/hooks/web/useMessage';
  import SettingsContent from '../../settings/index-terminal.vue';
  import SpTree, { unpackTreeData } from '/@/components/SpTree/index.vue';
  import { useDeviceStoreWithOut } from '/@/store/modules/device';

  const filterType = inject<Ref<string>>('filter-type');
  const isShowFilter = computed(() => filterType?.value === 'terminal');

  // tree
  let { data: dataList, loading, run: deviceGroupGetRun } = useRequest<any[]>(deviceGroupGet);
  const expandedKeys = ref<number[]>([]);
  const activeDeviceNode = ref();
  const selectedKeys = computed(() => [activeDeviceNode.value?.key].filter(Boolean));
  provide('selectedKeys', selectedKeys);
  function onTreeSelect(keys: number[], { node }: any) {
    activeDeviceNode.value = node.dataRef;
  }

  const onLoadData = (treeNode) => {
    let allChild = [];
    const allId = JSON.parse(treeNode.dataRef.ownArea);
    treeNode.dataRef.children = [];
    if (allId.length) {
      allId.length &&
        allId.forEach((id) => {
          allChild.push(deviceGroupInfo(id));
        });
      Promise.all(allChild).then((res) => {
        treeNode.dataRef.children = [];
        console.log(res);
        res.forEach((item) => {
          item.data = {
            id: item.id,
            name: item.name,
          };
          item.key = item.id;
          item.parentId = treeNode.dataRef.id;
          item.title = item.name;
          const { type, id } = item.data;
          item.selectable = isShowSettings?.value
            ? type === DEVICE_TYPE.TERMINAL
            : type !== DEVICE_TYPE.TERMINAL;
          treeNode.dataRef.children = [...treeNode.dataRef.children, item];
        });
        dataList.value = [...(dataList.value ?? [])];
      });
    } else {
      return new Promise(resolve => {
        if (treeNode.dataRef.children) {
          resolve();
          return;
        }
      });
    }
    console.log(treeNode.dataRef);
  };

  // action
  const deviceStore = useDeviceStoreWithOut();
  const activeIsGroup = computed(
    () => !!activeDeviceNode.value && activeDeviceNode.value?.data.type !== DEVICE_TYPE.TERMINAL,
  );
  const checkedKeys = ref([]);
  const { createConfirmRemove } = useMessage();
  async function onRemove() {
    await createConfirmRemove();
    await deviceZoneRemove(checkedKeys.value);
    await Promise.all([deviceGroupGetRun(), deviceStore.getListProject()]);
  }

  // dialog addGroup
  const { dialogOpen: dOpenGroup, dialogProps: dPropsGroup } = useDialog<DDTypeGroup>(
    (result: DDTypeGroup) => {
      deviceGroupGetRun();
    },
  );

  // settings
  const isSS = inject<Ref<boolean>>('is-show-settings');
  const isShowSettings = computed(() => isShowFilter.value && isSS?.value);
  const unpackDataList = computed(() => unpackTreeData(dataList.value ?? []));
  watchEffect(() => {
    activeDeviceNode.value = isShowSettings?.value
      ? unpackDataList.value?.find((item) => item.data.type === DEVICE_TYPE.TERMINAL)
      : null;
  });
  const activeDevice = computed(() => activeDeviceNode.value?.data);
  provide('active-device', activeDevice);
  const emit = defineEmits(['update:device-name']);
  watchEffect(() => {
    emit('update:device-name', activeDevice.value?.name);
  });

  watchEffect(() => {
    let childNode = [];
    function reset(list) {
      list?.forEach((item) => {
        item.data = {
          id: item.id,
          name: item.name,
        };
        childNode = [...childNode, ...JSON.parse(item.ownArea)];
        item.key = item.id;
        item.parentId = 0;
        item.title = item.name;
        const { type, id } = item.data;
        item.selectable = isShowSettings?.value
          ? type === DEVICE_TYPE.TERMINAL
          : type !== DEVICE_TYPE.TERMINAL;
      });
    }
    reset(dataList.value);
    dataList.value = dataList.value
      ? dataList.value.filter((v) => childNode.indexOf(v.id) == -1)
      : [];
    dataList.value = [...(dataList.value ?? [])];
  });
  watch(isShowSettings, () => {
    if (isShowSettings?.value && isShowFilter.value) {
      const keysSet = new Set(expandedKeys.value);
      let key = activeDeviceNode.value.key;
      while (key) {
        keysSet.add(key);
        const node = unpackDataList.value?.find((item) => item.key === key);
        key = node?.parentId;
      }

      expandedKeys.value = Array.from(keysSet);
    }
  });
</script>
<style scoped></style>
