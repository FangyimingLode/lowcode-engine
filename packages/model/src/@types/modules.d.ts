import { SimulatorSpec } from '@lowcode-engine/types';

declare global {
  interface Window {
    SimulatorRenderer: SimulatorSpec
    LCSimulatorHost: any
  }
}
