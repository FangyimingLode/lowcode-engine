import { create } from 'zustand';
import { ComponentSpecClass, DesignerState } from '@lowcode-engine/types';
import { ElementType } from 'react';
import { useMaterialStore } from './useMaterialStore';
import SettingTopEntry from '../setting/SettingTopEntry';

interface Store extends  DesignerState {
  settingTopEntry: SettingTopEntry | null
}
export const useDesignerStore =create<Store>((set, get) => ({
  componentSpecMap: new Map(),
  componentImplMap: new Map(),
  settingTopEntry: null,
  rendererMode: 'design',
  setComponentSpec: (spec) => set({componentSpecMap: spec}),
  setRendererMode: (mode) => set({rendererMode: mode}),
  addComponentsTmpl: (componentMap: Map<string, ElementType>) => {
    const { componentImplMap } = get()
    for(const [name, component] of componentMap) {
      if(componentImplMap.has(name)) {
        console.error(`${name} 的实现已经存在，即将重置！！！`)
      }
      componentImplMap.set(name, component)
    }
    set({ componentImplMap })
  },
  buildComponentSpecMap: (packageNames: string[]) => {
    packageNames.forEach(packageName => {
      const result = useMaterialStore.getState().getComponentSpec(packageName)
      if(result) {
        set(state => {
          const newMap = new Map(state.componentSpecMap)
          newMap.set(packageName, new ComponentSpecClass(result))
          return { componentSpecMap: newMap}
        })
      }
    })
  }
}))
