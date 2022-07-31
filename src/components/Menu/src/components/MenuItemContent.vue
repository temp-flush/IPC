<template>
  <span :class="`${prefixCls}- flex items-center`" class="text-base leading-12">
    <Icon v-if="getIcon" :icon="getIcon" :size="22" :class="`${prefixCls}-wrapper__icon mr-2`" />
    {{ getI18nName }}
  </span>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';

  import Icon from '/@/components/Icon/index';
  import { useI18n } from '/@/utils/hooks/web/useI18n';
  import { useDesign } from '/@/utils/hooks/web/useDesign';
  import { contentProps } from '../props';
  const { t } = useI18n();

  export default defineComponent({
    name: 'MenuItemContent',
    components: {
      Icon,
    },
    props: contentProps,
    setup(props) {
      const { prefixCls } = useDesign('basic-menu-item-content');
      const getI18nName = computed(() => t(props.item?.name));
      const getIcon = computed(() => props.item?.icon);

      return {
        prefixCls,
        getI18nName,
        getIcon,
      };
    },
  });
</script>
