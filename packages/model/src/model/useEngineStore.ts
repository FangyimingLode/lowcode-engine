import { create } from 'zustand'
import { EngineState } from '@lowcode-engine/types';
import { defaultPageSchema } from '../defaultPageSchema';

/**
 * 当前页面的schema
 **/
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

