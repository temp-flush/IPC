import { success } from './_util';
import Api from '/@/serveices/api';

export default [
  ...success(Api.getMenuList, (request) => {
    const id = '1' as string;
    let menu: Object[];
    switch (id) {
      case '1':
        menu = [];
        break;
      case '2':
        menu = [];
        break;
      default:
        menu = [];
    }

    return menu;
  }),
];
