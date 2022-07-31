<template>
  <Layout :class="prefixCls">
    <LayoutFeatures />
    <LayoutHeader fixed v-if="getShowFullHeaderRef" />
    <Layout :class="[layoutClass]">
      <Layout :class="`${prefixCls}-main`">
        <LayoutMultipleHeader />
        <LayoutContent />
      </Layout>
    </Layout>
  </Layout>
</template>

<script lang="ts">
  import { defineComponent, computed, unref, ref, shallowRef } from 'vue';
  import { Layout } from 'ant-design-vue';
  import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';

  import LayoutHeader from './header/index.vue';
  import LayoutContent from './content/index.vue';
  import LayoutMultipleHeader, { HEADER_HEIGHT } from './header/MultipleHeader.vue';

  import { useHeaderSetting } from '/@/utils/hooks/setting/useHeaderSetting';
  import { useMenuSetting } from '/@/utils/hooks/setting/useMenuSetting';
  import { useDesign } from '/@/utils/hooks/web/useDesign';
  import useScrollContainer from '/@/utils/hooks/web/useScrollContainer';

  export default defineComponent({
    name: 'DefaultLayout',
    components: {
      LayoutFeatures: createAsyncComponent(() => import('/@/layouts/default/feature/index.vue')),
      LayoutHeader,
      LayoutContent,
      LayoutMultipleHeader,
      Layout,
    },
    setup() {
      const { prefixCls } = useDesign('default-layout');
      const { getShowFullHeaderRef } = useHeaderSetting();
      const { getIsMixSidebar, getShowMenu } = useMenuSetting();

      const layoutClass = computed(() => {
        let cls: string[] = ['ant-layout'];
        if (unref(getIsMixSidebar) || unref(getShowMenu)) {
          cls.push('ant-layout-has-sider');
        }
        return cls;
      });

      useScrollContainer({ offset: HEADER_HEIGHT });

      return {
        getShowFullHeaderRef,
        prefixCls,
        layoutClass,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-default-layout';

  .@{prefix-cls} {
    display: flex;
    flex-direction: column;

    width: 100%;
    min-height: 100%;

    background-color: @content-bg;

    > .ant-layout {
      min-height: 100%;
    }

    &-main {
      width: 100%;
      margin-left: 1px;
    }
  }
</style>
