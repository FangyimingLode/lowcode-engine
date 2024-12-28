import { create } from 'zustand';
import {
  type Interceptors,
  type LifeCycles,
  type NodeSchema,
  type PageSchema,
  type JSFunction
} from '@lowcode-engine/types';
import { useHostStore } from './useHostStore';
import { Node } from './useNodeStore';

interface EngineState<S extends NodeSchema = NodeSchema> {
  // schema: S;
  nodeMap: Map<string, Node<S>>;
  rootNode: Node<S> | null;
  rootNodeId: string | null;
  selectedNodeId: string | null;
  hoveredNodeId: string | null;
  parent: S | null;
  lifeCycles: LifeCycles;
  interceptors: Interceptors;
  setSchema: (schema: PageSchema) => void;
  getLifeCycles: () => PageSchema['lifeCycle'] | undefined;
  updateLifeCycle: (
    name: keyof PageSchema['lifeCycle'],
    value: JSFunction
  ) => void;
  setLifeCycle: (lifeCycle: LifeCycles) => void;
  getInterceptors: () => Interceptors;
  updateInterceptors: (
    name: keyof PageSchema['interceptors'],
    value: JSFunction
  ) => void;
  selectNode: (id?: string) => void;
  hoverNode: (id: string) => void;
  createNode: <S extends NodeSchema>(
    schema: S,
    parentNode?: Node<S>
  ) => Node<S>;
  getNode: (id: string) => Node | undefined;
  delNode: (id: string) => void;
  currentNode: () => Node | undefined;
  copyNode: (node: Node) => Node;
  getSchema: () => NodeSchema | undefined
}
/**
 * 当前页面的schema
 **/
export const useEngineStore = create<EngineState>((set, get) => ({
  // schema: defaultPageSchema,
  nodeMap: new Map(),
  rootNode: null,
  selectedNodeId: null,
  hoveredNodeId: null,
  rootNodeId: null,
  parent: null,
  lifeCycles: {},
  interceptors: {},

  setSchema: (schema) => {
    set({
      rootNode: get().createNode<PageSchema>(schema, undefined),
      lifeCycles: schema.lifeCycle,
    });
  },

  getSchema: () => {
    const { lifeCycles, interceptors, rootNode } = get();
    console.log(lifeCycles, interceptors, 'getSchema', rootNode)
    if(rootNode) {
      return {
        ...rootNode.export(),
        lifeCycles,
        interceptors,
      };
    }

  },
  updateLifeCycle: (name, value) =>
    set((state) => {
      return {
        lifeCycles: {
          ...state.lifeCycles,
          [name]: value,
        },
      };
    }),
  setLifeCycle: (lifeCycles) => {
    set({ lifeCycles });
  },

  getLifeCycles: () => {
    return get().lifeCycles;
  },

  getInterceptors: () => get().interceptors,

  updateInterceptors: async (name, value) => {
    set((state) => {
      return {
        interceptors: {
          ...state.interceptors,
          [name]: value,
        },
      };
    });
    console.log(get().interceptors, '插入成功')
    await useHostStore.getState().rerender();
  },

  selectNode: (id?) => set({ selectedNodeId: id }),

  hoverNode: (id) => set({ hoveredNodeId: id }),

  createNode: (schema, parentNode) => {
    const node = new Node(schema, parentNode);
    const newMap = new Map(get().nodeMap);
    newMap.set(node.id, node);
    set({ nodeMap: newMap });
    return node;
  },

  delNode: async (nodeId: string) => {
    const thisNode = get().nodeMap.get(nodeId);
    if (thisNode) {
      const newMap = new Map(get().nodeMap);
      newMap.delete(nodeId);
      set({ nodeMap: newMap });
      //  删除子节点
      thisNode.parent?.delChild(thisNode);
      // 刷新 rerender()
      await useHostStore.getState().rerender();
    }
  },

  getNode: (id) => {
    return get().nodeMap.get(id);
  },

  currentNode: () => {
    const { selectedNodeId, nodeMap } = get();
    return selectedNodeId ? nodeMap.get(selectedNodeId) : undefined;
  },

  copyNode: (node: Node) => {
    const schema = node.export();
    delete schema.id;
    return get().createNode(schema, undefined);
  },
}));
