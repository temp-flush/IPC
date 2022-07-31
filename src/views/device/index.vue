<template>
  <div class="h-full grid gap-5">
    <Tabs type="card" v-model:activeKey="activeKey">
      <TabPane key="detect" tab="设备发现">
        <ListDevice />
      </TabPane>
      <TabPane key="project" tab="项目查看">
        <ListProject />
      </TabPane>
    </Tabs>
  </div>
</template>
<script lang="ts" setup>
  import { Tabs, TabPane } from 'ant-design-vue';
  import ListDevice from './components/Detect.vue';
  import ListProject from './components/Project.vue';

  import { ref } from 'vue';
  import useScrollContainer from '/@/utils/hooks/web/useScrollContainer';
  // import { useRoute } from 'vue-router';
  // const route = useRoute();
  // const activeKey = ref(route.params.id ? 'project' : 'detect');
  const activeKey = ref('project');

  useScrollContainer({ offset: 43 });
</script>
<style scoped>
  :deep(.ant-tabs-tab) {
    @apply !bg-gray-300;
    font-size: 16px;

    margin-right: 0 !important;
    padding-right: 3em !important;
    padding-left: 3em !important;

    color: white !important;
    border: none !important;
    border-radius: 0 !important;
  }

  :deep(.ant-tabs-tab-active) {
    @apply !bg-primary-active;
  }

  :deep(.ant-tabs-bar) {
    margin-bottom: 3px;

    border-bottom: 0;
  }

  :deep(.ant-tabs-content) {
    background-color: #b9bec3 !important;
  }
</style>
