import { create } from 'zustand';
import type { PluginConfigCreator, PluginStore } from '@lowcode-engine/types';
import { useSkeletonStore } from './useSkeletonStore';
import { useSettersStore } from './useSettersStore';
import { useMaterialStore } from './useMaterialStore';

export const usePluginStore = create<PluginStore>((set, get) => ({
  plugins: new Map(),
  register: async (creator: PluginConfigCreator, options?: unknown) => {
    const plugins =  get().plugins;
    if(plugins.has(creator.pluginName)) {
      return Promise.resolve(`${creator.pluginName} already registered`);
    }
    const config = creator({
      setters: useSettersStore.getState(),
      skeleton: useSkeletonStore.getState(),
      material: useMaterialStore.getState(),
      plugins: get()
    }, options)
    config.init()
    set(state => {
      const newPlugins = new Map(state.plugins)
      newPlugins.set(creator.pluginName, {
        options,
        config,
        pluginName: creator.pluginName,
      });
      return {plugins: newPlugins};
    })
    return Promise.resolve()
  },
  getPlugin: (name: string) => {
    return get().plugins.get(name)
  },
  delete: (name: string) =>
    set(state => {
      const newPlugins = new Map(state.plugins)
      const plugin = newPlugins.get(name)
      if (plugin?.config.destroy) {
        plugin.config.destroy()
      }
      newPlugins.delete(name)
      return { plugins: newPlugins }
    })
}));
