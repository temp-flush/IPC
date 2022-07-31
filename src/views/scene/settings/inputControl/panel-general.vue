<template>
  <SpCard class="card-wrapper" thin :title="$t('routes.scene.setting.inputControl.panel.general')">
    <template #extra>
      <Button>{{ $t('routes.scene.setting.inputControl.action.save') }}</Button>
    </template>
    <SettingPanel class="card-table" :data-source="tableData" :columns="tableCols">
      <template #default="{ record, index, model }: ScopeType<typeof tableData>">
        <SpFormItem>
          <SpFormSelect v-model:value="activeInput" :options="optionsInput" />
        </SpFormItem>
        <SpFormItem :name="`${model}.${index}.name`">
          <SpFormInput v-model:value="record.name" />
        </SpFormItem>
        <SpFormItem>
          {{ record.priority }}
        </SpFormItem>
        <SpFormItem :name="`${model}.${index}.status`">
          <div class="space-x-5">
            <Button class="w-20 !bg-[red] !text-white !hover:border-[red]" size="small">On</Button>
            <Button class="w-20 !bg-[green] !text-white !hover:border-[green]" size="small">
              Off
            </Button>
          </div>
          <!-- <Switch v-model:checked="record.status" checked-children="on" un-checked-children="off" /> -->
          <div>To Select Zones</div>
        </SpFormItem>
      </template>
    </SettingPanel>
  </SpCard>
</template>

<script setup lang="ts">
  import { Button, Switch } from 'ant-design-vue';
  import { ref, watchEffect } from 'vue';
  import SettingPanel from '/@/components/SpCard/setting.vue';
  import type { ScopeType } from '/@/components/SpCard/setting.vue';

  // table
  import SpFormSelect from '/@/components/SpForm/SpFormSelect.vue';
  import SpFormInput from '/@/components/SpForm/SpFormInput.vue';
  const dataList = ref(
    new Array(4).fill(0).map((item, index) => ({
      input: index,
      name: `Input${index + 1}`,
      priority: 'G16',
      status: false,
    })),
  );
  const tableData = ref([dataList.value[0]]);
  const optionsInput = new Array(4).fill(0).map((item, index) => ({
    value: index,
    label: `Input${index + 1}`,
  }));
  const activeInput = ref(optionsInput[0].value);
  watchEffect(() => {
    tableData.value = dataList.value.filter((item) => item.input === activeInput.value);
  });
  const tableCols = [
    { title: 'Input', width: 200 },
    { title: 'Name', width: 200 },
    { title: 'Priority', width: 200 },
    { title: 'Action', width: 'auto' },
  ];
</script>
<style scoped lang="less">
  .card-wrapper {
    > :deep(.ant-card-body) {
      padding-top: 0;
      padding-bottom: @offset;
    }
  }
  .card-table {
    :deep(.ant-card-head) {
      background-color: rgb(108, 139, 198) !important;
    }
  }
</style>
