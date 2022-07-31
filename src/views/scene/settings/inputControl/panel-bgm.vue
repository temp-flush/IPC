<template>
  <SpCard class="card-wrapper" thin :title="$t('routes.scene.setting.inputControl.panel.bgm')">
    <template #extra>
      <Button>{{ $t('routes.scene.setting.inputControl.action.save') }}</Button>
    </template>
    <SettingPanel class="card-table" :data-source="tableData" :columns="tableCols">
      <template #default="{ record, index, model }: ScopeType<typeof tableData>">
        <SpFormItem>
          <!-- <Checkbox v-model:checked="record.input">BGM{{ index + 1 }}</Checkbox> -->
          BGM{{ index + 1 }}
        </SpFormItem>
        <SpFormItem :name="`${model}.${index}.name`">
          <SpFormInput v-model:value="record.name" />
        </SpFormItem>
        <SpFormItem>
          {{ record.status ? 'on' : 'off' }}
        </SpFormItem>
        <SpFormItem :name="`${model}.${index}.status`">
          <div class="space-x-5">
            <Button class="w-20 !bg-[red] !text-white !hover:border-[red]" size="small">On</Button>
            <Button class="w-20 !bg-[green] !text-white !hover:border-[green]" size="small">
              Off
            </Button>
          </div>
          <!-- <Switch v-model:checked="record.status" checked-children="on" un-checked-children="off" /> -->
        </SpFormItem>
      </template>
    </SettingPanel>
  </SpCard>
</template>

<script setup lang="ts">
  import { Button, Checkbox, Switch } from 'ant-design-vue';
  import { ref } from 'vue';
  import SettingPanel from '/@/components/SpCard/setting.vue';
  import type { ScopeType } from '/@/components/SpCard/setting.vue';

  // table
  import SpFormInput from '/@/components/SpForm/SpFormInput.vue';
  const tableData = ref(
    new Array(4).fill(0).map((item, index) => ({
      input: false,
      name: `Input${index + 1}`,
      status: false,
    })),
  );
  const tableCols = [
    { title: 'Input', width: 200 },
    { title: 'Name', width: 200 },
    { title: 'Status', width: 200 },
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
