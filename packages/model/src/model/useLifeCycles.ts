import {create} from 'zustand'
import { LifeCycles } from '@lowcode-engine/types';

interface LifeCyclesState {
  active: boolean,
  height: number,
  lifeCycles: LifeCycles,
  setActive: (active: boolean) => void
  updateLifeCycle: (name: keyof LifeCycles, value: string) => void,
  addLifeCycle: (name: keyof LifeCycles) => void,
}
export const useLifeCyclesStore = create<LifeCyclesState>((set, get) => ({
  active: false,
  height: 300,
  lifeCycles: {},
  setActive: (active: boolean) => set({active}),
  updateLifeCycle: (name: keyof LifeCycles, value) => {
    set(state => ({
      lifeCycles: {
        ...state.lifeCycles,
        [name]: {
          type: 'JSFunction',
          value
        }
      }
    }))
  },
  addLifeCycle: (name: keyof LifeCycles) => {
    set(state => ({
      lifeCycles: {
        ...state.lifeCycles,
        [name]: {
          type: 'JSFunction',
          value: `function on${name}(){/** todo **/}`
        }
      }
    }))
  }
}))


