import { PluginContext } from '@lowcode-engine/types';
import ComponentPane from './ComponentPane';

function ComponentsPanePlugin(ctx: PluginContext) {
  return {
    init() {
      ctx.skeleton.add({
        name: 'ComponentsPane',
        content: ComponentPane,
        contentProps: {},
        area: 'left'
      })
    },
    destroy() {
      ctx.skeleton.remove('ComponentsPane', 'left')
    }
  }
}

ComponentsPanePlugin.pluginName = 'ComponentsPane';

export default ComponentsPanePlugin;
