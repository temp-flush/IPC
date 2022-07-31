<template>
  <Dropdown placement="bottomLeft" :overlayClassName="`${prefixCls}-dropdown-overlay`">
    <span :class="[prefixCls, `${prefixCls}--${theme}`]" class="flex">
      <span class="group-hover:hidden">
        <Icon :class="`${prefixCls}__header`" size="20" icon="header-user|svg" />
      </span>
      <span class="sp-active hidden group-hover:inline-block">
        <Icon
          :class="`${prefixCls}__header`"
          size="20"
          icon="header-user-active|svg"
          class="sp-active"
        />
      </span>
      <!-- <img :class="`${prefixCls}__header`" :src="getUserInfo.avatar" /> -->
      <!-- <span :class="`${prefixCls}__info hidden md:block`">
        <span :class="`${prefixCls}__name  `" class="truncate">
          {{ getUserInfo.realName }}
        </span>
      </span> -->
    </span>

    <template #overlay>
      <Menu @click="handleMenuClick">
        <MenuItem
          key="users"
          :text="t('layout.header.dropdownItemUserManager')"
          icon="carbon:user-multiple"
        />
        <MenuItem
          key="password"
          :text="t('layout.header.dropdownItemPasswordModify')"
          icon="carbon:password"
        />
        <MenuItem
          key="logout"
          :text="t('layout.header.dropdownItemLoginOut')"
          icon="ion:power-outline"
        />
      </Menu>
    </template>
  </Dropdown>
  <Resetable>
    <DialogLogin v-bind="dPropsLogin" :type="activeDialog"/>
  </Resetable>
</template>
<script lang="ts">
  // components
  import { Dropdown, Menu } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';

  import { defineComponent, computed, ref, h } from 'vue';

  import { DOC_URL } from '/@/utils/settings/siteSetting';

  import { useUserStore } from '/@/store/modules/user';
  import { useHeaderSetting } from '/@/utils/hooks/setting/useHeaderSetting';
  import { useI18n } from '/@/utils/hooks/web/useI18n';
  import { useDesign } from '/@/utils/hooks/web/useDesign';
  import { useModal } from '/@/components/Modal';

  import headerImg from '/@/assets/images/header.jpg';
  import { propTypes } from '/@/utils/propTypes';
  import { openWindow } from '/@/utils';

  import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';

  import { useDialog, Resetable } from '/@/components/SpModal/useSpModal';
  import DialogLogin, { DataType as DDTypeLogin } from './dialog-wrapper.vue';

  type MenuEvent = 'logout';

  export default defineComponent({
    name: 'UserDropdown',
    components: {
      Dropdown,
      Menu,
      Icon,
      MenuItem: createAsyncComponent(() => import('./DropMenuItem.vue')),
      Resetable,
      DialogLogin,
    },
    props: {
      theme: propTypes.oneOf(['dark', 'light']),
    },
    setup() {
      const { prefixCls } = useDesign('header-user-dropdown');
      const { t } = useI18n();
      const { getShowDoc, getUseLockPage } = useHeaderSetting();
      const userStore = useUserStore();

      const getUserInfo = computed(() => {
        const { realName = '', avatar, desc } = userStore.getUserInfo || {};
        return { realName, avatar: avatar || headerImg, desc };
      });

      const [register, { openModal }] = useModal();

      function handleLock() {
        openModal(true);
      }

      //  login out
      function handleLoginOut() {
        userStore.confirmLoginOut();
      }

      // open doc
      function openDoc() {
        openWindow(DOC_URL);
      }

      // dialog login
      const { dialogOpen: dOpenLogin, dialogProps: dPropsLogin } = useDialog<DDTypeLogin>(
        (result: DDTypeLogin) => {},
      );
      const activeDialog = ref<any>();
      function handleMenuClick(e: { key: string }) {
        switch (e.key) {
          case 'logout':
            handleLoginOut();
            break;
          default:
            activeDialog.value = e.key;
            dOpenLogin();
            break;
        }
      }

      return {
        prefixCls,
        t,
        getUserInfo,
        handleMenuClick,
        getShowDoc,
        register,
        getUseLockPage,
        dPropsLogin,
        activeDialog,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-header-user-dropdown';

  .@{prefix-cls} {
    font-size: 12px;

    overflow: hidden;
    align-items: center;

    height: @header-height;
    padding: 0 0 0 10px;
    padding-right: 10px;

    cursor: pointer;

    img {
      width: 24px;
      height: 24px;
      margin-right: 12px;
    }

    &__header {
      border-radius: 50%;
    }

    &__name {
      font-size: 14px;
    }

    &--dark {
      &:hover {
        background-color: @header-dark-bg-hover-color;
      }
    }

    &--light {
      &:hover {
        background-color: @header-light-bg-hover-color;
      }

      .@{prefix-cls} {
        &__name {
          color: @text-color-base;
        }

        &__desc {
          color: @header-light-desc-color;
        }
      }
    }

    &-dropdown-overlay {
      .ant-dropdown-menu-item {
        min-width: 160px;
      }
    }
  }
</style>
