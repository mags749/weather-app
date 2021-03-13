import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

import { isEmpty } from './genericUtility';
import config from '@/../config/config.json';

export const uriName = 'weather-api';

type ApiMap = {
  [key: string]: any;
};

const ApiMapping: ApiMap = {
  DELETE: axios.delete,
  GET: axios.get,
  POST: axios.post,
  PUT: axios.put
};

const getBaseUri = (baseUrl: string) => (endpoint: string) => `${baseUrl}${endpoint}`;

const getUrl = (name: string) => {
  const endpoints = config.API.endpoints.filter(ep => ep.name.toLowerCase() === name.toLowerCase());
  return getBaseUri(
    `${endpoints[0].endpoint}${!isEmpty(endpoints[0].suburi) ? endpoints[0].suburi : ''}`
  );
};

const getHeaders = (customHeaders?: any): unknown => {
  const commonHeaders = {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };
  return { ...commonHeaders, ...customHeaders };
};

const executeApi = (resolve: any, reject: any) => (
  apiName: string,
  endpoint: string,
  bodyContent: any,
  config: AxiosRequestConfig
) => {
  const { method = 'GET', body = null } = bodyContent;
  const arrayOfData = [getUrl(apiName)(endpoint), body, config].filter(item => item !== null);

  ApiMapping[method]
    .apply(axios, arrayOfData)
    .then((res: AxiosResponse) => manageResponse(resolve, reject, res))
    .catch((err: AxiosError) => {
      console.error(err);
      return manageError(err);
    });
};

const manageResponse = (resolve: any, reject: any, res: AxiosResponse) =>
  res.status === 200
    ? resolve(res.status === 200 ? res.data : res)
    : reject('Error occurred while getting the response');

const manageError = (err: AxiosError): any => {
  const { response } = err;
  if (response && response.status !== 200) {
    if (response.status !== 400 && response.statusText !== '')
      return buildErrorMessage(response.status, response.statusText);
    else if (response.data && response.data.error)
      return buildErrorMessage(response.status, response.data.error);
  } else return buildErrorMessage('Server Issue', 'Please contact system administrator');
};

const buildErrorMessage = (code: number | string, message: string) => ({
  Error: {
    Code: `${code}`,
    Message: message
  }
});

export const Get = (apiName: string, path: string, headers?: any): any => {
  return new Promise((resolve: any, reject: any) => {
    const custom_headers = {
      headers: headers ? headers : getHeaders(),
      data: {}
    };
    executeApi(resolve, reject)(apiName, path, {}, custom_headers);
  });
};
