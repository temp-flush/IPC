<template>
  <div>
    <Upload
      v-model:file-list="fileList"
      name="file"
      :headers="headers"
      v-bind="$attrs"
      :showUploadList="false"
    >
      <slot>
        <Button size="small"> {{ $t('common.action.upload') }} </Button>
      </slot>
    </Upload>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    inheritAttrs: false,
  });
</script>

<script lang="ts" setup>
  import { Upload, message, Button } from 'ant-design-vue';
  import { ref } from 'vue';
  interface FileItem {
    uid: string;
    name?: string;
    status?: string;
    response?: string;
    url?: string;
  }

  interface FileInfo {
    file: FileItem;
    fileList: FileItem[];
  }

  const props = defineProps({
    value: { type: null },
  });
  const handleChange = (info: FileInfo) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const fileList = ref([]);
  const headers = {
    authorization: 'authorization-text',
  };
</script>

<style lang="scss" scoped></style>
