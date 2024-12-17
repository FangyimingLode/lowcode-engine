import { create } from 'zustand';
import type { MaterialStore } from '@lowcode-engine/types';

export const useMaterialStore = create<MaterialStore>((set, get) => ({
  componentSpecMap: new Map(),
  loadComponentSpec: async (infos) => {
    const results = await Promise.allSettled(
      infos.map(async (info) => {
        if (get().componentSpecMap.has(info.npm)) {
          return true;
        }
        const res = await fetch('http://localhost:8080');
        const spec = await res.json();
        set((state) => {
          const newMap = new Map(state.componentSpecMap);
          newMap.set(info.npm, spec);
          return { componentSpecMap: newMap };
        });
      })
    );

    return results.map((r) => r.status === 'fulfilled');
  },
  getComponentSpec: (name: string) => get().componentSpecMap.get(name),
  addComponentSpec: (packageName, spec) => {
    set((state) => {
      const newMap = new Map(state.componentSpecMap);
      if (newMap.has(packageName)) {
        console.warn(`组件${packageName} 已经存在`);
      }
      newMap.set(packageName, spec);
      return { componentSpecMap: newMap };
    });
  },
}));
