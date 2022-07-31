<template>
  <SpCard thin class="card-wrapper">
    <template #title>
      <RadioGroup
        v-model:value="activeType"
        @change="onTabChange"
        class="space-x-4 w-full clearfix"
      >
        <SpRadioButton value="music">
          {{ $t('routes.scene.setting.audioFileSend.action.music') }}
        </SpRadioButton>
        <SpRadioButton value="message">
          {{ $t('routes.scene.setting.audioFileSend.action.message') }}
        </SpRadioButton>
      </RadioGroup>
    </template>
    <template #extra>
      <Button>{{ $t('routes.scene.setting.audioFileSend.action.save') }}</Button>
    </template>
    <SpTable
      ref="refTable"
      :data-source="tableRequest"
      v-model:select-keys="selectKeys"
      :select-type="activeType === 'music' ? 'checkbox' : 'radio'"
      :columns="tableCols"
    />
    <template #footer>
      <div class="clearfix">
        <Form
          ref="refForm"
          :model="formState"
          layout="inline"
          :colon="false"
          class="w-100 gap-10 float-right"
        >
          <SpFormItem :label="$t('routes.scene.setting.audioFileSend.form.times')" name="times">
            <EventOperation v-model:value="formState.times" command="serverMessageSending" />
          </SpFormItem>
          <SpFormItem>
            <!-- todo to select zones -->
            <Icon icon="carbon:play" v-if="!playStatus" @change="togglePlay(true)" />
            <Icon icon="carbon:pause" v-else @change="togglePlay(false)" />
          </SpFormItem>
        </Form>
      </div>
    </template>
  </SpCard>
</template>

<script setup lang="ts">
  import { Button } from 'ant-design-vue';
  import { ref } from 'vue';
  import { SpRadioButton } from '/@/layouts/setting/index.vue';
  import { useI18n } from '/@/utils/hooks/web/useI18n';
  import { Icon } from '/@/components/Icon';
  import { RadioGroup } from 'ant-design-vue';
  // form
  import useSpForm from '/@/components/SpForm/useSpForm';
  import { Form } from 'ant-design-vue';
  import EventOperation from '/@/views/device/settings/components/event/eventOperation.vue';
  import { RadioChangeEvent } from 'ant-design-vue/lib/radio';
  import SpTable, { useSpTable } from '/@/components/SpTable/index.vue';
  import { deviceAudioFileGet } from '/@/serveices';
  const activeType = ref('music');
  const { formState, refForm, getForm, updateForm } = useSpForm({ times: 1 });

  // play
  const playStatus = ref(false);
  function togglePlay(value: boolean) {
    playStatus.value = value;
  }

  // table
  const { t } = useI18n();
  const { tableRequest, refTable, tableCols, selectKeys, onRemove, onAdd, tableQuery } = useSpTable(
    {
      request: deviceAudioFileGet,
      cols: [
        {
          dataIndex: 'name',
          title: t('routes.device.setting.audioFile.form.name'),
          width: 72,
        },
        {
          dataIndex: 'size',
          title: t('routes.device.setting.audioFile.form.size'),
          width: 58,
        },
        {
          dataIndex: 'duration',
          title: t('routes.device.setting.audioFile.form.duration'),
          width: 60,
        },
        {
          dataIndex: 'bitRate',
          title: t('routes.device.setting.audioFile.form.bitRate'),
          width: 44,
        },
        {
          dataIndex: 'title',
          title: t('routes.device.setting.audioFile.form.title'),
          width: 114,
        },
      ] as const,
    },
  );

  // tabs
  const activeKey = ref<string>('music');
  function onTabChange(event: RadioChangeEvent) {
    tableQuery({ type: activeKey.value });
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
