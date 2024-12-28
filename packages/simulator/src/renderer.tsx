import { NodeSchema, Point, SimulatorSpec } from '@lowcode-engine/types';
import reactDomCollector, { DomNode } from './ReactCollector';
import { createRoot } from 'react-dom/client';
import { createElement } from 'react';
import { deferUtil } from './utils';
import RenderView from './view';
import { EmptyComponent } from './EmptyComponent';


class SimulatorRenderer implements SimulatorSpec {
  private isRan = false;

  getClosestNodeIdByLocation(point: Point): string | undefined {
    // 找出包含 point 的全部 dom 节点
    const suitableContainer = new Map<string, DomNode>();
    for (const [id, domNode] of reactDomCollector.domNodeMap) {
      const rect = this.getNodeRect(id);
      if(!domNode || !rect) continue
      const {width, height, left ,top} = rect
      if(left < point.clientX && top< point.clientY && width + left > point.clientX && height + top > point.clientY) {
        suitableContainer.set(id, domNode)
      }
    }
    // 找出离 point 最近的 dom 节点
    const minGap: {id: string | undefined, minArea: number} =  {
      id: undefined,
      minArea: Infinity
    }
    for(const [id, domNode] of suitableContainer) {
      const { width, height} = domNode.rect
      if(width * height < minGap.minArea) {
        minGap.id = id
        minGap.minArea = width * height
      }
    }
    return minGap.id
  }
  getNodeRect(id: string): DOMRect | undefined {
    return reactDomCollector.domNodeMap.get(id)?.node.getBoundingClientRect()
  }
  getNodeIdByDomElement(element:HTMLElement) {
    return element.getAttribute('data-node-id') || undefined
  }
  rerender = async () => {
    // todo observerData.components = host.project.designer.componentImplMap
    // todo observerData.schema = host.project.schema
    await deferUtil.waitMounted()
  }
  run() {
    if(this.isRan) {
      return
    }
    this.isRan = true
    const container = document.createElement('div')
    container.id = 'simulatorRenderer'
    container.className = 'simulator-renderer'
    document.body.appendChild(container)
    const root = createRoot(container)
    root.render(
      createElement(RenderView, {
        // todo 待补充枚举类型
        rendererMode: 0,
        onCompGetRef: (schema: NodeSchema, domElement: HTMLElement) => {
          reactDomCollector.mount(schema.id!, domElement)
        },
        customEmptyElement: (schema: NodeSchema) => {
          if(schema.containerType  === 'Page') {
            return <EmptyComponent text={'将布局组件拖拽到这里'} />
          } else if(schema.containerType === 'Layout') {
            return <EmptyComponent text={'拖入组件'} />
          }
        }
      }, null)
    )
  }
}

export default  new SimulatorRenderer()
