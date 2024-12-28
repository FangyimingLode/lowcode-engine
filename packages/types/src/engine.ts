// import type { Interceptors, LifeCycles, NodeSchema, PageSchema } from './schema';
import { JSFunction } from './Prop';


export interface InsertNodeParams {
   targetId: string;
   position: 'before' | 'after' | 'inner';
   packageName: string;
}

// export interface EngineState<S extends  NodeSchema = NodeSchema> {
//   schema: S,
//   nodeMap: Map<string, Node<S>>,
//   rootNode: Node<S> | null,
//   rootNodeId: string | null
//   selectedNodeId: string | null
//   hoveredNodeId: string | null
//   parent: S | null,
//   lifeCycles: LifeCycles
//   interceptors: Interceptors
//   setSchema: (schema: PageSchema) => void,
//   getLifeCycles: () => PageSchema['lifeCycle'] | undefined
//   updateLifeCycle: (name: keyof PageSchema['lifeCycle'], value: JSFunction) => void
//   setLifeCycle: (lifeCycle: LifeCycles) => void
//   getInterceptors: () => Interceptors
//   updateInterceptors: (name: keyof PageSchema['interceptors'], value: JSFunction) => void
//   selectNode: (id: string) => void,
//   hoverNode: (id: string) => void,
//   createNode: <S extends NodeSchema>(schema: S, parentNode?: Node<s>) => Node<S>,
//   getChildAtIndex: (index: number) => S,
//   getNode: (id: string) => S | undefined,
//   delNode: (id: string) => void
// }
