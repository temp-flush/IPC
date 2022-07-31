import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '../../../utils/hooks/web/useI18n';

const scene: AppRouteModule = {
  path: '/scene',
  name: 'Scene',
  component: LAYOUT,
  meta: {
    hideChildrenInMenu: true,
    orderNo: 10,
    icon: 'menu-scene|svg',
    title: t('routes.scene.title'),
  },
  children: [
    {
      path: '',
      name: 'ScenePage',
      component: () => import('/@/views/scene/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.scene.title'),
      },
    },
  ],
};

export default scene;
