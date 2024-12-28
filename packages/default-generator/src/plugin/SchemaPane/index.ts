import { PluginContext } from '@lowcode-engine/types';
import SchemaPane from './SchemaPane';

function SchemaPanePlugin(ctx: PluginContext) {
  return {
    init() {
      ctx.skeleton.add({
        name: 'SchemaPane',
        content: SchemaPane,
        contentProps: {},
        area: 'left'
      })
    },
    destroy() {
      ctx.skeleton.remove('SchemaPane', 'left')
    }
  }
}

SchemaPanePlugin.pluginName = 'SchemaPane'
export default SchemaPanePlugin
