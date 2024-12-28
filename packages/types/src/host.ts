
export interface HostStore {
  frameDocument: Document | null
  renderer:SimulatorSpec | null
  onAssetUpdated: (additionalPackageNames: string[]) => Promise<void>
  mountContentNameFrame: (frame: HTMLIFrameElement | null) => void
  // getClosestNodeByLocation: (point: Point) => Node<NodeSchema> | undefined
  getNodeRect: (nodeId: string) => any
  rerender: () => Promise<void>
  setupEvent: () => void,
  // getNodeByDomElement: (element: HTMLElement | null) => Node<NodeSchema> | undefined,
  createSimulator: () => Promise<SimulatorSpec>,
}


export interface SimulatorSpec {
  run(): void
  getClosestNodeIdByLocation(point: Point): string | undefined
  getNodeIdByDomElement (element: HTMLElement): string | undefined
  /**
   * 获取给定 Node 在浏览器窗口中的位置
   * @param id
   */
  getNodeRect(id: string): DOMRect | undefined
}

export interface Point {
  clientX: number;
  clientY: number;
}
