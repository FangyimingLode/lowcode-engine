
import renderer from './renderer'
import { SimulatorSpec } from '@lowcode-engine/types';

declare  global {
  interface Window {
    SimulatorRenderer: SimulatorSpec
  }
}
if(window) {
  window.SimulatorRenderer = renderer
}

export default renderer
