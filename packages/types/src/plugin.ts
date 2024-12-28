import { Panel } from './pannel';
import { SetterStore } from './setter';
import { MaterialStore } from './componentSpc';
import { SkeletonState } from './skeleton';

export interface LowCodePlugin {
  pluginName: string;
  config: PluginConfig;
  options?: unknown;
}

export interface PluginContext {
  skeleton: SkeletonState,
  plugins: PluginStore,
  setters: SetterStore,
  material: MaterialStore,
}

export interface PluginConfig {
  init(): void
  destroy(): void
}

export interface PluginConfigCreator {
  (ctx: PluginContext, options?: unknown): PluginConfig;
  pluginName: string;
}

export interface skeletonStore {
  panels: Map<string, Panel>;
  addPanel: (panel: Panel) => void;
}

export interface PluginStore {
  plugins: Map<string, LowCodePlugin>;
  register:  (creator: PluginConfigCreator,options?: unknown) => Promise<string | void>;
  getPlugin: (name: string) => LowCodePlugin | undefined;
}

