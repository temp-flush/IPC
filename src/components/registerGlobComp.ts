import type { App } from 'vue';
import { Button } from './Button';
import {
  // Need
  Button as AntButton,
  Input,
  Layout,
} from 'ant-design-vue';
import SpContainer from '/@/components/SpContainer/index.vue';
import SpCard from '/@/components/SpCard/index.vue';
import SpFormItem from '/@/components/SpForm/SpFormItem.vue';

const compList = [AntButton.Group, SpContainer, SpCard, SpFormItem];

export function registerGlobComp(app: App) {
  compList.forEach((comp) => {
    app.component(comp.name || comp.displayName, comp);
  });

  app.use(Input).use(Button).use(Layout);
}
