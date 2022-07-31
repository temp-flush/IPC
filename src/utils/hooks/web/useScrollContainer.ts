import { computed, getCurrentInstance, inject, onMounted, provide, ref, Ref, unref } from 'vue';
import { calcSubtractSpace } from './useContentHeight';
type ContainerSpace = {
  offset?: number | Ref<number | undefined>;
  height?: number | Ref<number | undefined>;
  siblings?: Ref<any>[];
  spaces?: Ref<any>[];
};

const ClientHeight = window.innerHeight;

export default function useScrollContainer(current: ContainerSpace) {
  const parentContainer = inject(
    'scrollContainer',
    ref<{
      offset: number;
      height: number; // min-height
    }>({ offset: 0, height: ClientHeight }),
  );
  const scrollContainer = computed(() => {
    const calcHeight = parentContainer.value.height - parentContainer.value.offset;
    const maxHeight = Math.max(unref(current.height) ?? 0, calcHeight);
    const offset =
      /* (typeof current.height === 'number' ? 0 : parentContainer.value.offset ?? 0) + */
      (unref(current.offset) ?? 0) + siblingOffset.value + spaceOffset.value;

    // console.log(unref(current.height) ?? calcHeight, offset, current.spaces?.[0].value);

    return { offset, height: unref(current.height) ?? calcHeight };
  });
  provide('scrollContainer', scrollContainer);

  const spaceOffset = ref(0);
  const siblingOffset = ref(0);
  onMounted(() => {
    // console.log(toRaw(current.siblings?.[0]?.value), isVNode(toRaw(current.siblings?.[0]?.value)));
    sumOffset();
  });

  function sumOffset() {
    spaceOffset.value =
      current.spaces
        ?.map((dom) => calcSubtractSpace(dom.value))
        .reduce((sum, item) => sum + item, 0) ?? 0;
    siblingOffset.value =
      current.siblings
        ?.map((dom) => dom.value?.offsetHeight ?? 0 + calcSubtractSpace(dom.value, 'margin'))
        .reduce((sum, item) => sum + item, 0) ?? 0;
    // console.log(siblingOffset.value);
  }
  // console.log(scrollContainer.top);

  const contentHeight = computed(() => {
    return scrollContainer.value.height - scrollContainer.value.offset;
  });
  return { contentHeight, reCalc: sumOffset };
}
