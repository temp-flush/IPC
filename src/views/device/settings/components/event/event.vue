<template>
  <SpCard :re-calc="visible">
    <template #title>
      <Form layout="inline" :model="formState" ref="refForm" :colon="false">
        <SpFormItem name="duration" :labelCol="{ span: 10 }">
          <template #label>
            <span class="text-white">{{ $t('routes.device.setting.event.form.command') }}</span>
          </template>
          <SpFormSelect v-model:value="formState.command" :options="optionsCommand" />
        </SpFormItem>
      </Form>
    </template>
    <template #extra>
      <Icon icon="carbon:save" size="40" @click="timerSave" color="white" class="mr-8" />
      <Icon icon="add-white|svg" class="!w-14 !h-8.5" @click="onAdd" />
      <Icon
        icon="remove-white|svg"
        class="!w-14 !h-8.5"
        @click="onRemove"
        :disabled="!selectKeys.length"
      />
      <Icon icon="carbon:down-to-bottom" size="40" class="ml-8" color="white" @click="timerHide" />
    </template>
    <SpTable
      ref="refTable"
      :data-source="tableData.length ? tableData : tableRequest"
      v-model:select-keys="selectKeys"
      select-type="radio"
      :columns="tableCols"
    >
      <template #eventName="{ record, text }: ScopeType">
        <div>
          <SpFormInput
            v-if="editableData[record.id]"
            v-model:value="editableData[record.id].name"
          />
          <SpFormInput v-else-if="record.isNew" v-model:value="appendData.eventName" />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template #source="{ record, text }: ScopeType">
        <div>
          <EventSource
            v-if="editableData[record.id]"
            v-model:value="editableData[record.id].source"
            :command="formState.command"
          />
          <EventSource
            v-else-if="record.isNew"
            v-model:value="appendData.source"
            :command="formState.command"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template #operation="{ record, text }: ScopeType">
        <div>
          <EventOperation
            v-if="editableData[record.id]"
            v-model:value="editableData[record.id].operation"
            :command="formState.command"
          />
          <EventOperation
            v-else-if="record.isNew"
            v-model:value="appendData.operation"
            :command="formState.command"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template #zones="{ record, text }: ScopeType">
        <div>
          <EventZone
            v-if="editableData[record.id]"
            v-model:value="editableData[record.id].zones"
            :command="formState.command"
            :multiple="true"
          />
          <EventZone
            v-else-if="record.isNew"
            v-model:value="appendData.zones"
            :command="formState.command"
            :multiple="true"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template #gpo="{ record, text }: ScopeType">
        <div>
          <EventGpo
            v-if="editableData[record.id]"
            v-model:value="editableData[record.id].gpo"
            :command="formState.command"
          />
          <EventGpo
            v-else-if="record.isNew"
            v-model:value="appendData.gpo"
            :command="formState.command"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
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
    <Resetable>
      <DialogAddGpo v-bind="dPropsSet" />
    </Resetable>
  </SpCard>
</template>

<script lang="ts" setup>
  import SpTable, { useSpTable } from '/@/components/SpTable/index.vue';
  import type { RecordType } from '/@/components/SpTable/index.vue';
  import { useI18n } from '/@/utils/hooks/web/useI18n';
  import { Icon } from '/@/components/Icon';
  import { Form } from 'ant-design-vue';
  import { useDialog, Resetable } from '/@/components/SpModal/useSpModal';
  import DialogAddGpo, {
    DataType as DDTypeAddGpo,
  } from '/@/views/device/settings/dialog/add-input.vue';
  const appendData = reactive({
    eventId: '',
    eventName: '',
    gpo: '',
    id: undefined,
    operation: undefined,
    source: '',
    zones: '',
  });
  const dOpen = () => {
    console.log(tableData);
  };

  const props = defineProps({
    visible: { type: Boolean, default: false },
    value: { type: Number },
    name: { type: String },
  });

  // form
  import useSpForm from '/@/components/SpForm/useSpForm';
  import SpFormInput from '/@/components/SpForm/SpFormInput.vue';
  import SpFormSelect from '/@/components/SpForm/SpFormSelect.vue';
  import EventOperation from './eventOperation.vue';
  import EventZone from './eventZone.vue';
  import EventGpo from './eventGpo.vue';
  import EventSource from './eventSource.vue';
  const { formState, refForm, getForm, updateForm } = useSpForm<{ command: EventCommand }>({
    command: 'serverMusicSending',
  });
  const optionsCommand = EVENT_COMMAND_LIST;

  // table
  const { t } = useI18n();
  import { deviceEventGet, deviceEventRemove, deviceEventUpdate, deviceEventAdd } from '/@/serveices';
  import { EVENT_COMMAND_LIST } from '../../utils/enum';
  import type { EventCommand } from '../../utils/enum';
  import { reactive, UnwrapRef, watch, watchEffect } from 'vue';
  import { cloneDeep } from 'lodash-es';
  const { tableRequest, refTable, tableCols, selectKeys, onRemove, onAdd, tableData } = useSpTable({
    request: deviceEventGet,
    remove: deviceEventRemove,
    cols: [
      {
        dataIndex: 'id',
        title: t('routes.device.setting.event.form.eventId'),
        width: 40,
        slots: { customRender: 'eventId' },
      },
      {
        dataIndex: 'name',
        title: t('routes.device.setting.event.form.eventName'),
        width: 100,
        slots: { customRender: 'eventName' },
      },
      {
        dataIndex: 'source',
        title: t('routes.device.setting.event.form.source'),
        width: 100,
        slots: { customRender: 'source' },
      },
      {
        dataIndex: 'operation',
        title: t('routes.device.setting.event.form.operation'),
        width: 60,
        slots: { customRender: 'operation' },
      },
      {
        dataIndex: 'zones',
        title: t('routes.device.setting.event.form.zones'),
        width: 100,
        slots: { customRender: 'zones' },
      },
      {
        dataIndex: 'gpo',
        title: t('routes.device.setting.event.form.gpo'),
        width: 100,
        slots: { customRender: 'gpo' },
      },
      {
        key: 'action',
        title: t('routes.device.setting.event.form.action'),
        width: 40,
        slots: { customRender: 'action' },
      },
    ] as const,
  });
  type ScopeType = {
    record: RecordType<typeof tableCols>;
    text: string;
  };

  // edit
  const emit = defineEmits(['update:value', 'update:visible', 'update:name']);
  const editableData: UnwrapRef<Record<string, ScopeType['record']>> = reactive({});
  const edit = (key: number) => {
    console.log(tableData)
    editableData[key] = cloneDeep(tableData.value.items.filter((item) => key === item.id)[0]);
  };
  const save = (key: number) => {
    console.log(appendData, key);
    if (!key) {
      deviceEventAdd(appendData).then(res=>{
        console.log(res);
      });
    } else {
      deviceEventUpdate(editableData[key]).then(res=>{
        Object.assign(tableData.value.filter((item) => key === item.id)[0], editableData[key]);
        delete editableData[key];
      });
    }
  };
  function timerSave() {
    const filterData = cloneDeep(tableData.value.items.filter((item) => selectKeys.value[0] === item.id)[0]);
    console.log(filterData)
    emit('update:name', filterData.name);
    emit('update:value', selectKeys.value[0]);
    timerHide();
  }
  function timerHide() {
    emit('update:visible', false);
  }
  watchEffect(() => {
    selectKeys.value = props.value === undefined ? [] : [props.value];
  });
  watch(
    () => props.visible,
    () => {
      if (!props.visible) {
        for (const key in editableData) {
          if (Object.prototype.hasOwnProperty.call(editableData, key)) {
            Reflect.deleteProperty(editableData, key);
          }
        }
      }
    },
  );
</script>
<style lang="less" scoped></style>
