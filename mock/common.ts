import { success, mockjs, mock, Api } from './_util';

mockjs.Random.extend({
  tableRecord(type) {
    return mock({
      id: '@increment',
      type: '@ctitle',
      name: '@ctitle',
      mac: '@guid',
      version: '@title',
      ip: '@ip',
      gateway: '@ip',
      submask: '@ip',
      dhcp: '@boolean',
    });
  },
});

export default [
  ...success(
    '/getTableData',
    (request) => {
      const keys = new Array(mock('@integer(1,10)'))
        .fill(0)
        .map((item, index) => index.toString().repeat(3));
      const record = keys.reduce((o, key) => ({ ...o, [key]: key }), {});
      const list = new Array(mock('@integer(1,10)'))
        .fill(0)
        .map((item, index) => ({ ...record, id: index }));
      return list;
    },
    { list: false },
  ),
];
