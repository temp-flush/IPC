<template>
  <Dropdown
    class="px-3 cursor-pointer group"
    placement="bottomLeft"
    :overlayClassName="`${prefixCls}-dropdown-overlay`"
  >
    <span :class="[prefixCls, `${prefixCls}--${theme}`]" class="flex">
      <span class="group-hover:hidden">
        <Icon :class="`${prefixCls}__header`" size="20" icon="header-file|svg" />
      </span>
      <span class="sp-active group-hover:inline-block hidden">
        <Icon
          :class="`${prefixCls}__header`"
          size="20"
          icon="header-file-active|svg"
          class="sp-active"
        />
      </span>
    </span>
    <template #overlay>
      <Menu>
        <MenuItem>
          {{ $t('layout.header.project.open') }}
        </MenuItem>
        <MenuItem>
          {{ $t('layout.header.project.save') }}
        </MenuItem>
        <MenuItem>
          {{ $t('layout.header.project.report') }}
        </MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
  import { Dropdown, Menu, MenuItem } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { useDesign } from '/@/utils/hooks/web/useDesign';

  const { prefixCls } = useDesign('header-user-dropdown');

  defineProps({
    theme: {
      type: String as PropType<'dark' | 'light'>,
      default: 'light',
    },
  });
</script>

<style scoped lang="less">
  @prefix-cls: ~'@{namespace}-header-file-dropdown';

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
