<template>
  <div ref="refContent" :style="styles">
    <slot name="header" :sp-ref="($event) => (refHeader = $event)"></slot>
    <slot></slot>
    <slot name="footer" :sp-ref="($event) => (refFooter = $event)"></slot>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, ref, watch, nextTick } from 'vue';
  import useScrollContainer from '/@/utils/hooks/web/useScrollContainer';

  export default defineComponent({
    name: 'SpContainer',
    props: {
      full: { type: Boolean, default: false },
      reCalc: { type: null },
      height: { type: Number },
      log: { type: null },
    },
    setup(props, { slots }) {
      const refContent = ref();
      const refHeader = ref();
      const refFooter = ref();
      const height = computed(() => props.height);
      const { contentHeight: maxHeight, reCalc } = useScrollContainer({
        height,
        spaces: [refContent],
        siblings: [refFooter, refHeader],
      });
      const styles = computed(() => {
        const data = {} as any;
        props.full &&
          Object.assign(data, {
            height: maxHeight.value + 'px',
            boxSizing: 'content-box',
          });
        props.log &&
          console.log(
            `%c ${props.log}`,
            'font-size:13px; background:pink; color:#bf2c9f;',
            maxHeight.value,
          );

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
      return { refContent, refFooter, refHeader, styles };
    },
  });
</script>
