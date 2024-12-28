import { create } from 'zustand';
import type { SkeletonState } from '@lowcode-engine/types';
import { createElement } from 'react';

/**
 * 管理面板工具
 **/
export const useSkeletonStore = create<SkeletonState>((set, get) => ({
  areas: {
    left: { items: [] },
    toolBar: { items: [] },
    bottom: { items: [] },
    topLeft: { items: [] },
    topCenter: { items: [] },
    topRight: { items: [] },
  },

  add: (config) => {
    const area = config.area
    const areaState = get().areas[config.area];
    const current = areaState.items.find((item) => item.name === config.name);
    if (!current) {
      const newWidget = {
        name: config.name,
        config,
        visible: true,
        content: createElement(config.content, config.contentProps),
        getName: () => config.name,
      };
      set((state) => ({
        areas: {
          ...state.areas,
          [area]: {
            ...state.areas[area],
            items: [...state.areas[area].items, newWidget],
          },
        },
      }));
    }
  },

  remove: (name, area) => {
    set((state) => ({
      areas: {
        ...state.areas,
        [area]: {
          ...state.areas[area],
          items: state.areas[area].items.filter((item) => item.name !== name),
        },
      },
    }));
  },

  get: (name, area) => {
    return get().areas[area].items.find((item) => item.name === name);
  },

  clear: () => {
    set({
      areas: {
        left: { items: [] },
        toolBar: { items: [] },
        bottom: { items: [] },
        topLeft: { items: [] },
        topCenter: { items: [] },
        topRight: { items: [] },
      },
    });
  },
}));
