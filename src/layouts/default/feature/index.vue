<script lang="ts">
  import { defineComponent, computed, unref } from 'vue';
  import { BackTop } from 'ant-design-vue';

  import { useRootSetting } from '/@/utils/hooks/setting/useRootSetting';
  import { useHeaderSetting } from '/@/utils/hooks/setting/useHeaderSetting';
  import { useDesign } from '/@/utils/hooks/web/useDesign';
  import { useUserStoreWithOut } from '/@/store/modules/user';

  import { SettingButtonPositionEnum } from '/@/enums/appEnum';
  import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';

  import SessionTimeoutLogin from '/@/views/sys/login/SessionTimeoutLogin.vue';
  export default defineComponent({
    name: 'LayoutFeatures',
    components: {
      BackTop,
      SessionTimeoutLogin,
    },
    setup() {
      const { getUseOpenBackTop, getShowSettingButton, getSettingButtonPosition, getFullContent } =
        useRootSetting();
      const userStore = useUserStoreWithOut();
      const { prefixCls } = useDesign('setting-drawer-fearure');
      const { getShowHeader } = useHeaderSetting();

      const getIsSessionTimeout = computed(() => userStore.getSessionTimeout);

      const getIsFixedSettingDrawer = computed(() => {
        if (!unref(getShowSettingButton)) {
          return false;
        }
        const settingButtonPosition = unref(getSettingButtonPosition);

        if (settingButtonPosition === SettingButtonPositionEnum.AUTO) {
          return !unref(getShowHeader) || unref(getFullContent);
        }
        return settingButtonPosition === SettingButtonPositionEnum.FIXED;
      });

      return {
        getTarget: () => document.body,
        getUseOpenBackTop,
        getIsFixedSettingDrawer,
        prefixCls,
        getIsSessionTimeout,
      };
    },
  });
</script>

<template>
  <BackTop v-if="getUseOpenBackTop" :target="getTarget" />
  <SessionTimeoutLogin v-if="getIsSessionTimeout" />
</template>

<style lang="less">
  @prefix-cls: ~'@{namespace}-setting-drawer-fearure';

  .@{prefix-cls} {
    position: absolute;
    z-index: 10;
    top: 45%;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 10px;

    cursor: pointer;

    color: @white;
    border-radius: 6px 0 0 6px;
    background-color: @primary-color;

    svg {
      width: 1em;
      height: 1em;
    }
  }
</style>
