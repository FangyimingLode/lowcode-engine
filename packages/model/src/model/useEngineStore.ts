import { create } from 'zustand'
import { EngineState } from '@lowcode-engine/types';
import { subscribeWithSelector } from 'zustand/middleware/subscribeWithSelector';
import { defaultPageSchema } from '../defaultPageSchema';

export const useEngineStore = create<EngineState>((set, get) => ({
  schema: defaultPageSchema,
  setSchema: (schema) => set({schema}),

  updateLifeCycle:(name,value) => set(state => {
    const newSchema = {
      ...state.schema,
      lifeCycle: {
        ...state.schema.lifeCycle,
        [name]: value,
      }
    }
    return { schema: newSchema };
  }),
  getLifeCycles: () => get().schema.lifeCycle,

  getInterceptors: () => get().schema.interceptors,

  updateInterceptors: (name ,value) => set((state) => {
    const newSchema = {
      ...state.schema,
      interceptors: {
        ...state.schema.interceptors,
        [name]: value,
      }
    }
    return {schema: newSchema};
  }),
}))

export const useSchema = () => useEngineStore(state => ({
  schema: state.schema,
  setSchema: state.setSchema,
}))

export const useLifeCycles = () => useEngineStore(state => ({
  lifeCycles: state.schema.lifeCycle,
  updateLifeCycle: state.updateLifeCycle,
  getLifeCycles: state.getLifeCycles,
}))

export const useInterceptors = () => useEngineStore(state => ({
  interceptors: state.schema.interceptors,
  updateInterceptors: state.updateInterceptors,
  getInterceptors: state.getInterceptors,
}))
