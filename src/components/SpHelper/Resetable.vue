<!-- 强制刷新组件 -->
<script lang="tsx">
  import { defineComponent, ref, provide, watch } from 'vue';
  // import { getSlot } from '/@/utils/helper/tsxHelper';

  export default defineComponent({
    name: 'Resetable',
    props: {
      // 从外部刷新
      listen: { type: null, default: () => null },
    },

    setup(props, { slots }) {
      const key = ref(Math.random().toString());

      // watch(() => props.listen, updateKey);
      // 从内部刷新
      provide('resetSelf', updateKey);
      function updateKey() {
        key.value = Math.random().toString();
      }
      return () => <div key={key.value}> {slots.default && slots.default()}</div>;
    },
  });
</script>
