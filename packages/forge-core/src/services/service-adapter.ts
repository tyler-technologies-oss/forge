export interface IServiceRequestParameter {
  type: ServiceRequestMethod;
  path: string;
  data?: any;
}

export interface IServiceAdapter {
  request: ServiceRequestCallback;
  cancel: ServiceCancelCallback;
}

export enum ServiceRequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  HEAD = 'HEAD',
  CONNECT = 'CONNECT',
  OPTIONS = 'OPTIONS',
  TRACE = 'TRACE'
}

export declare type ServiceRequestCallback = (param: IServiceRequestParameter) => Promise<any>;
export declare type ServiceCancelCallback = (path: string) => Promise<void>;

export interface IServiceAware {
  serviceAdapter: IServiceAdapter;
}
