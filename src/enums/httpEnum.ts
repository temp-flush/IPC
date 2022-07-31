import Api from '../serveices/api';
import { getAppEnvConfig } from '../utils/env';

/**
 * @description: Request result set
 */
export enum ResultCode {
  SUCCESS = 0,
  ERROR = 1,
  TIMEOUT = 401,
  TYPE = 'success',
}

/**
 * @description: request method
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * @description:  contentTyp
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

export enum RESPONSE_CONFIG {
  TIMEOUT = 10000,
  MESSAGE = 'message',
  CODE = 'code',
  DATA = 'result',
  LIST = 'items',
  TOKEN = 'Authorization',
  LANG = 'Accept-Language',
}

export interface ResponseConfig<T extends Record<string, any> = any> {
  [RESPONSE_CONFIG.MESSAGE]?: string;
  [RESPONSE_CONFIG.CODE]: ResultCode;
  [RESPONSE_CONFIG.DATA]: T;
  [RESPONSE_CONFIG.LIST]: T;
  type?: 'error' | 'success';
  total?: number;
  [key: string]: any;
}

export const WHTIE_API = [
  // Api.login,
  // Api.register,
  // Api.getValidateCode,
  // Api.checkUserExist,
  // Api.downloadApp,
];
// 联调接口代理前缀
export const API_PROXY = [
  {
    prefix: '/api',
    apis: [
      // /^\/authentication/, //
    ] as RegExp[],
  },
];
