import { ElementType, ReactNode } from 'react';

export interface WidgetConfig {
  name: string;
  area: WidgetConfigArea
  content: ElementType
  contentProps: Record<string, any>
  [extra: string]: any
}
export type WidgetConfigArea = 'left' | 'toolBar' | 'bottom' | 'topLeft' | 'topCenter' | 'topRight'
export interface WidgetSpec {
  name: string;
  content: ReactNode
  visible: boolean
  config: WidgetConfig
}
export interface AreaContainerState {
  area: WidgetConfigArea
  items: WidgetSpec[]
  add: (config: WidgetConfig) => void
  remove: (name: string) => void
  get: (name: string) => WidgetSpec | undefined
  clear: () => void
}

export interface SkeletonState {
  add: (config: WidgetConfig, area: WidgetConfigArea) => void
  remove: (name: string, area: WidgetConfigArea) => void
  get: (name:string, area: WidgetConfigArea) => WidgetSpec | undefined
  clear: () => void
  areas: {
    left: { items: WidgetSpec[] },
    toolBar: { items: WidgetSpec[] },
    bottom: { items: WidgetSpec[] },
    topLeft: { items: WidgetSpec[] },
    topCenter: { items: WidgetSpec[] },
    topRight: { items: WidgetSpec[] }
  }
}
