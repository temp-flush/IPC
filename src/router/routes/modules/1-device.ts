import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '../../../utils/hooks/web/useI18n';

const device: AppRouteModule = {
  path: '/device',
  name: 'Device',
  component: LAYOUT,
  meta: {
    hideChildrenInMenu: true,
    orderNo: 10,
    icon: 'menu-device|svg',
    title: t('routes.device.title'),
  },
  children: [
    {
      path: '',
      name: 'DevicePage',
      component: () => import('/@/views/device/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.device.title'),
      },
      children: [
        {
          path: ':id',
          name: 'DeviceSettings',
          component: () => import('/@/views/device/settings/index.vue'),
          meta: {
            title: t('routes.device.settings.title'),
          },
        },
      ],
    },
  ],
};

export default device;
