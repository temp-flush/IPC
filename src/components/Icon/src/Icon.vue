<template>
  <Button v-if="button" shape="circle" type="text" :class="[$attrs.class]">
    <template #icon>
      <SvgIcon
        :size="size"
        :name="getSvgIcon"
        v-if="isSvgIcon"
        :class="['anticon', clickable && 'cursor-pointer']"
        :spin="spin"
      />
      <span
        v-else
        ref="elRef"
        :class="['app-iconify anticon', spin && 'app-iconify-spin', clickable && 'cursor-pointer']"
        :style="getWrapStyle"
      ></span>
    </template>
  </Button>
  <SvgIcon
    :size="size"
    :name="getSvgIcon"
    v-else-if="isSvgIcon"
    :class="[$attrs.class, 'anticon', clickable && 'cursor-pointer']"
    :spin="spin"
    @click="getClick"
    :disabled="disabled"
  />
  <ImgIcon
    :size="size"
    :name="getImgIcon"
    v-else-if="isImgIcon"
    :class="[$attrs.class, 'anticon', clickable && 'cursor-pointer']"
    :spin="spin"
    v-bind="$attrs"
    @click="getClick"
    :disabled="disabled"
  />
  <span
    v-else
    ref="elRef"
    @click="getClick"
    :disabled="disabled"
    :class="[
      $attrs.class,
      'app-iconify anticon',
      spin && 'app-iconify-spin',
      clickable && 'cursor-pointer',
    ]"
    :style="getWrapStyle"
  ></span>
</template>
<script lang="ts">
  import type { PropType } from 'vue';
  import {
    defineComponent,
    ref,
    watch,
    onMounted,
    nextTick,
    unref,
    computed,
    CSSProperties,
  } from 'vue';
  import SvgIcon from './SvgIcon.vue';
  import ImgIcon from './ImgIcon.vue';
  import Iconify from '@purge-icons/generated';
  import { isString } from '/@/utils/is';
  import { propTypes } from '/@/utils/propTypes';
  import { Button } from 'ant-design-vue';

  const SVG_END_WITH_FLAG = '|svg';
  const IMG_END_WITH_FLAG = '|img';
  export default defineComponent({
    name: 'Icon',
    components: { SvgIcon, Button, ImgIcon },
    props: {
      // icon name
      icon: String as PropType<string>,
      button: propTypes.bool.def(false),
      // icon color
      color: propTypes.string,
      // icon size
      size: {
        type: [String, Number] as PropType<string | number>,
        default: 16,
      },
      spin: propTypes.bool.def(false),
      prefix: propTypes.string.def(''),
      onClick: { type: Function },
      disabled: { type: Boolean, default: false },
    },
    setup(props, { attrs }) {
      const elRef = ref<ElRef>(null);

      const isSvgIcon = computed(() => props.icon?.endsWith(SVG_END_WITH_FLAG));
      const getSvgIcon = computed(() => props.icon!.replace(SVG_END_WITH_FLAG, ''));
      const getIconRef = computed(() => `${props.prefix ? props.prefix + ':' : ''}${props.icon}`);

      const isImgIcon = computed(() => props.icon?.endsWith(IMG_END_WITH_FLAG));
      const getImgIcon = computed(() => props.icon!.replace(IMG_END_WITH_FLAG, ''));

      const clickable = computed(() => !!props.onClick);

      const getClick = (event: MouseEvent) => {
        props.disabled || props.onClick?.(event);
      };
      const update = async () => {
        if (unref(isSvgIcon)) return;

        const el = unref(elRef);
        if (!el) return;

        await nextTick();
        const icon = unref(getIconRef);
        if (!icon) return;

        const svg = Iconify.renderSVG(icon, {});
        if (svg) {
          el.textContent = '';
          el.appendChild(svg);
        } else {
          const span = document.createElement('span');
          span.className = 'iconify';
          span.dataset.icon = icon;
          el.textContent = '';
          el.appendChild(span);
        }
      };

      const getWrapStyle = computed((): CSSProperties => {
        const { size, color } = props;
        let fs = size;
        if (isString(size)) {
          fs = parseInt(size, 10);
        }

        return {
          fontSize: `${fs}px`,
          color: color,
          display: 'inline-flex',
        };
      });

      watch(() => props.icon, update, { flush: 'post' });

      onMounted(update);

      return {
        elRef,
        getWrapStyle,
        isSvgIcon,
        getSvgIcon,
        isImgIcon,
        getImgIcon,
        clickable,
        getClick,
      };
    },
  });
</script>
<style lang="less">
  .app-iconify {
    display: inline-block;
    // vertical-align: middle;

    &-spin {
      svg {
        animation: loadingCircle 1s infinite linear;
      }
    }
  }

  span.iconify {
    display: block;

    min-width: 1em;
    min-height: 1em;

    border-radius: 100%;
    background-color: @iconify-bg-color;
  }

  .anticon {
    &[disabled='true'] {
      .disabled-mixin();
    }
  }
</style>
