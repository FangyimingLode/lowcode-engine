import { create } from 'zustand';
import { DesignerState } from '@lowcode-engine/types';

export const useDesignerStore =create<DesignerState>((set) => ({
  currentDocument: null,
  componentSpecMap: new Map(),
  rendererMode: 'design',
  setCurrentDocument: (doc) => set({currentDocument: doc}),
  setComponentSpec: (spec) => set({componentSpecMap: spec}),
  setRendererMode: (mode) => set({rendererMode: mode}),
}))
