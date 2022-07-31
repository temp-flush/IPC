<template>
  <SpContainer class="overflow-y-auto" full>
    <SpContainer :height="eventVisible ? 600 : undefined" :re-calc="eventVisible">
      <SpCard>
        <template #title>
          <div>{{ $t('routes.device.setting.gpiEventSetting.form.title') }}</div>
        </template>
        <template #extra>
          <Icon icon="add-white|svg" class="!w-14 !h-8.5" @click="onAdd" />
          <Icon
            icon="remove-white|svg"
            class="!w-14 !h-8.5"
            @click="onRemove"
            :disabled="!selectKeys.length"
          />
        </template>
        <SpTable
          ref="refTable"
          :data-source="tableData.length ? tableData : tableRequest"
          v-model:select-keys="selectKeys"
          :columns="tableCols"
        >
          <template #GPI="{ record, text }: ScopeType">
            <div>
              <SpFormSelect
                v-if="editableData[record.id]"
                v-model:value="editableData[record.id].gpi"
                :options="optionsType"
                @onChange="onTypeChange(record.id, $event)"
              />
              <SpFormSelect
                v-else-if="record.isNew"
                v-model:value="appendData.gpi"
                :options="optionsType"
                @onChange="onTypeChange(record.id, $event)"
              />
              <template v-else>
                {{ text }}
              </template>
            </div>
          </template>
          <template #type="{ record, text }: ScopeType">
            <div>
              <SpFormSelect
                v-if="editableData[record.id]"
                v-model:value="editableData[record.id].type"
                :options="optionsType"
                @onChange="onTypeChange(record.id, $event)"
              />
              <SpFormSelect
                v-else-if="record.isNew"
                v-model:value="appendData.type"
                :options="optionsType"
                @onChange="onTypeChange(record.id, $event)"
              />
              <template v-else>
                {{ text }}
              </template>
            </div>
          </template>
          <template #eventId="{ record, text }: ScopeType">
            <div>
              <SpFormInput
                v-if="editableData[record.id]"
                dialog
                @focus="eventOpen(record.id)"
                v-model:value="editableData[record.id].eventId"
              />
              <SpFormInput
                v-else-if="record.isNew"
                dialog
                @focus="eventOpen(-1)"
                v-model:value="appendData.eventId"
              />
              <template v-else>
                {{ text }}
              </template>
            </div>
          </template>
          <template #eventName="{ record, text }: ScopeType">
            <div>
              <template v-if="record.isNew">
                {{ appendData.eventName }}
              </template>
              <template v-else>
                {{ text }}
              </template>
            </div>
          </template>
          <template #functionKey="{ record, text }: ScopeType">
            <div>
              <SpFormSelect
                v-if="editableData[record.id]"
                v-model:value="editableData[record.id].functionKey"
                :options="optionsKeyFunction"
              />
              <SpFormSelect
                v-else-if="record.isNew"
                v-model:value="appendData.functionKey"
                :options="optionsKeyFunction"
              />
              <template v-else>
                {{ text }}
              </template>
            </div>
          </template>
          <template #test="{ record }: ScopeType">
            <Icon
              v-if="record.isNew"
              :disabled="!record.eventId && !record.functionKey"
              icon="carbon:play"
              size="28"
              @click="test(record.id)"
            />
            <Icon
              v-else
              :disabled="!record.eventId && !record.functionKey"
              icon="carbon:play"
              size="28"
              @click="test(-1)"
            />
          </template>
          <template #action="{ record }: ScopeType">
            <Icon
              v-if="editableData[record.id] || record.isNew"
              icon="carbon:save"
              size="28"
              @click="save(record.id)"
            />
            <Icon v-else icon="carbon:edit" size="28" @click="edit(record.id)" />
          </template>
        </SpTable>
      </SpCard>
      <template #footer="{ spRef }">
        <div :ref="spRef" v-show="eventVisible" style="height: 300px">
          <SpContainer :height="300">
            <TimerEvent
              v-model:visible="eventVisible"
              v-model:value="focusRecord.eventId"
              v-model:name="focusRecord.eventName"
            />
          </SpContainer>
        </div>
      </template>
    </SpContainer>
  </SpContainer>
</template>
<script lang="ts" setup>
  import SpTable, { useSpTable } from '/@/components/SpTable/index.vue';
  import type { RecordType } from '/@/components/SpTable/index.vue';
  import { useI18n } from '/@/utils/hooks/web/useI18n';
  import { Icon } from '/@/components/Icon';

  // form
  import SpFormInput from '/@/components/SpForm/SpFormInput.vue';
  import SpFormSelect from '/@/components/SpForm/SpFormSelect.vue';
  import TimerEvent from '../../event/event.vue';
  import { useDialog, Resetable } from '/@/components/SpModal/useSpModal';
  import DialogAddGpo, {
    DataType as DDTypeAddGpo,
  } from '/@/views/device/settings/dialog/add-input.vue';
  const optionsType = [
    { value: 'functionKey', label: 'Function Key' },
    { value: 'event', label: 'Event' },
  ];
  function onTypeChange(key: number, type: string) {
    if (type === 'event') {
      editableData[key].eventId = '';
      editableData[key].eventName = '';
    } else {
      editableData[key].functionKey = '';
    }
  }
  const optionsKeyFunction = KEY_FUNCTION_LIST;
  const { dialogOpen: dOpenSet, dialogProps: dPropsSet } = useDialog((result) => {
    // pushBgm(result);
  });
  const dOpen = () => {
    // eslint-disable-next-line vue/no-mutating-props
    console.log(dOpenSet);
    dOpenSet();
  };
  // table
  const { t } = useI18n();
  const appendData = reactive({
    gpi: '',
    type: 'event',
    eventId: '',
    eventName: '',
    functionKey: 'FaultReset',
    id: '',
  });
  import {
    deviceGpiEventSettingGet,
    deviceGpiEventSettingRemove,
    deviceGpiEventSettingUpdate,
    deviceGpiEventSettingAdd,
  } from '/@/serveices';
  import { reactive, ref, UnwrapRef } from 'vue';
  import { cloneDeep } from 'lodash-es';
  import { KEY_FUNCTION_LIST } from '../../../utils/enum';
  const { tableRequest, refTable, tableCols, selectKeys, onAdd, tableData } = useSpTable({
    request: deviceGpiEventSettingGet,
    remove: deviceGpiEventSettingRemove,
    cols: [
      {
        dataIndex: 'gpi',
        title: t('routes.device.setting.gpiEventSetting.form.gpi'),
        width: 60,
        slots: { customRender: 'GPI' },
      },
      {
        dataIndex: 'type',
        title: 'Name',
        width: 100,
        slots: { customRender: 'type' },
      },
      {
        dataIndex: 'eventId',
        title: t('routes.device.setting.gpiEventSetting.form.eventId'),
        width: 60,
        slots: { customRender: 'eventId' },
      },
      {
        dataIndex: 'eventName',
        title: t('routes.device.setting.gpiEventSetting.form.eventName'),
        width: 100,
        slots: { customRender: 'eventName' },
      },
      // {
      //   dataIndex: 'functionKey',
      //   title: t('routes.device.setting.gpiEventSetting.form.functionKey'),
      //   width: 60,
      //   slots: { customRender: 'functionKey' },
      // },
      {
        key: 'test',
        title: t('routes.device.setting.gpiEventSetting.form.test'),
        width: 60,
        slots: { customRender: 'test' },
      },
      {
        key: 'action',
        title: t('routes.device.setting.gpiEventSetting.form.action'),
        width: 60,
        slots: { customRender: 'action' },
      },
    ] as const,
  });
  type ScopeType = {
    record: RecordType<typeof tableCols>;
    text: string;
  };

  // edit
  const editableData: UnwrapRef<Record<string, ScopeType['record']>> = reactive({});
  const edit = (key: number) => {
    editableData[key] = cloneDeep(tableData.value.filter((item) => key === item.id)[0]);
  };
  const save = (key: number) => {
    if (key == -1) {
      eventVisible.value = false;
      deviceGpiEventSettingAdd(appendData).then((res) => {
        console.log(res)
      });
    } else {
      eventVisible.value = false;
      console.log(editableData[key]);
      deviceGpiEventSettingUpdate(editableData[key]).then(() => {
        Object.assign(tableData.value.items.filter((item) => key === item.id)[0], editableData[key]);
        delete editableData[key];
      });
    }
  };
  function test(key: number) {
    //
  }

  // event
  const eventVisible = ref(false);
  const focusRecord = ref({} as ScopeType['record']);
  function eventOpen(key: number) {
    if (key == -1) {
      focusRecord.value = appendData;
    } else {
      focusRecord.value = editableData[key];
    }
    eventVisible.value = true;
  }
</script>
<style lang="less" scoped></style>
