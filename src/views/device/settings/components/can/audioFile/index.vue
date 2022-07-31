<template>
  <SpCard>
    <template #title>
      <RadioGroup v-model:value="activeKey" @change="onTabChange" class="space-x-4 w-full clearfix">
        <SpRadioButton value="music">
          {{ $t('routes.device.setting.audioFile.serverMusic') }}
        </SpRadioButton>
        <SpRadioButton value="message">
          {{ $t('routes.device.setting.audioFile.serverMessage') }}
        </SpRadioButton>
      </RadioGroup>
    </template>
    <template #extra>
      <div style="display: flex">
        <Upload
          v-model:file-list="fileList"
          :before-upload="beforeUpload"
          accept="audio/*"
          name="file"
          :headers="headers"
          @change="handleChange"
        >
          <Icon icon="add-white|svg" class="!h-8.5 !w-14" @click="onAdds()"></Icon>
        </Upload>
        <Icon
          icon="remove-white|svg"
          class="!h-8.5 !w-14"
          @click="onRemove"
          :disabled="!selectKeys.length"
        />
      </div>
    </template>
    <SpTable
      ref="refTable"
      :data-source="tableRequest"
      v-model:select-keys="selectKeys"
      :columns="tableCols"
    />
  </SpCard>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import SpTable, { useSpTable } from '/@/components/SpTable/index.vue';
  import { deviceAudioFileGet, deviceAudioFileRemove } from '/@/serveices';
  import { RadioChangeEvent } from 'ant-design-vue/lib/radio';
  import type { UploadProps } from 'ant-design-vue';
  import { useI18n } from '/@/utils/hooks/web/useI18n';
  import { Icon } from '/@/components/Icon';
  import { RadioGroup, Upload } from 'ant-design-vue';
  import { SpRadioButton } from '/@/layouts/setting/index.vue';

  // table
  const { t } = useI18n();
  const { tableRequest, refTable, tableCols, selectKeys, onRemove, onAdd, tableQuery } = useSpTable(
    {
      request: deviceAudioFileGet,
      remove: deviceAudioFileRemove,
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
  const fileList = ref<UploadProps['fileList']>([]);
  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    fileList.value = [...fileList.value, file];
    return false;
  };
  const handleChange = (info) => {
    console.log(info);
    var f = info.file;
    var r = new FileReader();
    r.readAsArrayBuffer(f);
    r.onload = function () {
      fetch('/api/file/bgm1?name=' + encodeURIComponent(f.name), {
        method: 'POST',
        body: r.result,
      }).then(function (res) {
        tableQuery();
      });
    };
  };
</script>
<style lang="less" scoped>
.ant-upload-list-item {
  display: none
}
</style>
