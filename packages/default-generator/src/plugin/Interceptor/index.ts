import {  PluginContext } from '@lowcode-engine/types';
import InterceptorsPane from './InterceptorsPane';

function InterceptorsPlugin (ctx: PluginContext) {
  return {
    init(){
      ctx.skeleton.add({
        name: 'InterceptorsPane',
        content: InterceptorsPane,
        contentProps: {},
        area: 'left'
      }, 'left')
    },
    destroy() {
      ctx.skeleton.remove('InterceptorsPane', 'left')
    }
  }
}
InterceptorsPlugin.pluginName = 'InterceptorsPane';
export default InterceptorsPlugin;
