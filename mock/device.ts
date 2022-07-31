import { success, mockjs, mock, Api, random } from './_util';
import { DEVICE_TYPE } from '/@/enums/deviceEnum';
import { GPO_TYPE, GPO_STATUS, KEY_FUNCTION_LIST } from '/@/views/device/settings/utils/enum';

mockjs.Random.extend({
  deviceType(type) {
    return type || this.constantId(DEVICE_TYPE);
  },
  gpoType(type) {
    return this.constantId(GPO_TYPE);
  },
  gpoStatus(type) {
    return this.constantId(GPO_STATUS);
  },
  deviceRecord(type = '') {
    const ttype = mock(`@deviceType('${type}')`);
    return mock({
      id: '@increment(1)',
      type: ttype,
      name: '@ctitle()' + ttype,
      mac: '@guid',
      version: '@title',
      info: '@ctitle',
      ip: '@ip',
      gateway: '@ip',
      submask: '@ip',
      dhcp: '@boolean',
      onlineStatus: '@boolean',
    });
  },
  groupRecord() {
    return mock({
      id: '@increment()',
      name: '@ctitle()',
    });
  },
  audioFileRecord() {
    return mock({
      id: '@increment()',
      name: '@ctitle()',
      size: '@size(0,10000)',
      duration: '@integer(0,1000)' + 's',
      bitRate: '@integer(0,256)' + 'kbps',
      title: '@ctitle()',
    });
  },
  TimerSettingRecord() {
    return mock({
      id: '@increment()',
      time: '@datetime("HH:mm:ss")',
      week: '@ctitle()',
      eventId: '@integer(0,1000)',
      eventName: '@ctitle',
      status: '@boolean',
    });
  },
  EventRecord() {
    return mock({
      id: '@increment()',
      source: '@ctitle()',
      operation: '@integer(1,1000)',
      eventId: '@integer(0,1000)',
      eventName: '@ctitle',
      zones: '@ctitle',
      gpo: '@ctitle',
    });
  },
  SourceRecord() {
    return mock({
      id: '@increment()',
      name: '@ctitle()',
      size: '@size(0,10000)',
      duration: '@integer(0,1000)' + 's',
    });
  },
  GpoRecord() {
    return mock({
      id: '@increment()',
      gpo: '@ctitle()',
      eventId: '@integer(0,1000)',
      eventName: '@ctitle',
      value: '@gpoStatus()',
    });
  },
  gpiKeyFunction(type) {
    return this.constantProp(KEY_FUNCTION_LIST, 'value');
  },
  GpiEventRecord() {
    return mock({
      id: '@increment()',
      gpi: '@ctitle()',
      eventId: '@integer(0,1000)',
      eventName: '@ctitle',
      functionKey: '@gpiKeyFunction()',
      type: '@pick(["event","functionKey"])',
    });
  },
  treeItem(index = 0, parentId = 0, title = 'title') {
    const max = index++ > 1 ? 0 : 10;
    const data = mock(max ? '@groupRecord' : `@deviceRecord('${DEVICE_TYPE.TERMINAL}')`);
    return mock({
      key: data.id,
      parentId: +parentId,
      [title]: data.name,
      data,
      [`children|${max}-${max}`]: [`@treeItem(${index},${data.id},${title})`],
    });
  },
  treeList(title = 'title', max = 10) {
    const res = mock({ [`array|0-${max}`]: [`@treeItem(0,0,${title})`] });
    function flat(data) {
      const list = (data.children || []).map((item) => flat(item)).flat();

      Reflect.deleteProperty(data, 'children');
      return [data, ...list];
    }
    const list = res.array.map((item) => flat(item));

    return list.flat().map((item, index) => {
      item.sortIndex = index;
      return item;
    });
  },
});

export default [
  ...success(
    Api.deviceDetectGet,
    (request) => {
      return mock(`@list('deviceRecord',[0,30])`);
    },
    { list: false },
  ),
  ...success(
    Api.deviceProjectGet,
    function () {
      const list = mock(`@list('deviceRecord',[1,20])`);
      list.forEach((item, index) => {
        item.id = index + 3;
      });
      return list;
    },
    { list: false },
  ),
  ...success(Api.deviceDetect, function () {
    return null;
  }),
  ...success(Api.deviceReboot, function () {
    return null;
  }),
  ...success(Api.deviceGroupGet, function () {
    // const res = mock({ [`array|0-${max}`]: [`@treeItem(0,0,${title})`] });
    return mock(`@list('treeItem',[1,10],0,0)`);
  }),
  ...random(Api.deviceZoneRemove, function () {
    return mock({});
  }),
  ...random(Api.deviceGroupAdd, function () {
    return mock(`@deviceRecord()`);
  }),
  ...success(Api.deviceAudioFileGet, function () {
    return mock(`@list('audioFileRecord',[10,10])`);
  }),
  ...success(Api.deviceTimerSettingGet, function () {
    return mock(`@list('TimerSettingRecord',[10,10])`);
  }),
  ...success(Api.deviceEventGet, function () {
    return mock(`@list('EventRecord',[10,10])`);
  }),
  ...success(Api.deviceSourceGet, function () {
    return mock(`@list('SourceRecord',[10,10])`);
  }),
  ...success(Api.deviceGpoGet, function () {
    return mock(`@list('GpoRecord',[10,10])`);
  }),
  ...success(Api.deviceGpiEventSettingGet, function () {
    return mock(`@list('GpiEventRecord',[10,10])`);
  }),
  ...success(Api.deviceExpandSave, function () {
    return mock({});
  }),
];
