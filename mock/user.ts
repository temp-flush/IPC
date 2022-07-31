import { success, mockjs, mock, Api } from './_util';

mockjs.Random.extend({
  userRecord(type) {
    return mock({
      userId: '1',
      username: 'vben',
      realName: 'Vben Admin',
      level: '@integer(1,7)',
      avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640',
      desc: 'manager',
      password: '123456',
      token: 'fakeToken1',
      homePath: '/device',
      roles: [
        {
          roleName: 'Super Admin',
          value: 'super',
        },
      ],
    });
  },
});

export default [
  ...success(Api.login, '@userRecord'),
  ...success(Api.getUserInfo, '@userRecord'),
  ...success(Api.getPermCode, (request) => {
    return {};
  }),
  ...success(Api.logout, (request) => {
    return {};
  }),
  ...success(Api.userListGet, function () {
    return mock(`@list('userRecord',[10,10])`);
  }),
];
