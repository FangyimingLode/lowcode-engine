import {create} from 'zustand'
import { useHostStore } from './useHostStore';

interface DetectionStore {
  hoveredNodePosition: DOMRect | undefined,
  selectedNodePosition: DOMRect | undefined,
  computedHoveredPosition: (nodeId?: string) => void
  computedSelectedPosition: (nodeId?: string) => void
}

export const useDetectionStore = create<DetectionStore>()((set, get) => ({
  hoveredNodePosition: undefined,
  selectedNodePosition: undefined,
  computedHoveredPosition: (nodeId?: string) => {
    const {getNodeRect } = useHostStore.getState()
    if(nodeId && getNodeRect(nodeId) ) {
      set({ hoveredNodePosition: getNodeRect(nodeId)})
    } else {
      set({ hoveredNodePosition: undefined})
    }
  },
  computedSelectedPosition: (nodeId?: string) => {
    const {getNodeRect } = useHostStore.getState()
    if(nodeId && getNodeRect(nodeId) ) {
      set({ selectedNodePosition: getNodeRect(nodeId)})
    } else {
      set({ selectedNodePosition: undefined})
    }
  }
}))
