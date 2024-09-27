declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.styl";

declare const _VERSION: string

declare const _ENV: string

// @ts-ignore
declare const process: {
  env: {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq';
    [key: string]: any;
  }
}

/*** 地图marker上显示时间*/
declare const _SHOWGPSDATE: boolean

/*** map组件的key*/
declare const _MAPSK: string

/*** 接口根路径*/
declare const _BASE_URL: string
/*** ws根路径*/
declare const _WSS_URL: string
/** dev版本更新时间下调试用*/
declare const _TIMESTAMP: string
/** dev版本下调试用*/
declare const _DEVDEBUGGER: boolean

/** 原生wxApi声明 */
declare namespace wx {
  /** 原生api关闭系统蓝牙开关状态监听 */
  function offBluetoothAdapterStateChange(callback?): any
  /** 原生api关闭蓝牙连接状态监听 */
  function offBLEConnectionStateChange(callback?): any
  /** 取消监听扫描到新设备*/
  function offBluetoothDeviceFound(): any
  /** 获取用户信息，用于替换原本的getUserInfo */
  function getUserProfile(o: any): any
  /** 原生方式关闭蓝牙特征值监听*/
  function offBLECharacteristicValueChange(): any
  /** 小程序后台自定义事件分析上报 @param event 上报事件名称 @param params 上报数据 */
  function reportAnalytics(event: string, params): any
  /** we分析上报 @param event 上报事件名称 @param params 上报数据 */
  function reportEvent(event: string, params): any
  /**原生弹框 Taro弹框无法换行*/
  function showModal(option: Taro.showModal.Option)
  /** 取消网络状态监听*/
  function offNetworkStatusChange(callback?: Function)
  /**打开企业微信客服 api*/
  // function openCustomerServiceChat(any)
  /** canvas保存为png */
  function canvasToTempFilePath(any)
  /** 原生wx上传*/
  function uploadFile(any)
  function onNeedPrivacyAuthorization(any)
  function openPrivacyContract(any)
  function getPrivacySetting(any)
}