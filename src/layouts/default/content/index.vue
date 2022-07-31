<template>
  <SpContainer
    :class="[prefixCls, getLayoutContentMode]"
    v-loading="getOpenPageLoading && getPageLoading"
  >
    <PageLayout />
  </SpContainer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import PageLayout from '/@/layouts/page/index.vue';
  import { useDesign } from '/@/utils/hooks/web/useDesign';
  import { useRootSetting } from '/@/utils/hooks/setting/useRootSetting';
  import { useTransitionSetting } from '/@/utils/hooks/setting/useTransitionSetting';
  import { useContentViewHeight } from './useContentViewHeight';
  import SpContainer from '/@/components/SpContainer/index.vue';

  export default defineComponent({
    name: 'LayoutContent',
    components: { PageLayout, SpContainer },
    setup() {
      const { prefixCls } = useDesign('layout-content');
      const { getOpenPageLoading } = useTransitionSetting();
      const { getLayoutContentMode, getPageLoading } = useRootSetting();

      useContentViewHeight();
      return {
        prefixCls,
        getOpenPageLoading,
        getLayoutContentMode,
        getPageLoading,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-content';

  .@{prefix-cls} {
    @apply bg-gray-200;
    position: relative;

    flex: 1 1 auto;

    min-height: 0;
    padding: 5px 20px 20px;

    &.fixed {
      width: 1200px;
      margin: 0 auto;
    }

    &-loading {
      position: absolute;
      z-index: @page-loading-z-index;
      top: 200px;
    }
  }
</style>
