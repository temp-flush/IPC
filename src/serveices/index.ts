import { defHttp } from '/@/utils/http/axios';

import { ErrorMessageMode, RequestFunction } from '/#/axios';
import Api from '/@/serveices/api';
import { resolve } from 'path';
import moment from 'moment';

/**
 * Trigger ajax error
 */
export const fireErrorApi = () => defHttp.get(Api.error);

/**
 * Get user menu based on id
 */
export function getMenuList() {
  return defHttp.get(Api.getMenuList);
}

/**
 * user login api
 */
export function loginApi(
  params: { username: string; password: string },
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post(Api.login, { params }, { errorMessageMode: mode });
}
export function getUserInfo() {
  return defHttp.get(Api.getUserInfo, {}, { errorMessageMode: 'none' });
}
export function getPermCode() {
  return defHttp.get<string[]>(Api.getPermCode);
}
export function doLogout() {
  return defHttp.get(Api.logout);
}

/* device */
export const deviceAdd: RequestFunction = function (params) {
  return defHttp.post(Api.deviceAdd, { params }, { isTransformResponse: false });
};

export const deviceRemove: RequestFunction = function (params) {
  return defHttp.delete(Api.deviceRemove + params);
};

export const deviceUpdate: RequestFunction = function (params) {
  return defHttp.put(Api.deviceUpdate + params.devId, { params });
};

// export const deviceDetectGet: RequestFunction = function (params) {
//   return defHttp.get(Api.deviceDetectGet, { params }, { isTransformResponse: false });
// };

export const deviceDetectGet: RequestFunction = function (params) {
  // return defHttp.get(Api.deviceDetectGet, {});
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 3,
          devId: 2,
          name: 'call station',
          type: 'call_station',
          subType: 'call_station',
          version: '1.0.2',
          configDesc: {
            station_type: 'general',
            emergency_priority: 2,
            general_priority: 16,
            emergency_priority_type: 'LIFO',
            general_priority_type: 'LIFO',
            start_chime: 1,
            key: [
              {
                id: 1,
                zone: [1, 3],
              },
              {
                id: 2,
                zone: [2, 4],
              },
              {
                id: 10,
                message_name: '1.mp3',
              },
              {
                id: 11,
                message_name: '2.mp3',
              },
            ],
          },
        },
        {
          id: 2,
          devId: 2,
          name: 'speaker_2',
          type: 'speaker',
          subType: 'default',
          version: '1.0.2',
          network: {
            ip_mode: 'static',
            ip: '192.168.1.1',
            netmask: '255.255.255.0',
            gateway: '192.168.1.1',
            mac: '00:11:22:33:44:55',
          },
          configDesc: {
            alert_tone: '1.wav',
            evac_tone: '2.wav',
            reset_tone: '3.wav',
            delay: 60,
            gpi_func: 'emg',
            audio: {
              priority: 1,
              volume: 80,
              file_name: 'welcome.wav',
              bgm_channel: 1,
              mode: 'remote',
              mute: true,
            },
          },
        },
        {
          id: 4,
          devId: 1,
          name: 'server',
          type: 'server',
          subType: 'default',
          version: '1.0.2',
          configDesc: {
            general: {
              emergency_priority: 'LIFO',
              general_priority: 'LIFO',
              //FIFO"exit_audio": "stop",
              //keepon"exit_mic": "stop",
              //silence"message_priority": 9,
              music_priority: 9,
              message_volume: 100,
              music_vlume: 90,
            },
            cmd: [
              {
                id: 0,
                name: 'Fault Acknowledge',
              },
              {
                id: 1,
                name: 'Fault Reset',
              },
              {
                id: 2,
                name: 'Timer ON',
              },
              {
                id: 3,
                name: 'Timer OFF',
              },
            ],
            emergency: [
              {
                id: 0,
                name: 'PAGE_MIC/EXT_EMG',
                priority: 1,
              },
              {
                id: 1,
                name: 'RESET',
                priority: 6,
              },
              {
                id: 2,
                name: 'EVAC',
                priority: 7,
              },
              {
                id: 3,
                name: 'ALERT',
                priority: 8,
              },
            ],
            gpi: [
              {
                id: 1,
                name: 'gpi_1',
                //"commandId": 12
              },
              {
                id: 2,
                name: 'gpi_2',
                //"commandId": 2
              },
            ],
            gpo: [
              {
                id: 1,
                name: 'gpo_1',
              },
              {
                id: 2,
                name: 'gpo_2',
              },
            ],
          },
        },
      ]);
    }, 500);
  });
};
export const deviceDetect: RequestFunction = function (params) {
  return defHttp.get(Api.deviceDetect, { params }, { isTransformResponse: false });
};
export const deviceReboot: RequestFunction = function (params) {
  return defHttp.post(Api.deviceReboot, { params });
};
export const deviceProjectGet: RequestFunction = function (params) {
  return defHttp.post(Api.deviceProjectGet, { params });
};
export const deviceGroupGet: RequestFunction = function (params) {
  return defHttp.get(Api.deviceGroupGet, { params }, { isTransformResponse: false });
};
export const deviceZoneRemove: RequestFunction = function (params) {
  // console.log(Api.deviceZoneRemove + params);
  return defHttp.delete(Api.deviceZoneRemove + params);
};
export const deviceGroupAdd: RequestFunction = function (params) {
  console.log(params);
  return defHttp.post(Api.deviceGroupAdd, { params }, { isTransformResponse: false });
};

export const deviceGroupInfo: RequestFunction = function (params) {
  return defHttp.get(Api.deviceGroupInfo + params, {}, { isTransformResponse: false });
};

export const deviceGroupUpdate: RequestFunction = function (id, params) {
  console.log(id, params);
  return defHttp.put(Api.deviceGroupUpdate + id[0], { params }, { isTransformResponse: false });
};
// setting

export const ConfigGet: RequestFunction = function (params) {
  return defHttp.get(Api.ConfigGet, { params }, { isTransformResponse: false });
};

export const deviceAudioFileGet: RequestFunction = function (params) {
  return defHttp.get(Api.deviceAudioFileGet, { params }, { isTransformResponse: false });
};

export const deviceAudioFileRemove: RequestFunction = function (params) {
  console.log(params);
  // return defHttp.delete(Api.deviceAudioFileRemove + params);
};

export const deviceTimerSettingGet: RequestFunction = function (params) {
  return defHttp.get(Api.deviceTimerSettingGet, { params }, { isTransformResponse: false });
};

export const deviceTimerSettingAdd: RequestFunction = function (params) {
  params.id = '';
  if (params.time.length == 8) {
    params.time = JSON.stringify({
      hour: params.time.split(':')[0] * 1,
      minute: params.time.split(':')[1] * 1,
      second: params.time.split(':')[2] * 1,
    });
  }
  const newObj = {
    sun: 7,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6,
    7: 7,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
  };
  const newWeek = JSON.parse(params.week).map((v) => newObj[v]);
  params.week = JSON.stringify(newWeek);
  params.commandId = params.eventId;
  params.enable = params.status == true ? 1 : 0;
  delete params.eventId;
  delete params.eventName;
  delete params.status;
  return defHttp.post(Api.deviceTimerSettingAdd, { params }, { isTransformResponse: false });
};

export const deviceTimerSettingDelete: RequestFunction = function (params) {
  console.log(params);
  return defHttp.delete(
    Api.deviceTimerSettingDelete + params.selectKeys,
    {},
    { isTransformResponse: false },
  );
};

export const deviceTimerSettingUpdate: RequestFunction = function (params) {
  console.log(params);
  console.log(params.time.length);
  if (params.time.length == 8) {
    params.time = JSON.stringify({
      hour: params.time.split(':')[0] * 1,
      minute: params.time.split(':')[1] * 1,
      second: params.time.split(':')[2] * 1,
    });
  }
  const newObj = {
    sun: 7,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6,
    7: 7,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
  };
  const newWeek = JSON.parse(params.week).map((v) => newObj[v]);
  params.week = JSON.stringify(newWeek);
  params.commandId = params.commandId ? params.commandId : params.eventId;
  params.enable = params.status;
  delete params.eventId;
  delete params.eventName;
  delete params.status;
  return defHttp.put(
    Api.deviceTimerSettingUpdate + params.id,
    { params },
    { isTransformResponse: false },
  );
};

export const deviceEventGet: RequestFunction = function (params) {
  return defHttp.get(Api.deviceEventGet, { params }, { isTransformResponse: false });
};

export const deviceEventAdd: RequestFunction = function (params) {
  params.name = params.eventName;
  params.type = 'user';
  params.actionDesc = JSON.stringify({
    busPlay: {
      repeat: params.operation,
      filesrc: '1.mp3',
      area: '[]',
      action: 'on',
    },
    bgmPlay: {
      channel: 1,
      action: 'on',
    },
    gpoAction: '[]',
    sysCommand: '',
  });
  delete params.eventName;
  delete params.gpo;
  delete params.operation;
  delete params.source;
  delete params.zones;
  console.log(params);
  return defHttp.post(Api.deviceEventAdd, { params }, { isTransformResponse: false });
};

export const deviceEventRemove: RequestFunction = function (params) {
  console.log(params);
  return defHttp.delete(
    Api.deviceEventRemove + params.selectKeys[0],
    {},
    { isTransformResponse: false },
  );
};

export const deviceEventUpdate: RequestFunction = function (params) {
  console.log(params);
  params.type = 'user';
  params.actionDesc = JSON.stringify({
    busPlay: {
      repeat: params.operation,
      filesrc: '1.mp3',
      area: '[]',
      action: 'on',
    },
    bgmPlay: {
      channel: 1,
      action: 'on',
    },
    gpoAction: '[]',
    sysCommand: '',
  });
  delete params.gpo;
  delete params.operation;
  delete params.source;
  delete params.zones;
  return defHttp.put(Api.deviceEventUpdate + params.id, { params }, { isTransformResponse: false });
};

export const deviceSourceGet: RequestFunction = function (params) {
  return defHttp.post(Api.deviceSourceGet, { params }, { isTransformResponse: false });
};
export const deviceGpoGet: RequestFunction = function (params) {
  return defHttp.post(Api.deviceGpoGet, { params }, { isTransformResponse: false });
};
export const deviceGpiEventSettingGet: RequestFunction = function (params) {
  return defHttp.get(Api.deviceGpiEventSettingGet, { params }, { isTransformResponse: false });
};

export const deviceGpiEventSettingAdd: RequestFunction = function (params) {
  params.id = -1;
  params.data = JSON.stringify({
    gpiId: 1,
    level: 'rising edge',
    eventName: '',
  });
  params.commandId = params.eventId;
  params.enable = true;
  delete params.eventId;
  delete params.eventName;
  delete params.functionKey;
  delete params.gpi;
  delete params.type;
  console.log(params);
  return defHttp.post(Api.deviceGpiEventSettingAdd, { params }, { isTransformResponse: false });
};

export const deviceGpiEventSettingUpdate: RequestFunction = function (params) {
  console.log(params);
  params.data = JSON.stringify({
    gpiId: 1,
    level: 'rising edge',
    eventName: '',
  });
  params.commandId = params.eventId;
  params.enable = true;
  delete params.eventId;
  delete params.eventName;
  delete params.functionKey;
  delete params.gpi;
  delete params.type;
  return defHttp.put(Api.deviceGpiEventSettingUpdate, { params }, { isTransformResponse: false });
};

export const deviceGpiEventSettingRemove: RequestFunction = function (params) {
  return defHttp.delete(
    Api.deviceGpiEventSettingRemove + params.selectKeys,
    {},
    { isTransformResponse: false },
  );
};

// 扩展接口
export const deviceExpandSave: RequestFunction = function (params) {
  return defHttp.post(Api.deviceExpandSave, { params });
};

// users
export const userListGet: RequestFunction = function (params) {
  return defHttp.post(Api.userListGet, { params });
};

export const bgmListGet: RequestFunction = function (params) {
  return defHttp.get(Api.bgmListGet, {}, { isTransformResponse: false });
};

export const bgmListAdd: RequestFunction = function (params) {
  return defHttp.post(Api.bgmListAdd, { params }, { isTransformResponse: false });
};

export const bgmListRemove: RequestFunction = function (params) {
  return defHttp.delete(Api.bgmListRemove + params, {}, { isTransformResponse: false });
};
