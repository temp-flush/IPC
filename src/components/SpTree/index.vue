<template>
  <Tree
    checkable
    :load-data="onLoad"
    :tree-data="dataSrouce"
    showIcon
    @select="onSelect"
    :multiple="false"
  >
    <template #title="{ title, children, data }">
      <div class="flex gap-2">
        <div>
          <Icon icon="tree-group|svg" v-if="!!children" />
          <Icon icon="tree-zone|svg" v-else />
        </div>
        <div class="flex-1" v-if="data">{{ title }}</div>
        <div class="space-x-2">
          <Icon icon="status-net|svg" v-if="!!data" />
        </div>
      </div>
    </template>
  </Tree>
</template>
<script lang="ts">
  /**
   * 将嵌套的 tree 数据转换成平铺结构
   * plainItem: {id,title,parentId,sortIndex,children?}
   * @param treeData
   */
  export function unpackTreeData(treeData: any[]) {
    function unpackChildren(data: any) {
      const children = (data.children || []).map((item: any) => unpackChildren(item)).flat();

      // 注释掉是为了不改变元素结构，只返回新的数组
      // Reflect.deleteProperty(data, 'children')
      return [data, ...children];
    }

    return treeData.map((item) => unpackChildren(item)).flat();
  }
  /**
   * 将平铺的 tree 数据转换成嵌套结构
   * 先以公司分组，再组织树结构
   * treeItem: {id,title,parentId,children,companyId,companyName}
   * @param plainData
   */
  export function packTreeData(plainData: any[]) {
    // const companyGroups = Object.values(groupBy(plainData || [], 'companyId'));
    // function packChildren(data: any, groupsByParent: any) {
    //   const children = groupsByParent[data.id];
    //   if (children) data.children = children.map((item: any) => packChildren(item, groupsByParent));
    //   else Reflect.deleteProperty(data, 'children');
    //   return data;
    // }
    // return companyGroups.map((company: any[]) => {
    //   const { companyId: id, companyName: title } = company[0];
    //   const groupsByParent = groupBy(company || [], 'parentId');
    //   const children = groupsByParent['0']?.map((item) => packChildren(item, groupsByParent)) ?? [];
    //   return { id, title, children, isCompany: true } as any;
    // });
  }
</script>
<script lang="ts" setup>
  import { computed, ref, watchEffect } from 'vue';
  import { Tree } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { DEVICE_TYPE } from '/@/enums/deviceEnum';

  const props = defineProps({
    dataSrouce: { type: Array as PropType<any[]>, default: () => [] },
    onSelect: { type: Function as PropType<(...args: any[]) => any> },
    onLoad: { type: Function as PropType<(...args: any[]) => any> },
  });
  
  console.log(props.dataSrouce)

  const expandedKeys = ref<string[]>([]);
  const selectedKeys = ref<string[]>([]);
  const checkedKeys = ref<string[]>([]);
</script>
<style scoped lang="less">
  :deep(.ant-tree-node-selected) {
    background-color: #dcdddd !important;
  }
</style>
