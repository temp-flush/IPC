<template>
  <SpContainer class="overflow-y-auto" full>
    <SpContainer :height="eventVisible ? 600 : undefined" :re-calc="eventVisible">
      <SpCard>
        <template #title>
          <Form layout="inline" :model="formState" ref="refForm" :colon="false">
            <SpFormItem name="duration" :labelCol="{ span: 12 }">
              <template #label>
                <span class="text-white">{{
                  $t('routes.device.setting.timerSetting.form.duration')
                }}</span>
              </template>
              <TimerDateRange v-model:value="formState.duration" />
            </SpFormItem>
            <SpFormItem name="status" hide-label>
              <Switch
                checked-children="on"
                un-checked-children="off"
                v-model:checked="formState.status"
              />
            </SpFormItem>
          </Form>
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
          <template #time="{ record, text }: ScopeType">
            <div>
              <TimePicker
                v-if="editableData[record.id]"
                v-model:value="editableData[record.id].time"
                valueFormat="HH:mm:ss"
              />
              <TimePicker
                v-else-if="record.isNew"
                v-model:value="appendData.time"
                valueFormat="HH:mm:ss"
              />
              <template v-else>
                {{
                  (JSON.parse(text).hour < 10
                    ? '0' + JSON.parse(text).hour
                    : JSON.parse(text).hour) +
                  ':' +
                  (JSON.parse(text).minute < 10
                    ? '0' + JSON.parse(text).minute
                    : JSON.parse(text).minute) +
                  ':' +
                  (JSON.parse(text).second < 10
                    ? '0' + JSON.parse(text).second
                    : JSON.parse(text).second)
                }}
              </template>
            </div>
          </template>
          <template #week="{ record, text }: ScopeType">
            <div>
              <TimerWeek
                v-if="editableData[record.id]"
                v-model:value="editableData[record.id].week"
              />
              <TimerWeek v-else-if="record.isNew" v-model:value="appendData.week" />
              <template v-else>
                {{
                  text &&
                  JSON.parse(text)
                    .map((v) => {
                      if (isNaN(v * 1)) {
                        return obj[v];
                      } else {
                        return Mathobj[v];
                      }
                    })
                    .join(',')
                }}
              </template>
            </div>
          </template>
          <template #eventId="{ record, text }: ScopeType">
            <div>
              <SpFormInput
                v-if="editableData[record.id]"
                dialog
                @focus="eventOpen(record.id)"
                v-model:value="editableData[record.id].commandId"
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
                {{ getName(record) }}
              </template>
            </div>
          </template>
          <template #status="{ record, text }: ScopeType">
            <div>
              <Switch
                v-if="editableData[record.id]"
                checked-children="on"
                un-checked-children="off"
                v-model:checked="editableData[record.id].status"
              />
              <Switch
                v-else-if="record.isNew"
                checked-children="on"
                un-checked-children="off"
                v-model:checked="appendData.status"
              />
              <template v-else>
                {{ text ? 'on' : 'off' }}
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
            <Icon v-else-if="record.isNew" icon="carbon:save" size="28" @click="save(-1)" />
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
  import { Form, Switch, TimePicker } from 'ant-design-vue';
  import moment from 'moment';
  // form
  import useSpForm from '/@/components/SpForm/useSpForm';
  import SpFormInput from '/@/components/SpForm/SpFormInput.vue';
  import TimerWeek from './timerWeek.vue';
  import TimerDateRange from './timerDateRange.vue';
  import TimerEvent from '../../event/event.vue';
  const { formState, refForm, getForm, updateForm } = useSpForm({ duration: '', status: false });

  // table
  const { t } = useI18n();
  const obj = {
    sun: '星期日',
    mon: '星期一',
    tue: '星期二',
    wed: '星期三',
    thu: '星期四',
    fri: '星期五',
    sat: '星期六',
  };
  const Mathobj = {
    0: '星期日',
    1: '星期一',
    2: '星期二',
    3: '星期三',
    4: '星期四',
    5: '星期五',
    6: '星期六',
  };
  const appendData = reactive({
    time: moment().format('HH:mm:ss'),
    status: true,
    eventName: '',
    eventId: '',
    week: '',
  });
  import {
    deviceTimerSettingGet,
    deviceTimerSettingDelete,
    deviceTimerSettingUpdate,
    deviceTimerSettingAdd,
    deviceEventGet,
  } from '/@/serveices';
  import { reactive, ref, UnwrapRef, onMounted } from 'vue';
  import { cloneDeep } from 'lodash-es';
  import { json } from 'stream/consumers';
  const { tableDatas } = useSpTable({
    request: deviceEventGet,
  });
  const { tableRequest, refTable, tableCols, selectKeys, onRemove, onAdd, tableData } = useSpTable({
    request: deviceTimerSettingGet,
    remove: deviceTimerSettingDelete,
    cols: [
      {
        dataIndex: 'time',
        title: t('routes.device.setting.timerSetting.form.time'),
        width: 60,
        slots: { customRender: 'time' },
      },
      {
        dataIndex: 'week',
        title: t('routes.device.setting.timerSetting.form.week'),
        width: 100,
        slots: { customRender: 'week' },
      },
      {
        dataIndex: 'commandId',
        title: t('routes.device.setting.timerSetting.form.eventId'),
        width: 60,
        slots: { customRender: 'eventId' },
      },
      {
        dataIndex: 'eventName',
        title: t('routes.device.setting.timerSetting.form.eventName'),
        width: 100,
        slots: { customRender: 'eventName' },
      },
      {
        dataIndex: 'enable',
        title: t('routes.device.setting.timerSetting.form.status'),
        width: 60,
        slots: { customRender: 'status' },
      },
      {
        key: 'action',
        title: t('routes.device.setting.timerSetting.form.action'),
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
    console.log(tableData.value);
    editableData[key] = cloneDeep(tableData.value.filter((item) => key === item.id)[0]);
  };
  const save = (key: number) => {
    if (key == -1) {
      eventVisible.value = false;
      deviceTimerSettingAdd(appendData).then((res) => {
        console.log(res);
        tableRequest();
      });
    } else {
      eventVisible.value = false;
      console.log(editableData[key]);
      deviceTimerSettingUpdate(editableData[key]).then(() => {
        Object.assign(tableData.value.filter((item) => key === item.id)[0], editableData[key]);
        delete editableData[key];
        tableRequest();
      });
    }
  };

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
  let command = [];
  onMounted(() => {
    deviceEventGet().then((res) => {
      command = res;
    });
  });
  function getName(key) {
    console.log(tableDatas);
    let showName = '';
    console.log(command);
    command.forEach((element) => {
      console.log(element);
      if (element.id == key.commandId) {
        showName = element.name;
      }
    });
    return showName;
  }
</script>
<style lang="less" scoped>
  // ::v-deep {
  //   .sp-card > .ant-card-head
  // }
</style>
