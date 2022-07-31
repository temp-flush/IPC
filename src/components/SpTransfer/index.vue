<template>
  <Transfer
    :data-source="mockData"
    :titles="['Source', 'Target']"
    :target-keys="targetKeys"
    :selected-keys="selectedKeys"
    :render="(item) => item.title"
    :disabled="disabled"
    @change="handleChange"
    @selectChange="handleSelectChange"
  />
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Transfer } from 'ant-design-vue';

  const mockData: any[] = [];
  for (let i = 0; i < 20; i++) {
    mockData.push({
      key: i.toString(),
      title: `content${i + 1}`,
      description: `description of content${i + 1}`,
    });
  }
  withDefaults(defineProps<{ disabled?: boolean }>(), {});
  const oriTargetKeys = mockData.filter((item) => +item.key % 3 > 1).map((item) => item.key);
  const targetKeys = ref<string[]>(oriTargetKeys);

  const selectedKeys = ref<string[]>(['1', '4']);

  const handleChange = (nextTargetKeys: string[], direction: string, moveKeys: string[]) => {
    targetKeys.value = nextTargetKeys;
    console.log('targetKeys: ', nextTargetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);
  };
  const handleSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
    selectedKeys.value = [...sourceSelectedKeys, ...targetSelectedKeys];
    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  };
</script>
