<template>
  <i class="sp-icon-img" :class="[`sp-icon-${name}`, { active: active }]" :style="getStyle">
    <slot></slot>
  </i>
</template>
<script lang="ts" setup>
  import { CSSProperties } from 'vue';
  import { computed } from 'vue';
  const props = defineProps({
    name: { type: String, required: true },
    active: { type: Boolean, default: false },
    size: {
      type: [Number, String],
      default: 16,
    },
  });

  const getStyle = computed((): CSSProperties => {
    const { size } = props;
    let s = `${size}`;
    s = `${s.replace('px', '')}px`;
    return {
      width: s,
      height: s,
    };
  });
</script>
<style lang="less" scoped>
  .icon-mixin-active (@name,@type,@active,@prefix,@ext) when (@active=true) {
    .@{prefix}icon-@{name} {
      // .ivu-menu-item-active &,
      // .is-collapsed .ivu-menu-opened &,
      &.active,
      &:hover:not([static]) {
        // &::before {
        background-image: url('../../../assets/@{type}/@{name}-active.@{ext}');
        // }
      }
    }

    .icon-mixin(~'@{name}-active', @type, false, @ext);
  }
  .icon-mixin(@name,@type:icons,@active:true,@ext:png) {
    // @size: 20px;
    @prefix: if(@type=makespace, ~'sp-', ~'sp-');
    .@{prefix}icon-@{name} {
      background-image: url('../../../assets/@{type}/@{name}.@{ext}');
    }
    .icon-mixin-active(@name, @type, @active, @prefix, @ext);
  }

  .sp-icon-img {
    font-style: normal;

    display: inline-block;

    box-sizing: border-box;
    background-size: contain;
    background-repeat: no-repeat;
    vertical-align: 0;
  }
  .icon-mixin(d-can,icons,false);
  .icon-mixin(d-power,icons,false);
  .icon-mixin(d-station,icons,false);
  .icon-mixin(d-expand,icons,false);
  .icon-mixin(d-terminal,icons,false);
  .icon-mixin(header-lang);
  .icon-mixin(header-help);
  .icon-mixin(detect);
  .icon-mixin(filter-control);
  .icon-mixin(filter-terminal);
</style>
