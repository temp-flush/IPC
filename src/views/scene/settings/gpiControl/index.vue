<template>
  <SpCard thin class="card-wrapper">
    <template #title>
      <Form
        ref="refForm"
        :model="formState"
        :label-col="{ span: 2 }"
        :wrapper-col="{ span: 4 }"
        :colon="false"
      >
        <SpFormItem name="times" class="!mb-0">
          <template #label>
            <span class="text-white">
              {{ $t('routes.scene.setting.gpiControl.form.gpiIndex') }}
            </span>
          </template>
          <SpFormSelect v-model:value="formState.gpiIndex" :options="optionsIndex" />
        </SpFormItem>
      </Form>
    </template>
    <SpTable
      ref="refTable"
      :data-source="tableRequest"
      v-model:select-keys="selectKeys"
      :columns="tableCols"
      :pagination="false"
    >
      <template #action="{ record }">
        <Button size="small" @click="onTrigger(record)">
          {{ $t('routes.scene.setting.gpiControl.action.trigger') }}
        </Button>
      </template>
    </SpTable>
  </SpCard>
</template>

<script setup lang="ts">
  import { Button } from 'ant-design-vue';
  import SpTable, { useSpTable } from '/@/components/SpTable/index.vue';
  import { useI18n } from '/@/utils/hooks/web/useI18n';
  import { deviceGpiEventSettingGet } from '/@/serveices';
  import { ref } from 'vue';

  // form
  import useSpForm from '/@/components/SpForm/useSpForm';
  import { Form } from 'ant-design-vue';
  import SpFormSelect from '/@/components/SpForm/SpFormSelect.vue';
  const { formState, refForm, getForm, updateForm } = useSpForm({ gpiIndex: 1 });
  const optionsIndex = ref([]);

  // table
  const { t } = useI18n();
  const { tableRequest, refTable, tableCols, selectKeys, tableData } = useSpTable({
    request: deviceGpiEventSettingGet,
    cols: [
      {
        dataIndex: 'gpi',
        title: t('routes.device.setting.gpiEventSetting.form.gpi'),
        width: 60,
      },
      {
        dataIndex: 'type',
        title: t('routes.device.setting.gpiEventSetting.form.type'),
        width: 100,
        slots: { customRender: 'type' },
      },
      {
        dataIndex: 'eventId',
        title: t('routes.device.setting.gpiEventSetting.form.eventId'),
        width: 60,
        slots: { customRender: 'eventId' },
      },
      {
        dataIndex: 'eventName',
        title: t('routes.device.setting.gpiEventSetting.form.eventName'),
        width: 100,
      },
      {
        dataIndex: 'action',
        title: t('routes.device.setting.gpiEventSetting.form.action'),
        width: 100,
        align: 'center',
        slots: { customRender: 'action' },
      },
    ] as const,
  });
  function onTrigger(record: any) {
    //
  }
</script>
<style scoped lang="less">
  .card-wrapper {
    > :deep(.ant-card-body) {
      padding-top: 0;
      padding-bottom: @offset;
    }
  }
  :deep(.ant-table-thead tr th) {
    background-color: rgb(108, 139, 198) !important;
  }
</style>
