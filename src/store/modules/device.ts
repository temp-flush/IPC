import { defineStore } from 'pinia';
import { DeviceItem } from '/#/store';
import { DEVICE_TYPE } from '/@/enums/deviceEnum';
import { deviceDetectGet, deviceGroupGet, deviceProjectGet } from '/@/serveices';
import { store } from '/@/store';

interface DeviceState {
  listDetect: DeviceItem[];
  listProject: DeviceItem[];
  listGroups: any[];
  idsProject: Set<number>;
}

export const useDeviceStore = defineStore({
  id: 'app-device',
  state: (): DeviceState => ({
    listDetect: [],
    listProject: [],
    listGroups: [],
    idsProject: new Set([]),
  }),
  getters: {
    listProjectControl(): DeviceItem[] {
      return this.listControl.filter((item) => this.idsProject.has(item.id));
    },
    listControl(): DeviceItem[] {
      return this.listDetect.filter((item) => item.type !== DEVICE_TYPE.TERMINAL);
    },
    listTerminal(): DeviceItem[] {
      return this.listDetect.filter((item) => item.type === DEVICE_TYPE.TERMINAL);
    },
  },
  actions: {
    setListDetect(data: DeviceItem[]) {
      this.listDetect = data;
    },
    setListProject(data: DeviceItem[]) {
      this.idsProject = new Set(data.map((item) => item.id));
      this.listProject = data;
    },
    setListGroups(data: any[]) {
      this.listGroups = data;
    },
    resetState() {
      this.listDetect = [];
      this.listProject = [];
      this.listGroups = [];
      this.idsProject = new Set([]);
    },

    // action
    async initStore() {
      this.getList();
      this.getListProject();
      this.getListGroups();
    },
    async getList(params?: {}) {
      const data = await deviceDetectGet<DeviceItem[]>();
      console.log(data);
      data.forEach(v=>{
        if (!v.network) {
          v.network = {}
        }
      })
      this.setListDetect(data);
      return data;
    },
    async getListProject(params?: {}) {
      const data = await deviceProjectGet<DeviceItem[]>();
      console.log(data);
      this.setListProject(data);
      return data;
    },
    async getListGroups(params?: {}) {
      const data = await deviceGroupGet<any[]>();
      console.log(data);
      this.setListGroups(data.items);
      return data;
    },
  },
});

// Need to be used outside the setup
export function useDeviceStoreWithOut() {
  return useDeviceStore(store);
}
