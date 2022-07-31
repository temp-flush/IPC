import { DEVICE_TYPE } from '/@/enums/deviceEnum';
import { useI18n } from '/@/utils/hooks/web/useI18n';
const { t } = useI18n();
const DeviceTypeList = [
  { type: DEVICE_TYPE.TERMINAL, name: t('routes.device.type.terminal') }, //
  { type: DEVICE_TYPE.CALL_STATION, name: t('routes.device.type.callStation') },
  { type: DEVICE_TYPE.BROADCAST_SERVER, name: t('routes.device.type.broadcastServer') },
];
export default function useDevice() {}
export function filterDeviceType(type: DEVICE_TYPE) {
  const item = DeviceTypeList.find((item) => item.type === type);
  return item?.name;
}
