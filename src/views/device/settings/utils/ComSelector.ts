import { h } from 'vue';
import {
  BGM_LIST,
  CLASS_LIST,
  EMERGENCY_LIST,
  GENERAL_LIST,
  GPO_STATUS_LIST,
  GPO_TYPE,
} from './enum';
import SpFormSelect from '/@/components/SpForm/SpFormSelect.vue';
import { useI18n } from '/@/utils/hooks/web/useI18n';
const { t } = useI18n();

function mergeAttrs(context, attrs) {
  return {
    ...context.attrs,
    class: 'setting-selector ' + context.attrs.class ?? '',
    dropdownClassName: 'setting-selector-dropdown !bg-[#EEEEEF]',
    ...attrs,
  };
}
function getComSelector(options: any[], name?: string) {
  function com(props, context: { attrs: any }) {
    return h(SpFormSelect, mergeAttrs(context, { options }));
  }
  name && Object.defineProperty(com, 'name', { writable: true, value: name });
  return com;
}

export const ComSelectClass = getComSelector(CLASS_LIST, 'ComSelectClass');

export const ComSelectGeneral = getComSelector(GENERAL_LIST, 'ComSelectGeneral');

export const ComSelectBgm = (props, context: { attrs: any }) => {
  const disabledValue = props.disabledValue?.filter((item) => item !== props.value);
  const options = disabledValue
    ? BGM_LIST.map((item) => ({
        ...item,
        disabled: disabledValue.includes(item.value),
      }))
    : BGM_LIST;
  return h(SpFormSelect, mergeAttrs(context, { options }));
};
Object.defineProperty(ComSelectBgm, 'name', { writable: true, value: 'ComSelectBgm' });

export const GPO_TYPE_LIST = [
  { value: GPO_TYPE.CONTROL, label: t('routes.device.setting.gpo.type.control') },
  { value: GPO_TYPE.STATUS, label: t('routes.device.setting.gpo.type.status') },
];
export const ComSelectGpoType = getComSelector(GPO_TYPE_LIST, 'ComSelectGpoType');

export const ComSelectGpoStatus = getComSelector(GPO_STATUS_LIST, 'ComSelectGpoStatus');

export const ComSelectEmergency = getComSelector(EMERGENCY_LIST, 'ComSelectEmergency');
