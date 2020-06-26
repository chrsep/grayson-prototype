/* eslint-disable */
/// <reference types="next" />
/// <reference types="next/types/global" />


class Workbox {
  constructor(scriptURL: string, registerOptions?: object);

  register(immediate?: boolean): Promise<any>;

  active(): Promise<ServiceWorker>;

  controlling(): Promise<ServiceWorker>;

  getSW(): Promise<ServiceWorker>;

  messageSW(data: object): Promise<object>;

  addEventListener(event: 'message', callback: (data: IWorkboxEventMessage) => void): void;
  addEventListener(event: 'installed', callback: (data: IWorkboxEvent) => void): void;
  addEventListener(event: 'waiting', callback: (data: IWorkboxEventWaiting) => void): void;
  addEventListener(event: 'controlling', callback: (data: IWorkboxEvent) => void): void;
  addEventListener(event: 'activated', callback: (data: IWorkboxEvent) => void): void;
  addEventListener(event: 'redundant', callback: (data: IWorkboxEvent) => void): void;
  addEventListener(event: 'externalinstalled', callback: (data: IWorkboxEventExternal) => void): void;
  addEventListener(event: 'externalwaiting', callback: (data: IWorkboxEventExternal) => void): void;
  addEventListener(event: 'externalactivated', callback: (data: IWorkboxEventExternal) => void): void;
}


interface Window {
  workbox: Workbox
}

declare module "formidable-serverless" {
  export * from "formidable"
}

declare module "*.svg" {
  const content: string
  export default content
}

declare module "*.jpg" {
  import { ImgSrc } from "react-optimized-image/lib/components/Img";
  const content: ImgSrc
  export default content
}

declare module "*.png" {
  import { ImgSrc } from "react-optimized-image/lib/components/Img";
  const content: ImgSrc
  export default content
}
