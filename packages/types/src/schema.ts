import type { PropValue, JSFunction, JSDataSource } from './Prop';

export interface LifeCycles {
  load?: JSFunction;
  unload?: JSFunction;
  visibilitychange?: JSFunction;
  beforeunload?: JSFunction;
}
export interface Interceptors   {
  request?: JSFunction;
  response?: JSFunction;
}
export interface NodeSchema {
  id?: string;
  componentName: string;
  packageName: string;
  props: {[key: string]: PropValue};
  extraProps: ExtraProps;
  isContainer: boolean;
  children: NodeSchema[];
  isFormControl?: boolean;
  containerType?: 'Layout' | 'Data' | 'Page'
  interceptors?: Interceptors;
  lifeCycle?: LifeCycles;
  parent?: NodeSchema
}
export interface ExtraProps {
  // 容器节点的 pathToVal 和 dataSource 必须二选一
  pathToVal?: string;
  dataSource?: JSDataSource;
  name?: string;
  // 禁用联动规则
  isDisabled?: JSFunction;
  // 求值联动规则
  getValue?: JSFunction;
  // 隐藏联动规则
  isHidden?: JSFunction;
  verifyRules?: Rule[],
  [key: string]: PropValue;
}
export type Rule = {
  max?: string;
  min?: string;
  required?: boolean;
  //  校验没有通过时的提示语
  message?: string;
  // 自定义的校验规则
  customized?: JSFunction;
}


export interface PageSchema extends ContainerSchema {
  containerType: 'Layout' | 'Data' | 'Page'
  componentName: string |'Page'
  lifeCycle: LifeCycles;
  interceptors: Interceptors;
  children: LayoutSchema[]
}

export interface ContainerSchema extends NodeSchema {
  isContainer: boolean | true;
  containerType: 'Layout' | 'Data' | 'Page';
  children: ComponentSchema[] | ContainerSchema[]
}

export interface ComponentSchema extends NodeSchema {
  isContainer: false;
  name?: string;
  isDisabled: boolean;
  getValue?: JSFunction;
  isFormControl?: boolean;
}



export interface LayoutSchema extends ContainerSchema {
  componentName: 'Layout';
  children: ComponentSchema[] | DataContainerSchema[];
}

export interface DataContainerSchema extends ContainerSchema {
  containerType: 'Data';
  componentName: 'DataBlock';
  children: ComponentSchema[];
}
