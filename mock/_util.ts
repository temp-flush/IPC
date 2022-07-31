// Interface data format used to return a unified format

import mockjs, { mock } from 'mockjs';
export { mockjs, mock };
import { MockMethod } from 'vite-plugin-mock';
import { IncomingMessage as Request, ServerResponse as Response } from 'http';
import { ResponseConfig, RESPONSE_CONFIG, ResultCode } from '/@/enums/httpEnum';
import { WHTIE_API } from '/@/enums/roleEnum';
import './_extend';
export { default as Api } from '/@/serveices/api';

function sleep(timeout: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null);
    }, timeout);
  });
}

const MinTimeout = 50;
const MaxTimeout = 100;
type DataFunction = (req: Request) => Record<string, any> | Record<string, any>[];

function responseCallback(
  path: string,
  response: Record<string, any> | DataFunction | string,
  type = true as boolean | 'random',
  wrapper = true,
  resTimeout?: number,
  list = false,
) {
  return async function (req: Request, res: Response) {
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');

    const timeout = resTimeout ?? mockjs.mock(`@integer(${MinTimeout},${MaxTimeout})`);
    await sleep(timeout);

    if (
      type === true ||
      (type === 'random' &&
        mock('@boolean()') &&
        (RESPONSE_CONFIG.TOKEN.toLowerCase() in req.headers ||
          WHTIE_API.includes(req.url!.replace('/mock', ''))))
    ) {
      const data = typeof response === 'function' ? response(req) : response;

      const resData = mockjs.mock(
        wrapper
          ? ({
              [RESPONSE_CONFIG.CODE]: ResultCode.SUCCESS,
              [list ? RESPONSE_CONFIG.LIST : RESPONSE_CONFIG.DATA]: data,
              [RESPONSE_CONFIG.MESSAGE]: '请求成功！',
              type: 'success',
              ...(list ? { total: mock('@integer(0,100)') } : {}),
            } as ResponseConfig)
          : data,
      );

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(resData));
    } else {
      const resData = mockjs.mock(
        wrapper
          ? ({
              [RESPONSE_CONFIG.CODE]: ResultCode.ERROR,
              [RESPONSE_CONFIG.MESSAGE]: '请求失败！',
              type: 'error',
            } as ResponseConfig)
          : {},
      );
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(resData));
    }
  };
}

export function success(
  path: string,
  data: Record<string, any> | DataFunction | string,
  {
    type,
    wrapper = true,
    list = false,
    timeout,
    method,
  }: {
    type?: boolean | 'random';
    wrapper?: boolean;
    list?: boolean;
    timeout?: number;
    method?: 'GET' | 'POST';
  } = {} as any,
): MockMethod[] {
  path = path.replace(/[{}]/g, '');

  const responsePost = [
    {
      url: `/mock${path}`,
      method: 'post' as const,
      rawResponse: responseCallback(path, data, type, wrapper, timeout, list),
    },
  ];
  const responseGet = [
    {
      url: `/mock${path}`,
      method: 'get' as const,
      rawResponse: responseCallback(path, data, type, wrapper, timeout, list),
    },
  ];

  return method === 'POST'
    ? responsePost
    : method === 'GET'
    ? responseGet
    : [...responseGet, ...responsePost];
}
export function fail(path: string, data: Record<string, any> | DataFunction | string = '') {
  return success(path, data, { type: false });
}
export function random(path: string, data: Record<string, any> | DataFunction | string = '') {
  return success(path, data, { type: 'random' });
}
