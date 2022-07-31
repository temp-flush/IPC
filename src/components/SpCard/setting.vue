<template>
  <Form :model="dataSource" ref="" :colon="false" :labelCol="{ span: 0 }" size="small">
    <SpCard
      table
      class="w-full setting-panel"
      :class="{ 'all-center': allCenter }"
      :columns="columns"
    >
      <template #title>
        <div class="grid row">
          <div v-for="item in columns" :key="item.title ?? Math.random()">
            {{ item.title }}
          </div>
        </div>
      </template>
      <div v-for="(item, index) in dataSource" :key="item[rowKey]" class="row">
        <slot :index="index" :record="item" model="dataSource"></slot>
        <Divider
          v-if="dividerIndex.includes(index)"
          style="grid-column: 1/-1"
          class="!border-[#b9bec3] !-mx-6 !-mt-2 !mb-1 !w-auto"
        />
      </div>
      <slot name="action" v-if="showSlot">
        <div style="display: flex; align-items: center; justify-content: space-between">
          <div class="hor" style="height: 1px; background: black; width: calc(100% - 80px)"></div>
          <div class="space-x-2 text-[0] float-right">
            <Icon icon="add-black|svg" size="32" @click="dOpen()" />
            <Icon icon="tree-remove|svg" size="32" style="cursor: pointer" @click="onRemove" />
          </div>
        </div>
      </slot>
      <slot name="input" v-if="showInput">
        <div v-for="(item, index) in inputSource" :key="item[rowKey]" class="row">
          <slot name="special" :index="index" :record="item" model="inputSource"></slot>
          <Divider
            v-if="dividerIndex.includes(index)"
            style="grid-column: 1/-1"
            class="!border-[#b9bec3] !-mx-6 !-mt-2 !mb-1 !w-auto"
          />
        </div>
      </slot>
    </SpCard>
    <Resetable>
      <DialogAddGpo v-bind="dPropsSet" />
    </Resetable>
  </Form>
</template>
<script lang="ts">
  export interface ScopeType<T extends any[]> {
    record: T[number];
    index: number;
    model: string;
  }

  export default defineComponent({
    name: 'SettingPanel',
  });
</script>
<script setup lang="ts">
  import { computed, defineComponent, ref } from 'vue';
  // form
  import { Form, Divider } from 'ant-design-vue';
  import { isNumber } from '/@/utils/is';
  import { Icon } from '/@/components/Icon';
  import { useDialog, Resetable } from '/@/components/SpModal/useSpModal';
  import DialogAddGpo, {
    DataType as DDTypeAddGpo,
  } from '/@/views/device/settings/dialog/add-input.vue';
  import { bgmListAdd, bgmListRemove } from '/@/serveices';
  const props = defineProps({
    dataSource: { type: Array as PropType<any[]>, required: true },
    inputSource: { type: Array as PropType<any[]> },
    columns: { type: Array as PropType<any[]>, required: true },
    rowKey: { type: String, default: 'id' },
    allCenter: { type: Boolean },
    groups: { type: Array as PropType<number[]>, default: () => [] },
    showSlot: { type: Boolean },
    showInput: { type: Boolean },
  });
  console.log(props)
  const dividerIndex = computed(() =>
    props.groups
      .map((item, index, list) => {
        while (index-- && index > 0) item += list[index];
        return item;
      })
      .map((item) => item - 1),
  );
  const gridColumns = computed(() => {
    return props.columns
      .map((item) => item.width ?? 'auto')
      .map((width) => (isNumber(width) ? width + 'px' : 'auto'))
      .join(' ');
  });
  const pushBgm = (params) => {
    console.log(params, props);
    bgmListAdd(params).then((res) => {
      params &&
        params.days.forEach((v) => {
          props.inputSource?.push({
            input: v,
            name: v,
            class: 'BGM',
            channelPriority: 2,
            volume: 80,
            eq: 'EQ',
          });
        });
    });
    // eslint-disable-next-line vue/no-mutating-props
  };
  const onRemove = () => {
    console.log(props.inputSource[0])
    if (props.inputSource?.length > 0) {
      bgmListRemove(props.inputSource[0].volume).then((res) => {
        props.inputSource?.shift();
      });
    }
  };
  const { dialogOpen: dOpenSet, dialogProps: dPropsSet } = useDialog((result) => {
    pushBgm(result);
  });
  const dOpen = () => {
    // eslint-disable-next-line vue/no-mutating-props
    console.log(dOpenSet);
    dOpenSet();
  };
</script>
<style scoped lang="less">
  .setting-panel {
    @offset: 5px;

    :deep(.ant-card-head) {
      min-height: 0;
    }

    :deep(.ant-card-body),
    :deep(.ant-card-head-title) {
      padding-top: @offset;
      padding-bottom: @offset;
    }

    :slotted(.row),
    .row {
      display: grid;

      text-align: center;

      gap: 20px;
      grid-template-columns: v-bind(gridColumns);

      > :first-child {
        text-align: left;
      }
    }

    &.all-center {
      :slotted(.row),
      .row {
        > :first-child {
          text-align: center;
        }
      }
    }

    :deep(.sp-form-item) {
      margin-bottom: 0 !important;
    }
  }
  // form
  :deep(.ant-input),
  :deep(.ant-input-number-input) {
    @apply py-0;
    text-align: inherit;

    background-color: #b9bec3;

    &::placeholder {
      color: darken(#b9bec3, 20);
    }
  }

  :deep(.ant-input-number-input) {
    height: @formItemHeight - 2 !important;
  }
  @formItemHeight: 24px;

  :deep(.ant-select-selector) {
    height: @formItemHeight !important;

    background-color: #eeeeef !important;
  }

  :deep(.ant-select-selection-item),
  :deep(.ant-select-selection-placeholder) {
    line-height: @formItemHeight - 2 !important;
  }

  :global(.setting-selector-dropdown .ant-select-item-option:hover) {
    background-color: white;
  }

  :global(.setting-selector-dropdown .ant-select-item-option) {
    @apply py-0;
    min-height: @formItemHeight !important;
  }
</style>
