import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '../../../utils/hooks/web/useI18n';

const monitor: AppRouteModule = {
  path: '/monitor',
  name: 'Monitor',
  component: LAYOUT,
  meta: {
    hideChildrenInMenu: true,
    orderNo: 10,
    icon: 'menu-monitor|svg',
    title: t('routes.monitor.title'),
  },
  children: [
    {
      path: '',
      name: 'MonitorPage',
      component: () => import('/@/views/monitor/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.monitor.title'),
      },
    },
  ],
};

export default monitor;
