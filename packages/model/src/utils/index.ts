import { JSRunFunction, NpmInfo, PropValue } from '@lowcode-engine/types';
import { DragNodeDataObject, DragObject, DragObjectType } from '../model/useDragStore';
import { useDetectionStore } from '../model/useDetection';
import { useEngineStore } from '../model/useEngineStore';
import { useDesignerStore } from '../model/useDesignerStore';

export function getComponentImplUrl(info: NpmInfo) {
  return `https://unpkg.com/${info.npm}@${info.version}/dist/index.js`;
}

export function getComponentSetterMap(window: Window, bundle: {packageName: string, componentName: string}) {
  const name: string = bundle.packageName.replace(/-(\w)/g, (_,m) => {
    return m.toUpperCase()
  })
  return ((window as any)[name]||{}).setters || {}
}


export function getComponentImplWin(window: Window, bundle: {packageName: string, componentName: string, url: string}) {
  const name: string = bundle.packageName.replace(/-(\w)/g, (_, m) => {
    return m.toUpperCase()
  })
  if(((window as any)[name] || {}).setters) {
    return ((window as any)[name] || {}).default
  } else {
    return (window as any)[name]
  }
}

let guid = Date.now();
export function uniqueId(prefix = '') {
  return `${prefix}${(guid++).toString(36).toLowerCase()}`;
}

export function getBaseAssets() {
  return {
    js: [
      'https://g.alicdn.com/code/lib/react/17.0.2/umd/react.development.js',
      'https://g.alicdn.com/code/lib/react-dom/17.0.2/umd/react-dom.development.js',
      'http://localhost:5555/js/simulator-renderer.js'
    ],
    css: ['http://localhost:5555/css/simulator-renderer.css']
  }
}
export function isDragDataNode(dragObject: DragObject): dragObject is DragNodeDataObject {
  return dragObject.type === DragObjectType.NodeData
}

export function selectNode (nodeId?: string) {
  useEngineStore.getState().selectNode(nodeId)
  useDetectionStore.getState().computedSelectedPosition(nodeId)
  const value = nodeId ? useEngineStore.getState().getNode(nodeId)?.settingEntry : undefined
  useDesignerStore.setState({ settingTopEntry: value })
}


export function transformStringToFunction(str: string) {
  return new Function(`"use strict"; return ${str}`)();
}

export function isJsRunFunction(value: PropValue): value is JSRunFunction {
  return !!value && (value as any).type === 'JSRunFunction'
}
