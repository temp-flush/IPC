<template>
  <div>
    <Header :class="getHeaderClass">
      <!-- left start -->
      <div :class="`${prefixCls}-left`">
        <!-- logo -->
        <AppLogo :class="`${prefixCls}-logo`" :theme="getHeaderTheme" :style="getLogoWidth" />
        <!-- <LayoutBreadcrumb v-if="getShowContent && getShowBread" :theme="getHeaderTheme" /> -->
      </div>
      <!-- left end -->

      <!-- action  -->
      <div :class="`${prefixCls}-action pr-5 `">
        <!-- <Notify v-if="getShowNotice" :class="`${prefixCls}-action__item notify-item`" /> -->
        <FileDropDown />
        <UserDropDown :theme="getHeaderTheme" />
        <div class="inline-block px-3 cursor-pointer group align-middle">
          <span class="group-hover:hidden">
            <Icon icon="header-help|svg" size="20" />
          </span>
          <span class="sp-active group-hover:inline-block hidden">
            <Icon icon="header-help-active|svg" size="20" class="sp-active" />
          </span>
        </div>
        <AppLocalePicker
          v-if="getShowLocalePicker"
          :reload="true"
          :showText="false"
          :class="`${prefixCls}-action__item`"
        />
      </div>
    </Header>
    <!-- menu start -->
    <div :class="`${prefixCls}-menu`">
      <LayoutMenu
        :isHorizontal="true"
        :theme="getHeaderTheme"
        :splitType="getSplitType"
        :menuMode="getMenuMode"
      /> </div
  ></div>
  <!-- menu-end -->
</template>
<script lang="ts">
  import { defineComponent, unref, computed } from 'vue';

  import { propTypes } from '/@/utils/propTypes';

  import { Layout } from 'ant-design-vue';
  import { AppLogo } from '/@/components/Application';
  import LayoutMenu from '../menu/index.vue';

  import { useHeaderSetting } from '/@/utils/hooks/setting/useHeaderSetting';
  import { useMenuSetting } from '/@/utils/hooks/setting/useMenuSetting';
  import { useRootSetting } from '/@/utils/hooks/setting/useRootSetting';

  import { MenuModeEnum, MenuSplitTyeEnum } from '/@/enums/menuEnum';
  import { SettingButtonPositionEnum } from '/@/enums/appEnum';
  import { AppLocalePicker } from '/@/components/Application';

  import { UserDropDown, Notify, FileDropDown } from './components';
  import { useAppInject } from '/@/utils/hooks/web/useAppInject';
  import { useDesign } from '/@/utils/hooks/web/useDesign';

  import { useLocale } from '/@/locales/useLocale';

  import { Icon } from '/@/components/Icon';

  export default defineComponent({
    name: 'LayoutHeader',
    components: {
      Header: Layout.Header,
      AppLogo,
      // LayoutBreadcrumb,
      LayoutMenu,
      UserDropDown,
      AppLocalePicker,
      // Notify,
      FileDropDown,
      Icon,
    },
    props: {
      fixed: propTypes.bool,
    },
    setup(props) {
      const { prefixCls } = useDesign('layout-header');
      const {
        getShowTopMenu,
        getShowHeaderTrigger,
        getSplit,
        getIsMixMode,
        getMenuWidth,
        getIsMixSidebar,
      } = useMenuSetting();
      const { getUseErrorHandle, getShowSettingButton, getSettingButtonPosition } =
        useRootSetting();

      const {
        getHeaderTheme,
        getShowFullScreen,
        getShowNotice,
        getShowContent,
        getShowBread,
        getShowHeaderLogo,
        getShowHeader,
        getShowSearch,
      } = useHeaderSetting();

      const { getShowLocalePicker } = useLocale();

      const { getIsMobile } = useAppInject();

      const getHeaderClass = computed(() => {
        const theme = unref(getHeaderTheme);
        return [
          prefixCls,
          {
            [`${prefixCls}--fixed`]: props.fixed,
            [`${prefixCls}--mobile`]: unref(getIsMobile),
            [`${prefixCls}--${theme}`]: theme,
          },
        ];
      });

      const getShowSetting = computed(() => {
        if (!unref(getShowSettingButton)) {
          return false;
        }
        const settingButtonPosition = unref(getSettingButtonPosition);

        if (settingButtonPosition === SettingButtonPositionEnum.AUTO) {
          return unref(getShowHeader);
        }
        return settingButtonPosition === SettingButtonPositionEnum.HEADER;
      });

      const getLogoWidth = computed(() => {
        if (!unref(getIsMixMode) || unref(getIsMobile)) {
          return {};
        }
        const width = unref(getMenuWidth) < 180 ? 180 : unref(getMenuWidth);
        return { width: `${width}px` };
      });

      const getSplitType = computed(() => {
        return unref(getSplit) ? MenuSplitTyeEnum.TOP : MenuSplitTyeEnum.NONE;
      });

      const getMenuMode = computed(() => {
        return unref(getSplit) ? MenuModeEnum.HORIZONTAL : null;
      });

      return {
        prefixCls,
        getHeaderClass,
        getShowHeaderLogo,
        getHeaderTheme,
        getShowHeaderTrigger,
        getIsMobile,
        getShowBread,
        getShowContent,
        getSplitType,
        getSplit,
        getMenuMode,
        getShowTopMenu,
        getShowLocalePicker,
        getShowFullScreen,
        getShowNotice,
        getUseErrorHandle,
        getLogoWidth,
        getIsMixSidebar,
        getShowSettingButton,
        getShowSetting,
        getShowSearch,
      };
    },
  });
</script>
<style lang="less">
  @import './index.less';
</style>
