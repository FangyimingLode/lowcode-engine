import { create } from 'zustand';
import { ComponentSpecClass } from '@lowcode-engine/types';
import type { Node } from './useNodeStore';
import { useHostStore } from './useHostStore';
import { isDragDataNode } from '../utils';

interface LocationEvent {
  dragObject: DragObject;
  originalEvent: DragEvent;
  clientX: number;
  clientY: number;
}
export interface DragState {
  dragging: boolean;
  dragObject: DragObject | null;
  dropLocation?: DropLocation;
  DRAG_OVER: null | symbol;

  onDragStart: (dragObject: DragObject) => void;
  onDragEnd: () => void;
  onDragOver: (e: DragEvent) => void;
  // locate: (locateEvent: LocationEvent) => DropLocation | undefined;
  setDrag_Over: () => void;
  // getDropContainer: (locateEvent: LocationEvent) => Node | undefined
}
export enum DragObjectType {
  Node = 'node',
  NodeData = 'nodedata',
}
export interface DragNodeObject {
  type: DragObjectType.Node;
  node: Node;
}

export interface DragNodeDataObject {
  type: DragObjectType.NodeData;
  data: ComponentSpecClass;
}
export type DragObject = DragNodeObject | DragNodeDataObject;

export interface DropLocation {
  index: number;
  containerNode: Node;
}

export const useDragStore = create<DragState>((set, get) => ({
  dragging: false,
  dragObject: null,
  dropLocation: undefined,
  DRAG_OVER: null,

  onDragStart: (dragObject) => {
    set({
      dragging: true,
      dragObject: dragObject,
    });
  },

  onDragEnd: () => {
    set({
      dragging: false,
      dragObject: null,
      dropLocation: undefined,
    });
  },

  onDragOver: (event) => {
    const { dragObject } = get();
    if (dragObject) {
      const locateEvent = {
        dragObject,
        originalEvent: event,
        clientX: event.clientX,
        clientY: event.clientY,
      };
      const location = locate(locateEvent);
      set({ dropLocation: location });
    }
  },

  setDrag_Over: () => {
    set({ DRAG_OVER: Symbol('DRAG_OVER') });
  },
}));

function getDropContainer(locateEvent: LocationEvent) {
  let containerNode = useHostStore.getState().getClosestNodeByLocation({
    clientX: locateEvent.clientX,
    clientY: locateEvent.clientY,
  });
  const thisComponentSpec = isDragDataNode(locateEvent.dragObject)
    ? locateEvent.dragObject.data
    : locateEvent.dragObject.node.componentSpec;
  while (containerNode) {
    if (containerNode.componentSpec.isCanInclude(thisComponentSpec)) {
      return containerNode;
    } else {
      containerNode = containerNode.parent;
    }
  }
}

function locate(locateEvent: LocationEvent) {
  const container = getDropContainer(locateEvent);
  if (!container) {
    return;
  }
  const dropLocation = {
    index: 0,
    containerNode: container,
  };

  const { childrenSize, lastChild } = container;
  const { clientY } = locateEvent;

  if (lastChild) {
    const lastChildRect = useHostStore.getState().getNodeRect(lastChild.id);
    if (lastChildRect && clientY > lastChildRect.bottom) {
      dropLocation.index = childrenSize;
    } else {
      let minDistance = Infinity;
      let minIndex = 0;
      for (let index = 0; index < childrenSize; index++) {
        const child = container.getChildAtIndex(index)!;
        const rect = useHostStore.getState().getNodeRect(child.id);
        if (rect && Math.abs(rect.top - clientY) < minDistance) {
          minDistance = Math.abs(rect.top - clientY);
          minIndex = index;
        }
      }
      dropLocation.index = minIndex;
    }
  }
  return dropLocation;
}
