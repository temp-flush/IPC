import { useGlobSetting } from '../../hooks/setting';
import { API_PROXY } from '/@/enums/httpEnum';
import { isObject, isString } from '/@/utils/is';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export function joinTimestamp<T extends boolean>(
  join: boolean,
  restful: T,
): T extends true ? string : object;

export function joinTimestamp(join: boolean, restful = false): string | object {
  if (!join) {
    return restful ? '' : {};
  }
  const now = new Date().getTime();
  if (restful) {
    return `?_t=${now}`;
  }
  return { _t: now };
}

/**
 * @description: Format request parameter time
 */
export function formatRequestDate(params: Recordable) {
  if (Object.prototype.toString.call(params) !== '[object Object]') {
    return;
  }

  for (const key in params) {
    if (params[key] && params[key]._isAMomentObject) {
      params[key] = params[key].format(DATE_TIME_FORMAT);
    }
    if (isString(key)) {
      const value = params[key];
      if (value) {
        try {
          params[key] = isString(value) ? value.trim() : value;
        } catch (error: any) {
          throw new Error(error);
        }
      }
    }
    if (isObject(params[key])) {
      formatRequestDate(params[key]);
    }
  }
}

const globSetting = useGlobSetting();
/**
 * 给 api 接口添加前缀
 * @param url
 */
export function addBaseUrl(url?: string) {
  if (!url) return url;
  // 生产模式直接跨域访问
  let prefix = '';
  // 当 api 分别指向多个服务器时，通过前缀标识分别代理
  if (/^http/.test(url)) {
    prefix = '';
  } else if (process.env.NODE_ENV === 'production') {
    prefix = (/^\/image/.test(url) ? globSetting.uploadUrl : globSetting.apiUrl) || '';
  } else {
    // 开发模式 webpack 代理转发
    // 如果 API_PROXY 有配置，刚走后端接口，联调
    // 否则走 mock 假数据
    const matchApi = API_PROXY.map((item) => {
      const reg = item.apis.find((item) => item.test(url));
      if (reg) {
        const match = url.match(reg)?.[0] || '';
        const prefix = item.prefix;
        return { match, prefix };
      }
    })
      .filter(Boolean)
      .reduce((max, item) => (item && max && item.match.length > max.match.length ? item : max), {
        prefix: '/mock',
        match: '',
      });
    prefix = matchApi?.prefix ?? '';
  }
  if (url.indexOf('api') != -1) {
    prefix = '';
  }
  return prefix + url;
}
