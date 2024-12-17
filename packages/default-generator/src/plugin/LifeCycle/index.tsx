import {  PluginContext } from '@lowcode-engine/types';
import LifeCycle from './LifeCycle';

function LifeCyclesPanelPlugin (ctx: PluginContext) {
  return {
    init(){
      ctx.skeleton.add({
        name: 'lifeCyclesPanel',
        content: LifeCycle,
        contentProps: {},
        area: 'left'
      }, 'left')
    },
    destroy() {
      ctx.skeleton.remove('LifeCyclesPane', 'left')
    }
  }
}
LifeCyclesPanelPlugin.pluginName = 'LifeCyclePanel';
export default LifeCyclesPanelPlugin;
