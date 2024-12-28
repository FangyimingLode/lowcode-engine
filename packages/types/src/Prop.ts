export interface JSFunction {
  type: 'JSFunction',
  // 字符串形式的函数
  value: string
}


export interface JSDataSource  {
  type: 'DataSource',
  value: DataSource
}

export type DataSource = {
  url: string;
  params?: object;
  method: "GET" | "POST";
  requestHandler?: JSFunction
  responseHandler?: JSFunction
  errorHandler?: JSFunction
}


// 它在设置面板中会运行得到函数的结果
export interface JSRunFunction  {
  type: 'JSRunFunction',
  // 字符串形式的函数
  value: string
}

export type PropValue = string | number | JSFunction | undefined | JSDataSource | JSRunFunction | object

export interface PropRaw {
  name: string;
  propType: PropType;
  defaultValue?: unknown;
  description?: string;
  setter: SetterConfig | SetterConfig[]
  isHidden: boolean
}

export interface SetterConfig {
  /**设置器的名称 */
  name: string;
  /**是否使用组件包自带的设置器 */
  isUseSelf?: boolean;
  /**传递给设置器的属性 */
  props?: {
    defaultValue?: any;
    [attr: string]: any
  };
}

interface PropType {
  type:'array' | 'bool' | 'func' | 'number' | 'object' | 'string' | 'node' | 'element' | 'any' | 'oneOf' | 'oneOfType' | 'arrayOf'
  isRequired?: boolean;
  value?: PropType[] | PropType | Array<string | number | boolean>;
  [k: string]: any;
}
