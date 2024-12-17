import type { RegisteredSetter, SetterStore } from '@lowcode-engine/types';
import { create } from 'zustand';

export const useSettersStore = create<SetterStore>((set, get) => ({
  setters: new Map(),
  register: (name: string, setter: RegisteredSetter): void => {
    return set((state) => {
      if (state.setters.has(name)) {
        console.warn(`设置器 ${setter.name} 已经存在`);
      }
      const newSetters = new Map(state.setters);
      newSetters.set(name, setter);
      return { setters: newSetters };
    });
  },
  removeSetter: (name: string): void => {
    set((state) => {
      const newSetters = new Map(state.setters);
      newSetters.delete(name);
      return { setters: newSetters };
    });
  },
  getSetterMap: () => {
    return new Map(get().setters);
  },
  getSetter: (name: string) => {
    return get().setters.get(name);
  },
  hasSetter: (name: string) => {
    return get().setters.has(name);
  },
}));
