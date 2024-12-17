import type { Interceptors, PageSchema } from './';
import { JSFunction } from './Prop';
export interface EngineState {
  schema: PageSchema,
  // getSchema: () => PageSchema
  setSchema: (schema: PageSchema) => void,
  // updateSchema: (schema: PageSchema) => void
  getLifeCycles: () => PageSchema['lifeCycle']
  updateLifeCycle: (name: keyof PageSchema['lifeCycle'], value: JSFunction) => void

  getInterceptors: () => Interceptors
  updateInterceptors: (name: keyof PageSchema['interceptors'], value: JSFunction) => void
}
