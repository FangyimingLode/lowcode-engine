import type { PropValue, JSFunction } from './Prop';

export interface LifeCycles {
  load?: JSFunction;
  unload?: JSFunction;
  visibilitychange?: JSFunction;
  beforeunload?: JSFunction;
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
  interceptors?: Interceoptors;
  lifecycle?: LifeCycles;
}

export interface PageSchema extends ContainerSchema {
  containerType: 'Page'
  componentName: 'Page'
  lifeCycle: LifeCycles;
  interceptors: Interceptors;
  children: LayoutSchema[]
}

export interface ContainerSchema extends NodeSchema {
  isContainer: true;
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

export interface Interceptors   {
  request?: JSFunction;
  response?: JSFunction;
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
