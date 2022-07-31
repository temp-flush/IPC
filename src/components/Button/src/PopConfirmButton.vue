<script lang="ts">
  import { computed, defineComponent, h, unref } from 'vue';
  import BasicButton from './BasicButton.vue';
  import { Popconfirm } from 'ant-design-vue';
  import { extendSlots } from '/@/utils/helper/tsxHelper';
  import { omit } from 'lodash-es';
  import { useAttrs } from '/@/utils/hooks/core/useAttrs';
  import { useI18n } from '/@/utils/hooks/web/useI18n';

  const props = {
    /**
     * Whether to enable the drop-down menu
     * @default: true
     */
    enable: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: Boolean,
      default: false,
    },
  };

  export default defineComponent({
    name: 'PopButton',
    inheritAttrs: false,
    props,
    setup(props, { slots }) {
      const { t } = useI18n();
      const attrs = useAttrs();

      // get inherit binding value
      const getBindValues = computed(() => {
        return Object.assign(
          {
            okText: t('common.okText'),
            cancelText: t('common.cancelText'),
          },
          { ...props, ...unref(attrs) },
        );
      });

      return () => {
        const bindValues = omit(unref(getBindValues), ['icon']);
        const btnBind = omit(bindValues, 'title') as Recordable;
        if (btnBind.disabled) btnBind.color = '';
        if (props.icon) Object.assign(btnBind, { shape: 'circle', type: 'text' });
        const Button = h(BasicButton, btnBind, extendSlots(slots));

        // If it is not enabled, it is a normal button
        if (!props.enable) {
          return Button;
        }

        //  <Button shape="circle" type="text" ">
        //   <template #icon>

        //   </template>
        // </Button>
        return h(Popconfirm, bindValues, { default: () => Button });
      };
    },
  });
</script>
