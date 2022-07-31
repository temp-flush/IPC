<template>
  <Card
    class="flex flex-col p-4 sp-card"
    v-bind="$attrs"
    :class="{ 'sp-card__shin': thin }"
    :bordered="bordered"
    ref="refCard"
  >
    <template #title v-if="!!$slots.title">
      <slot name="title"></slot>
    </template>
    <template #extra>
      <slot name="extra"></slot>
    </template>
    <div :style="styles">
      <slot></slot>
      <div class="sp-card__footer" v-if="!!$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </Card>
</template>
<script lang="ts">
  import { computed, defineComponent, nextTick, onMounted, ref, watch } from 'vue';
  import { Card } from 'ant-design-vue';
  import useScrollContainer from '/@/utils/hooks/web/useScrollContainer';

  export default defineComponent({
    name: 'SpCard',
    components: { Card },
    props: {
      flex: { type: Boolean, required: false },
      thin: { type: Boolean, required: false },
      full: { type: Boolean, required: false },
      reCalc: { type: null },
      bordered: { type: Boolean, default: false },
    },
    setup(props) {
      const refCard = ref();
      const refHead = ref();
      const refFooter = ref();
      const refContent = ref();
      const { contentHeight: maxHeight, reCalc } = useScrollContainer({
        spaces: [refContent],
        siblings: [refHead, refFooter],
      });
      onMounted(() => {
        refContent.value = refCard.value.$el?.querySelector('.ant-card-body');
        refHead.value = refCard.value.$el?.querySelector('.ant-card-head');
        refFooter.value = refCard.value.$el?.querySelector('.sp-card__footer');
        reCalc();
      });
      const styles = computed(() => {
        const data = {} as any;
        props.full &&
          Object.assign(data, {
            height: maxHeight.value + 'px',
            boxSizing: 'content-box',
          });
        return data;
      });
      watch(
        () => props.reCalc,
        (newValue, oldValue) => {
          nextTick(() => {
            reCalc();
          });
        },
      );
      return { styles, refCard };
    },
  });
</script>

<style lang="less" scoped>
  .sp-card {
    background-color: white;

    &.sp-card__shin {
      :deep {
        > .ant-card-body {
          padding-right: 0;
          padding-left: 0;
        }
      }
    }

    & + .sp-card {
      margin-top: @offset;
    }

    &__footer {
      margin-top: @offset;
      padding-top: @offset;

      border-top: 1px solid #ebeef5;
    }

    :deep {
      > .ant-card-body {
        flex: 1;

        background-color: transparent;
      }

      > .ant-card-extra {
        .ant-btn {
          margin-top: -@offset / 3;
        }
      }

      > .ant-card-head {
        padding-bottom: 0;

        color: white;
        border-bottom: none;
        background-color: #332c2b;
      }
    }
  }
</style>
