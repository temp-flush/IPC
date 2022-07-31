<template>
  <SpContainer>
    <SpTable
      :columns="tableCols"
      :data-source="tableData"
      :pagination="false"
      v-model:select-keys="selectKeys"
      ref="refTable"
    >
      <template #username="{ record, text }: ScopeType">
        <div>
          <SpFormInput
            v-if="editableData[record.id]"
            v-model:value="editableData[record.id].username"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template #password="{ record }: ScopeType">
        <div>
          <SpFormInput
            v-if="editableData[record.id]"
            type="password"
            v-model:value="editableData[record.id].password"
          />
          <template v-else>
            {{ '。。。。。。' }}
          </template>
        </div>
      </template>
      <template #level="{ record, text }">
        <div>
          <SpFormSelect
            v-if="editableData[record.id]"
            v-model:value="editableData[record.id].level"
            :options="optionsLevel"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template #action="{ record }: ScopeType">
        <Icon
          v-if="editableData[record.id]"
          icon="carbon:save"
          size="28"
          @click="save(record.id)"
        />
        <Icon v-else icon="carbon:edit" size="28" @click="edit(record.id)" />
      </template>
    </SpTable>
  </SpContainer>
</template>

<script setup lang="ts">
  import { Icon } from '/@/components/Icon';
  import { useI18n } from '/@/utils/hooks/web/useI18n';
  import SpTable, { useSpTable } from '/@/components/SpTable/index.vue';
  import type { RecordType } from '/@/components/SpTable/index.vue';

  import { reactive, UnwrapRef, ref, watchEffect } from 'vue';

  import { userListGet } from '/@/serveices';
  import { cloneDeep } from 'lodash-es';

  import SpFormInput from '/@/components/SpForm/SpFormInput.vue';
  import SpFormSelect from '/@/components/SpForm/SpFormSelect.vue';
  const optionsLevel = Array(7)
    .fill(0)
    .map((v, i) => ({ value: i + 1, label: i + 1 }));

  // detect
  const { t } = useI18n();
  const tableData = ref([
    {
      key: '1',
      id: '1',
      userId: '1',
      username: 'vben',
      password: '123',
      level: 2,
      functionKey: 'timer0On',
      type: 'functionKey',
    },
  ]);
  const { tableRequest, refTable, tableCols, selectKeys, onRemove} = useSpTable({
    request: userListGet,
    cols: [
      {
        dataIndex: 'username',
        title: t('routes.user.form.username'),
        width: 50,
        slots: { customRender: 'username' },
      },
      {
        dataIndex: 'password',
        title: t('routes.user.form.password'),
        width: 50,
        slots: { customRender: 'password' },
      },
      {
        dataIndex: 'level',
        title: t('routes.user.form.level'),
        width: 50,
        slots: { customRender: 'level' },
      },
      {
        key: 'action',
        title: t('routes.user.form.action'),
        width: 30,
        align: 'center',
        slots: { customRender: 'action' },
      },
    ] as const,
    remove: function() {
      return new Promise((resolve, reject) => {
        setTimeout(()=>{
          console.log(3333333)
          resolve()
        }, 100)
      })
    },
  });
  type ScopeType = {
    record: RecordType<typeof tableCols>;
    text: string;
  };
  const editableData: UnwrapRef<Record<string, ScopeType['record']>> = reactive({});
  const edit = (key: number) => {
    console.log(key, tableData)
    editableData[key] = cloneDeep(tableData.value?.filter((item) => key === item.id)[0]);
  };
  const save = (key: number) => {
    Object.assign(tableData.value.filter((item) => key === item.id)[0], editableData[key]);
    delete editableData[key];
  };
  const add = () => {
    tableData.value.push({
      key: '2',
      id: '2',
      userId: '2',
      username: 'vben2',
      password: '123',
      level: 3,
      functionKey: 'timer0On',
      type: 'functionKey',
    });
  };
  const del = () => {
    console.log(onRemove)
    onRemove(selectKeys.value)
  };
  defineExpose({
    add,
    del,
  });
</script>
<style scoped></style>
