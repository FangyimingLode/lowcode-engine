import type { PropRaw, SetterConfig } from './Prop';
import { ElementType } from 'react';
import { ComponentSpecClass } from './componentSpecClass';

export interface ComponentSpecRaw {
  componentName: string;
  packageName: string;
  title: string;
  iconUrl: string;
  description: string;
  docUrl?: string;
  version: string;
  props: PropRaw[];
  group: "base" | 'layout' | 'subjoin' | 'template',
  advanced?: {
    // 组件的嵌套规则
    nestingRule?: {
      parentWhitelist?: string[];
      childWhitelist?: string[];
    }
    supports?: {
      styles?: boolean;
      event?: string[]
    }
    component?: {
      isContainer?: boolean;
      containerType?: 'Layout'|'Data'|'Page';
      isFormControl?: boolean;
    }

  }
  // 嵌套的组件规格，通常只有模板才有这个字段
  // 模板所嵌套的组件的嵌套规则不会被用到
  // 注意：children 中的组件，必须在引擎中注册
  children?: Array<Omit<ComponentSpecRaw,'advanced'> & {
    advanced?: {
      supports?: {
        // 是否能配置样式
        styles?: boolean;
        // 支持的事件列表，空数组意味着不支持任何事件
        events?: string[]
      },
      component?: {
        // 是否是容器
        isContainer?: boolean;
        // 容器类型
        containerType?: 'Layout'|'Data'|'Page';
        // 是否是表单组件
        isFormControl?: boolean
      },
    }
  }>
}

export interface NpmInfo {
  npm: string;
  version: string;
}
export interface MaterialStore {
  componentSpecMap: Map<string, ComponentSpecRaw>;
  loadComponentSpec: (infos: NpmInfo[]) => Promise<boolean[]>;
  getComponentSpec: (name: string) => ComponentSpecRaw | undefined;
  addComponentSpec: (packageName: string, spec: ComponentSpecRaw) => void
  getAll: () => Map<string, ComponentSpecRaw>
}

export interface DesignerState {
  componentSpecMap: Map<string, ComponentSpecClass>,
  componentImplMap: Map<string, ElementType>
  rendererMode: 'design' | 'preview'
  setComponentSpec: (spec: Map<string, ComponentSpecClass>) => void
  setRendererMode: (mode: 'design' | 'preview') => void,
  addComponentsTmpl: (componentMap: Map<string, ElementType>) => void,
  buildComponentSpecMap: (packageNames: string[]) => void
}

export interface FieldConfig {
  type: 'group' | 'field',
  isExtra?: boolean,
  title?: string,
  fields?: FieldConfig[],
  setters?: SetterConfig[]
  name: string
  parentName?: string
}
export interface FiledSingleConfig extends FieldConfig {
  type: 'field',
  setters: SetterConfig[]
}

export interface FieldGroupConfig extends FieldConfig {
  type: 'group',
  fields?: FieldConfig[],
}
