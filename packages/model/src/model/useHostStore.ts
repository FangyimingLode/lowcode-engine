import { create } from 'zustand';
import {
  ComponentSpecRaw,
  HostStore,
  Point,
  SimulatorSpec,
} from '@lowcode-engine/types';
import {
  getBaseAssets,
  getComponentImplUrl,
  getComponentImplWin,
  getComponentSetterMap,
  isDragDataNode, selectNode
} from '../utils';
import { useMaterialStore } from './useMaterialStore';
import { useSettersStore } from './useSettersStore';
import { useDesignerStore } from './useDesignerStore';
import { DragObjectType, useDragStore } from './useDragStore';
import { useEngineStore } from './useEngineStore';
import type { Node } from './useNodeStore';
import { useDetectionStore } from './useDetection';

interface Store extends HostStore {
  getClosestNodeByLocation: (point: Point) => Node | undefined;
  getNodeRect: (nodeId: string) => DOMRect | undefined;
  getNodeByDomElement: (
    element: HTMLElement | null
  ) => Node | undefined;
  createSimulator: () => Promise<SimulatorSpec>;
  frameWindow: Window | null
}

export const useHostStore = create<Store>()((set, get) => ({
  frameDocument: null,
  frameWindow: null,
  project: {},
  renderer: null,
  /**
   * 更新资源
   **/
  onAssetUpdated: async (additionalPackageNames) => {
    const materialMap = new Map<string, ComponentSpecRaw>();
    additionalPackageNames.forEach((name) => {
      if (materialMap.has(name)) {
        const componentSpec = useMaterialStore
          .getState()
          .getComponentSpec(name) as ComponentSpecRaw;
        materialMap.set(name, componentSpec);
      }
    });

    const assetBundles = getSimulatorComponentAssets(materialMap);
    const script = assetBundles.map((asset) => {
      return new Promise<void>((resolve, reject) => {
        if (!get().frameDocument) {
          reject();
        }
        const script = document.createElement('script');
        script.onload = () => {
          script.onload = null;
          script.onerror = null;
          resolve();
        };
        script.onerror = () => {
          script.onload = null;
          script.onerror = null;
          resolve();
        };
        get().frameDocument?.body.appendChild(script);
        script.src = asset.url;
      });
    });
    await Promise.allSettled(script);
    // 注册软件包自带的设置器
    registerComponentSetter(assetBundles);
    // 低代码组件实现
    collectComponentImpl(assetBundles);
    await get().rerender();
  },
  mountContentNameFrame: async (frame: HTMLIFrameElement | null) => {
    if (!frame || frame.contentWindow) {
      return null;
    }
    const { setupEvent, createSimulator } = get();
    const renderer = await createSimulator();
    set({
      frameWindow: frame.contentWindow,
      frameDocument: frame.contentDocument,
      renderer,
    });
    setupEvent();
    renderer.run();
  },
  setupEvent: () => {
    const { frameDocument } = get();
    const { setDrag_Over, onDragOver } = useDragStore.getState();
    if (!frameDocument) {
      return;
    }
    frameDocument.addEventListener('dragover', (e) => {
      e.preventDefault();
      setDrag_Over();
      onDragOver(e);
    });

    frameDocument.addEventListener('dragstart', (e) => {
      const { getNodeByDomElement } = get();
      const { onDragStart } = useDragStore.getState();

      const node = getNodeByDomElement(e.target as HTMLElement);
      if (node) {
        onDragStart({
          type: DragObjectType.Node,
          node,
        });
      }
    });

    frameDocument.addEventListener('mousemove', (e) => {
      const node = get().getClosestNodeByLocation(e);
      if (node?.id) {
        useEngineStore.getState().hoverNode(node.id);
        useDetectionStore.getState().computedHoveredPosition(node?.id)
      }
    });
    frameDocument.addEventListener(
      'mouseleave',
      (e) => {
        useDetectionStore.getState().computedHoveredPosition()
      },
      false
    );

    frameDocument.addEventListener('mouseup', (e) => {
      const nodeId = get().getClosestNodeByLocation(e)?.id;
      selectNode(nodeId)
    });

    frameDocument.addEventListener('drop', async () => {
      const { dragObject, dropLocation } = useDragStore.getState();
      if (dragObject && dropLocation) {
        if (isDragDataNode(dragObject)) {
          let schema = dragObject.data.schema;
          console.log(schema, 'schema');
          if (!Array.isArray(schema)) {
            schema = [schema];
            let start = dropLocation.index;
            let lastNodeId: string | undefined;
            schema.forEach((item) => {
              const node = useEngineStore
                .getState()
                .createNode(item, dropLocation.containerNode);
              dropLocation.containerNode.inertChildAtIndex(node, start);
              start++;
              lastNodeId = node.id;
            });
            if (lastNodeId) {
              await get().rerender();
              selectNode(lastNodeId)
            }
          }
        } else {
          dragObject.node.parent?.delChild(dragObject.node);
          dropLocation.containerNode.inertChildAtIndex(
            dragObject.node,
            dropLocation.index
          );
          await get().rerender();
          selectNode(dragObject.node.id)
        }
      }
      useDragStore.getState().onDragEnd();
    });
  },
  getNodeByDomElement: (element) => {
    const { renderer } = get();
    if (element && renderer) {
      const nodeId = renderer.getNodeIdByDomElement(element);
      return nodeId ? useEngineStore.getState().getNode(nodeId) : undefined
    }
  },
  getClosestNodeByLocation: (point) => {
    const { renderer } = get();
    if (renderer) {
      const nodeId = renderer.getClosestNodeIdByLocation(point);
      return nodeId ? useEngineStore.getState().getNode(nodeId) : undefined;
    }
  },
  getNodeRect: (nodeId) => {
    return get().renderer?.getNodeRect(nodeId);
  },
  rerender: async () => {
    const { renderer } = get();
    if (!renderer) {
      return;
    }
    renderer.run();
  },
  createSimulator: async () => {
    const { frameDocument, frameWindow } = get();
    const assetBundles = getSimulatorComponentAssets(
      useMaterialStore.getState().getAll()
    );
    const baseAssets = getBaseAssets();
    frameWindow!.LCSimulatorHost = get()
    let styleTags = '';
    let scriptTags = '';
    baseAssets.css.forEach((url) => {
      styleTags += `<link href="${url}" rel="stylesheet" />`;
    });
    baseAssets.js.forEach((url) => {
      scriptTags += `<script src="${url}"></script>`;
    });

    assetBundles.forEach((bundle) => {
      scriptTags += `<script src="${bundle.url}"></script>`;
    });
    frameDocument?.open();
    frameDocument!.write(
      `<!doctype html>
            <html class="engine-design-mode">
            <head><meta charset="utf-8"/>
                ${styleTags}
            </head>
            <body>
                ${scriptTags}
            </body>
            </html>`
    );
    frameDocument!.close();
    return new Promise<SimulatorSpec>((resolve, reject) => {
      const loaded = () => {
        registerComponentSetter(assetBundles);
        collectComponentImpl(assetBundles);
        resolve(frameWindow!.SimulatorRenderer);
        frameWindow?.removeEventListener('load', loaded);
      };
      const errored = () => {
        reject();
        frameWindow?.removeEventListener('error', errored);
      };
      frameWindow?.addEventListener('load', loaded);
      frameWindow?.addEventListener('error', errored);
    });
  },
}));

const getSimulatorComponentAssets = (
  assetMap: Map<string, ComponentSpecRaw>
) => {
  const result: { packageName: string; componentName: string; url: string }[] =
    [];

  for (const [, spec] of assetMap) {
    if (spec.group !== 'template') {
      result.push({
        packageName: spec.packageName,
        componentName: spec.componentName,
        url: getComponentImplUrl({
          npm: spec.packageName,
          version: spec.version,
        }),
      });
    }
  }
  return result;
};

const registerComponentSetter = (
  assetBundles: { packageName: string; componentName: string; url: string }[]
) => {
  const frameWindow = useHostStore.getState().frameWindow;
  if (!frameWindow) {
    console.warn('注册失败');
    return;
  }
  assetBundles.forEach((bundle) => {
    const innerSetterMap = getComponentSetterMap(frameWindow, bundle);
    for (const key of Object.keys(innerSetterMap)) {
      useSettersStore
        .getState()
        .register(`${bundle.packageName}/${key}`, innerSetterMap[key]);
    }
  });
};

/**
 * 收集低代码组件的实现
 **/
const collectComponentImpl = (
  assetBundles: { packageName: string; componentName: string; url: string }[]
) => {
  const componentMap = new Map();
  const { frameWindow } = useHostStore.getState();
  const { addComponentsTmpl } = useDesignerStore.getState();
  if (!frameWindow) {
    return;
  }
  assetBundles.forEach((bundle) => {
    const componentImpl = getComponentImplWin(frameWindow, bundle);
    if (componentImpl) {
      componentMap.set(bundle.componentName, componentImpl);
    }
  });
  addComponentsTmpl(componentMap);
};
